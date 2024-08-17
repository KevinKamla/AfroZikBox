import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DeleteaccountPage } from './deleteaccount.page';

const routes: Routes = [
  {
    path: '',
    component: DeleteaccountPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DeleteaccountPageRoutingModule {}
