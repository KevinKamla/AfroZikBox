import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PartagerPage } from './partager.page';

const routes: Routes = [
  {
    path: '',
    component: PartagerPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PartagerPageRoutingModule {}
