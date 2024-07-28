import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AffiliesPage } from './affilies.page';

const routes: Routes = [
  {
    path: '',
    component: AffiliesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AffiliesPageRoutingModule {}
