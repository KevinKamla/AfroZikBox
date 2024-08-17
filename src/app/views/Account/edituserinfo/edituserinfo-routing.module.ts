import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EdituserinfoPage } from './edituserinfo.page';

const routes: Routes = [
  {
    path: '',
    component: EdituserinfoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EdituserinfoPageRoutingModule {}
