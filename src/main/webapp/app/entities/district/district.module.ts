import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { DistrictComponent } from './list/district.component';
import { DistrictDetailComponent } from './detail/district-detail.component';
import { DistrictUpdateComponent } from './update/district-update.component';
import { DistrictDeleteDialogComponent } from './delete/district-delete-dialog.component';
import { DistrictRoutingModule } from './route/district-routing.module';

@NgModule({
  imports: [SharedModule, DistrictRoutingModule],
  declarations: [DistrictComponent, DistrictDetailComponent, DistrictUpdateComponent, DistrictDeleteDialogComponent],
  entryComponents: [DistrictDeleteDialogComponent],
})
export class DistrictModule {}
