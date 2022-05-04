import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { DistrictComponent } from '../list/district.component';
import { DistrictDetailComponent } from '../detail/district-detail.component';
import { DistrictUpdateComponent } from '../update/district-update.component';
import { DistrictRoutingResolveService } from './district-routing-resolve.service';

const districtRoute: Routes = [
  {
    path: '',
    component: DistrictComponent,
    data: {
      defaultSort: 'id,asc',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: DistrictDetailComponent,
    resolve: {
      district: DistrictRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: DistrictUpdateComponent,
    resolve: {
      district: DistrictRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: DistrictUpdateComponent,
    resolve: {
      district: DistrictRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(districtRoute)],
  exports: [RouterModule],
})
export class DistrictRoutingModule {}
