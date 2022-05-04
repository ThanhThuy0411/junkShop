import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import dayjs from 'dayjs/esm';
import { DATE_TIME_FORMAT } from 'app/config/input.constants';

import { IOrder, Order } from '../order.model';
import { OrderService } from '../service/order.service';
import { IWard } from 'app/entities/ward/ward.model';
import { WardService } from 'app/entities/ward/service/ward.service';
import { IDistrict } from 'app/entities/district/district.model';
import { DistrictService } from 'app/entities/district/service/district.service';
import { IProduct } from 'app/entities/product/product.model';
import { ProductService } from 'app/entities/product/service/product.service';

@Component({
  selector: 'jhi-order-update',
  templateUrl: './order-update.component.html',
})
export class OrderUpdateComponent implements OnInit {
  isSaving = false;

  wardsSharedCollection: IWard[] = [];
  districtsSharedCollection: IDistrict[] = [];
  productsSharedCollection: IProduct[] = [];

  editForm = this.fb.group({
    id: [],
    date: [],
    address: [],
    ward: [],
    district: [],
    product: [],
    user: [],
  });

  order?: IOrder;

  constructor(
    protected orderService: OrderService,
    protected wardService: WardService,
    protected districtService: DistrictService,
    protected productService: ProductService,
    protected activatedRoute: ActivatedRoute,
    protected fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ order }) => {
      if (order.id === undefined) {
        const today = dayjs().startOf('day');
        order.date = today;
      }
      this.order = order;

      this.updateForm(order);

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const order = this.createFromForm();
    if (order.id !== undefined) {
      this.subscribeToSaveResponse(this.orderService.update(order));
    } else {
      this.subscribeToSaveResponse(this.orderService.create(order));
    }
  }

  trackWardById(_index: number, item: IWard): number {
    return item.id!;
  }

  trackDistrictById(_index: number, item: IDistrict): number {
    return item.id!;
  }

  trackProductById(_index: number, item: IProduct): number {
    return item.id!;
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IOrder>>): void {
    result.pipe(finalize(() => this.onSaveFinalize())).subscribe({
      next: () => this.onSaveSuccess(),
      error: () => this.onSaveError(),
    });
  }

  protected onSaveSuccess(): void {
    this.previousState();
  }

  protected onSaveError(): void {
    // Api for inheritance.
  }

  protected onSaveFinalize(): void {
    this.isSaving = false;
  }

  protected updateForm(order: IOrder): void {
    this.editForm.patchValue({
      id: order.id,
      user: order.user?.login,
      date: order.date ? order.date.format(DATE_TIME_FORMAT) : null,
      address: order.address,
      ward: order.ward,
      district: order.district,
      product: order.product,
    });

    this.wardsSharedCollection = this.wardService.addWardToCollectionIfMissing(this.wardsSharedCollection, order.ward);
    this.districtsSharedCollection = this.districtService.addDistrictToCollectionIfMissing(this.districtsSharedCollection, order.district);
    this.productsSharedCollection = this.productService.addProductToCollectionIfMissing(this.productsSharedCollection, order.product);
  }

  protected loadRelationshipsOptions(): void {
    this.wardService
      .query()
      .pipe(map((res: HttpResponse<IWard[]>) => res.body ?? []))
      .pipe(map((wards: IWard[]) => this.wardService.addWardToCollectionIfMissing(wards, this.editForm.get('ward')!.value)))
      .subscribe((wards: IWard[]) => (this.wardsSharedCollection = wards));

    this.districtService
      .query()
      .pipe(map((res: HttpResponse<IDistrict[]>) => res.body ?? []))
      .pipe(
        map((districts: IDistrict[]) =>
          this.districtService.addDistrictToCollectionIfMissing(districts, this.editForm.get('district')!.value)
        )
      )
      .subscribe((districts: IDistrict[]) => (this.districtsSharedCollection = districts));

    this.productService
      .query()
      .pipe(map((res: HttpResponse<IProduct[]>) => res.body ?? []))
      .pipe(
        map((products: IProduct[]) => this.productService.addProductToCollectionIfMissing(products, this.editForm.get('product')!.value))
      )
      .subscribe((products: IProduct[]) => (this.productsSharedCollection = products));
  }

  protected createFromForm(): IOrder {
    return {
      ...new Order(),
      ...this.order,
      id: this.editForm.get(['id'])!.value,
      date: this.editForm.get(['date'])!.value ? dayjs(this.editForm.get(['date'])!.value, DATE_TIME_FORMAT) : undefined,
      address: this.editForm.get(['address'])!.value,
      ward: this.editForm.get(['ward'])!.value,
      district: this.editForm.get(['district'])!.value,
      product: this.editForm.get(['product'])!.value,
    };
  }
}
