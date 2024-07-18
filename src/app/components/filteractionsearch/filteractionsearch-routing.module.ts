import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FilteractionsearchPage } from './filteractionsearch.page';

const routes: Routes = [
  {
    path: '',
    component: FilteractionsearchPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FilteractionsearchPageRoutingModule {}
