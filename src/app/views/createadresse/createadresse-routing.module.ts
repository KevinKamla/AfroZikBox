import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreateadressePage } from './createadresse.page';

const routes: Routes = [
  {
    path: '',
    component: CreateadressePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CreateadressePageRoutingModule {}
