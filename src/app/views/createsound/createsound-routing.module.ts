import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreatesoundPage } from './createsound.page';

const routes: Routes = [
  {
    path: '',
    component: CreatesoundPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CreatesoundPageRoutingModule {}
