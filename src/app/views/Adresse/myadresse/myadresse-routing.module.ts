import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MyadressePage } from './myadresse.page';

const routes: Routes = [
  {
    path: '',
    component: MyadressePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MyadressePageRoutingModule {}
