import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreatepubPage } from './createpub.page';

const routes: Routes = [
  {
    path: '',
    component: CreatepubPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CreatepubPageRoutingModule {}
