import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RetraitsPage } from './retraits.page';

const routes: Routes = [
  {
    path: '',
    component: RetraitsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RetraitsPageRoutingModule {}
