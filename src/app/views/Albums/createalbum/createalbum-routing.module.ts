import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreatealbumPage } from './createalbum.page';

const routes: Routes = [
  {
    path: '',
    component: CreatealbumPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CreatealbumPageRoutingModule {}
