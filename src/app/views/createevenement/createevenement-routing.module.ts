import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreateevenementPage } from './createevenement.page';

const routes: Routes = [
  {
    path: '',
    component: CreateevenementPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CreateevenementPageRoutingModule {}
