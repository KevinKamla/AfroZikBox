import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreateproductPage } from './createproduct.page';

const routes: Routes = [
  {
    path: '',
    component: CreateproductPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CreateproductPageRoutingModule {}
