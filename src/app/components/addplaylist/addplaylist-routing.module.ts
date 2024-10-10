import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddplaylistPage } from './addplaylist.page';

const routes: Routes = [
  {
    path: '',
    component: AddplaylistPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddplaylistPageRoutingModule {}
