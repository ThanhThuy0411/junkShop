import { maxQuery } from './../../product/update/product-update.component';
import { Component, Input, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
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
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ProductComponent } from 'app/entities/product/list/product.component';

@Component({
  selector: 'jhi-order-update',
  templateUrl: './order-update.component.html',
})
export class OrderUpdateComponent implements OnInit {
  @Input() product?: IProduct;
  @Input() productComponent?: ProductComponent;
  isSaving = false;
  isEditForm = true;

  wardsSharedCollection: IWard[] = [];
  wardsSharedCollectionByDistrict: IWard[] = [];
  districtsSharedCollection: IDistrict[] = [];
  productsSharedCollection: IProduct[] = [];

  editForm = this.fb.group({
    id: [],
    date: [],
    address: ['', [Validators.required]],
    ward: ['', [Validators.required]],
    district: ['', [Validators.required]],
    product: ['', [Validators.required]],
    user: [],
  });

  order?: IOrder;

  constructor(
    protected orderService: OrderService,
    protected wardService: WardService,
    protected districtService: DistrictService,
    protected productService: ProductService,
    protected activatedRoute: ActivatedRoute,
    protected fb: FormBuilder,
    public activeModal?: NgbActiveModal
  ) {}

  ngOnInit(): void {
    this.loadRelationshipsOptions();

    this.activatedRoute.data.subscribe(({ order }) => {
      if (order.id === undefined) {
        const today = dayjs().startOf('day');
        order.date = today;
      }
      this.order = order;

      this.updateForm(order);
    });

    if (this.product) {
      this.isEditForm = false;
    }
  }

  previousState(): void {
    window.history.back();
  }

  onDistrictChange(selectedDistrict: IDistrict): void {
    // reset value for ward
    this.editForm.controls['ward'].setValue('');

    // filter ward list by selected district
    this.wardsSharedCollectionByDistrict = this.wardsSharedCollection.filter(ward => ward.district?.id === selectedDistrict.id);
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

  updateFormFromDialog(): void {
    this.order = new Order();
    const today = dayjs().startOf('day');
    this.order.date = today;
    this.loadRelationshipsOptions();

    this.updateForm(this.order);
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IOrder>>): void {
    result.pipe(finalize(() => this.onSaveFinalize())).subscribe({
      next: () => this.onSaveSuccess(),
      error: () => this.onSaveError(),
    });
  }

  protected onSaveSuccess(): void {
    if (this.product) {
      this.activeModal?.dismiss('Cross click');
      this.productComponent?.loadPage();
    } else {
      this.previousState();
    }
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
      product: this.product ?? order.product,
    });

    this.wardsSharedCollection = this.wardService.addWardToCollectionIfMissing(this.wardsSharedCollection, order.ward);
    this.districtsSharedCollection = this.districtService.addDistrictToCollectionIfMissing(this.districtsSharedCollection, order.district);
    this.productsSharedCollection = this.productService.addProductToCollectionIfMissing(this.productsSharedCollection, order.product);

    // filter ward list by selected district
    this.wardsSharedCollectionByDistrict = this.wardsSharedCollection.filter(ward => ward.district?.id === order.district?.id);
  }

  protected loadRelationshipsOptions(): void {
    this.wardService
      .query(maxQuery)
      .pipe(map((res: HttpResponse<IWard[]>) => res.body ?? []))
      .pipe(map((wards: IWard[]) => this.wardService.addWardToCollectionIfMissing(wards, this.editForm.get('ward')!.value)))
      .subscribe((wards: IWard[]) => (this.wardsSharedCollection = wards));

    this.districtService
      .query(maxQuery)
      .pipe(map((res: HttpResponse<IDistrict[]>) => res.body ?? []))
      .pipe(
        map((districts: IDistrict[]) =>
          this.districtService.addDistrictToCollectionIfMissing(districts, this.editForm.get('district')!.value)
        )
      )
      .subscribe((districts: IDistrict[]) => (this.districtsSharedCollection = districts));

    if (this.product?.id) {
      this.productService
        .find(this.product.id)
        .pipe(map((res: HttpResponse<IProduct>) => res.body ?? {}))
        .subscribe((product: IProduct) => (this.productsSharedCollection = [product]));
    } else {
      this.productService
        .query(maxQuery)
        .pipe(map((res: HttpResponse<IProduct[]>) => res.body ?? []))
        .pipe(
          map((products: IProduct[]) => this.productService.addProductToCollectionIfMissing(products, this.editForm.get('product')!.value))
        )
        .subscribe((products: IProduct[]) => (this.productsSharedCollection = products));
    }
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
