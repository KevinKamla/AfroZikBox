import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AfrozikstorePage } from './afrozikstore.page';

const routes: Routes = [
  {
    path: '',
    component: AfrozikstorePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AfrozikstorePageRoutingModule {}
