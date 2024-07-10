import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddstoryPage } from './addstory.page';

const routes: Routes = [
  {
    path: '',
    component: AddstoryPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddstoryPageRoutingModule {}
