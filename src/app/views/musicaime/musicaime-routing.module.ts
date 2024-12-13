import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MusicaimePage } from './musicaime.page';

const routes: Routes = [
  {
    path: '',
    component: MusicaimePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MusicaimePageRoutingModule {}
