import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IDistrict } from '../district.model';
import { DistrictService } from '../service/district.service';

@Component({
  templateUrl: './district-delete-dialog.component.html',
})
export class DistrictDeleteDialogComponent {
  district?: IDistrict;

  constructor(protected districtService: DistrictService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.districtService.delete(id).subscribe(() => {
      this.activeModal.close('deleted');
    });
  }
}
