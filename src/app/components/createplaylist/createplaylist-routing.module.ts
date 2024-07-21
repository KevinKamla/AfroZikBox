import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreateplaylistPage } from './createplaylist.page';

const routes: Routes = [
  {
    path: '',
    component: CreateplaylistPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CreateplaylistPageRoutingModule {}
