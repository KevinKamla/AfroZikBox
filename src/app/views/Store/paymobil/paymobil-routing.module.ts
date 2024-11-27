import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PaymobilPage } from './paymobil.page';

const routes: Routes = [
  {
    path: '',
    component: PaymobilPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PaymobilPageRoutingModule {}
