import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'product',
        data: { pageTitle: 'junkShopApplicationApp.product.home.title' },
        loadChildren: () => import('./product/product.module').then(m => m.ProductModule),
      },
      {
        path: 'file',
        data: { pageTitle: 'junkShopApplicationApp.file.home.title' },
        loadChildren: () => import('./file/file.module').then(m => m.FileModule),
      },
      {
        path: 'order',
        data: { pageTitle: 'junkShopApplicationApp.order.home.title' },
        loadChildren: () => import('./order/order.module').then(m => m.OrderModule),
      },
      {
        path: 'ward',
        data: { pageTitle: 'junkShopApplicationApp.ward.home.title' },
        loadChildren: () => import('./ward/ward.module').then(m => m.WardModule),
      },
      {
        path: 'district',
        data: { pageTitle: 'junkShopApplicationApp.district.home.title' },
        loadChildren: () => import('./district/district.module').then(m => m.DistrictModule),
      },
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ]),
  ],
})
export class EntityRoutingModule {}
