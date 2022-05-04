import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IWard } from '../ward.model';
import { WardService } from '../service/ward.service';

@Component({
  templateUrl: './ward-delete-dialog.component.html',
})
export class WardDeleteDialogComponent {
  ward?: IWard;

  constructor(protected wardService: WardService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.wardService.delete(id).subscribe(() => {
      this.activeModal.close('deleted');
    });
  }
}
