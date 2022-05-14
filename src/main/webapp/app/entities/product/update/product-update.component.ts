import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import dayjs from 'dayjs/esm';
import { DATE_TIME_FORMAT } from 'app/config/input.constants';

import { IProduct, Product } from '../product.model';
import { ProductService } from '../service/product.service';
import { IWard } from 'app/entities/ward/ward.model';
import { WardService } from 'app/entities/ward/service/ward.service';
import { IDistrict } from 'app/entities/district/district.model';
import { DistrictService } from 'app/entities/district/service/district.service';
import { ProductType } from 'app/entities/enumerations/product-type.model';
import { ProductStatus } from 'app/entities/enumerations/product-status.model';

export const maxQuery = { page: 0, size: 9999};

@Component({
  selector: 'jhi-product-update',
  templateUrl: './product-update.component.html',
})
export class ProductUpdateComponent implements OnInit {
  isSaving = false;
  productTypeValues = Object.keys(ProductType);
  productStatusValues = Object.keys(ProductStatus);

  wardsSharedCollection: IWard[] = [];
  districtsSharedCollection: IDistrict[] = [];

  editForm = this.fb.group({
    id: [],
    productName: [null, [Validators.required]],
    productType: ['', [Validators.required]],
    price: ['', [Validators.required]],
    address: ['', [Validators.required]],
    description: [],
    productStatus: [],
    date: [],
    ward: ['', [Validators.required]],
    district: ['', [Validators.required]],
    user: [],
  });
  product?: IProduct;


  constructor(
    protected productService: ProductService,
    protected wardService: WardService,
    protected districtService: DistrictService,
    protected activatedRoute: ActivatedRoute,
    protected fb: FormBuilder
  ) {}

  
  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ product }) => {
      if (product.id === undefined) {
        const today = dayjs().startOf('day');
        product.date = today;
      }
      this.product = product;
      this.updateForm(product);

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const product = this.createFromForm();
    if (product.id) {
      this.subscribeToSaveResponse(this.productService.update(product));
    } else {
      product.productStatus = ProductStatus.Stocking;
      this.subscribeToSaveResponse(this.productService.create(product));
    }
  }

  trackWardById(_index: number, item: IWard): number {
    return item.id!;
  }

  trackDistrictById(_index: number, item: IDistrict): number {
    return item.id!;
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IProduct>>): void {
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

  protected updateForm(product: IProduct): void {
    this.editForm.patchValue({
      id: product.id,
      user: product.user?.login,
      productName: product.productName,
      productType: product.productType,
      price: product.price,
      address: product.address,
      description: product.description,
      productStatus: product.productStatus,
      date: product.date ? product.date.format(DATE_TIME_FORMAT) : null,
      ward: product.ward,
      district: product.district,
    });

    this.wardsSharedCollection = this.wardService.addWardToCollectionIfMissing(this.wardsSharedCollection, product.ward);
    this.districtsSharedCollection = this.districtService.addDistrictToCollectionIfMissing(
      this.districtsSharedCollection,
      product.district
    );
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
  }

  protected createFromForm(): IProduct {
    return {
      ...new Product(),
      ...this.product,
      id: this.editForm.get(['id'])!.value,
      productName: this.editForm.get(['productName'])!.value,
      productType: this.editForm.get(['productType'])!.value,
      price: this.editForm.get(['price'])!.value,
      address: this.editForm.get(['address'])!.value,
      description: this.editForm.get(['description'])!.value,
      productStatus: this.editForm.get(['productStatus'])!.value,
      date: this.editForm.get(['date'])!.value ? dayjs(this.editForm.get(['date'])!.value, DATE_TIME_FORMAT) : undefined,
      ward: this.editForm.get(['ward'])!.value,
      district: this.editForm.get(['district'])!.value,
    };
  }
}
