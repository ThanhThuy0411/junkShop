import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { IWard, Ward } from '../ward.model';
import { WardService } from '../service/ward.service';
import { IDistrict } from 'app/entities/district/district.model';
import { DistrictService } from 'app/entities/district/service/district.service';

@Component({
  selector: 'jhi-ward-update',
  templateUrl: './ward-update.component.html',
})
export class WardUpdateComponent implements OnInit {
  isSaving = false;

  districtsSharedCollection: IDistrict[] = [];

  editForm = this.fb.group({
    id: [],
    wardName: [],
    district: [],
  });

  constructor(
    protected wardService: WardService,
    protected districtService: DistrictService,
    protected activatedRoute: ActivatedRoute,
    protected fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ ward }) => {
      this.updateForm(ward);

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const ward = this.createFromForm();
    if (ward.id !== undefined) {
      this.subscribeToSaveResponse(this.wardService.update(ward));
    } else {
      this.subscribeToSaveResponse(this.wardService.create(ward));
    }
  }

  trackDistrictById(_index: number, item: IDistrict): number {
    return item.id!;
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IWard>>): void {
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

  protected updateForm(ward: IWard): void {
    this.editForm.patchValue({
      id: ward.id,
      wardName: ward.wardName,
      district: ward.district,
    });

    this.districtsSharedCollection = this.districtService.addDistrictToCollectionIfMissing(this.districtsSharedCollection, ward.district);
  }

  protected loadRelationshipsOptions(): void {
    this.districtService
      .query()
      .pipe(map((res: HttpResponse<IDistrict[]>) => res.body ?? []))
      .pipe(
        map((districts: IDistrict[]) =>
          this.districtService.addDistrictToCollectionIfMissing(districts, this.editForm.get('district')!.value)
        )
      )
      .subscribe((districts: IDistrict[]) => (this.districtsSharedCollection = districts));
  }

  protected createFromForm(): IWard {
    return {
      ...new Ward(),
      id: this.editForm.get(['id'])!.value,
      wardName: this.editForm.get(['wardName'])!.value,
      district: this.editForm.get(['district'])!.value,
    };
  }
}
