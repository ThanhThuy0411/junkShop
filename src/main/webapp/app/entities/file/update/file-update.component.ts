import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { IFile, File } from '../file.model';
import { FileService } from '../service/file.service';
import { IProduct } from 'app/entities/product/product.model';
import { ProductService } from 'app/entities/product/service/product.service';
import { FileType } from 'app/entities/enumerations/file-type.model';

@Component({
  selector: 'jhi-file-update',
  templateUrl: './file-update.component.html',
})
export class FileUpdateComponent implements OnInit {
  isSaving = false;
  fileTypeValues = Object.keys(FileType);

  productsSharedCollection: IProduct[] = [];

  editForm = this.fb.group({
    id: [],
    fileName: [null, [Validators.required]],
    fileType: [],
    url: [],
    product: [],
  });

  constructor(
    protected fileService: FileService,
    protected productService: ProductService,
    protected activatedRoute: ActivatedRoute,
    protected fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ file }) => {
      this.updateForm(file);

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const file = this.createFromForm();
    if (file.id !== undefined) {
      this.subscribeToSaveResponse(this.fileService.update(file));
    } else {
      this.subscribeToSaveResponse(this.fileService.create(file));
    }
  }

  trackProductById(_index: number, item: IProduct): number {
    return item.id!;
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IFile>>): void {
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

  protected updateForm(file: IFile): void {
    this.editForm.patchValue({
      id: file.id,
      fileName: file.fileName,
      fileType: file.fileType,
      url: file.url,
      product: file.product,
    });

    this.productsSharedCollection = this.productService.addProductToCollectionIfMissing(this.productsSharedCollection, file.product);
  }

  protected loadRelationshipsOptions(): void {
    this.productService
      .query()
      .pipe(map((res: HttpResponse<IProduct[]>) => res.body ?? []))
      .pipe(
        map((products: IProduct[]) => this.productService.addProductToCollectionIfMissing(products, this.editForm.get('product')!.value))
      )
      .subscribe((products: IProduct[]) => (this.productsSharedCollection = products));
  }

  protected createFromForm(): IFile {
    return {
      ...new File(),
      id: this.editForm.get(['id'])!.value,
      fileName: this.editForm.get(['fileName'])!.value,
      fileType: this.editForm.get(['fileType'])!.value,
      url: this.editForm.get(['url'])!.value,
      product: this.editForm.get(['product'])!.value,
    };
  }
}
