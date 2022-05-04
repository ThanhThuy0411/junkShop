import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { WardComponent } from '../list/ward.component';
import { WardDetailComponent } from '../detail/ward-detail.component';
import { WardUpdateComponent } from '../update/ward-update.component';
import { WardRoutingResolveService } from './ward-routing-resolve.service';

const wardRoute: Routes = [
  {
    path: '',
    component: WardComponent,
    data: {
      defaultSort: 'id,asc',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: WardDetailComponent,
    resolve: {
      ward: WardRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: WardUpdateComponent,
    resolve: {
      ward: WardRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: WardUpdateComponent,
    resolve: {
      ward: WardRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(wardRoute)],
  exports: [RouterModule],
})
export class WardRoutingModule {}
