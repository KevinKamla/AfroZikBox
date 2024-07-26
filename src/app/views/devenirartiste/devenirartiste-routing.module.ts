import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DevenirartistePage } from './devenirartiste.page';

const routes: Routes = [
  {
    path: '',
    component: DevenirartistePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DevenirartistePageRoutingModule {}
