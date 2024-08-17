import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AbonnementPage } from './abonnement.page';

const routes: Routes = [
  {
    path: '',
    component: AbonnementPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AbonnementPageRoutingModule {}
