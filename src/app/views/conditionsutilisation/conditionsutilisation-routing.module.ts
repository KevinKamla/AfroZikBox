import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ConditionsutilisationPage } from './conditionsutilisation.page';

const routes: Routes = [
  {
    path: '',
    component: ConditionsutilisationPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ConditionsutilisationPageRoutingModule {}
