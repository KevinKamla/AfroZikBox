import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreateradiostationPage } from './createradiostation.page';

const routes: Routes = [
  {
    path: '',
    component: CreateradiostationPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CreateradiostationPageRoutingModule {}
