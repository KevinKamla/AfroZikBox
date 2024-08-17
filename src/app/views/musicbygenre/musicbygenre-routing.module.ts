import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MusicbygenrePage } from './musicbygenre.page';

const routes: Routes = [
  {
    path: '',
    component: MusicbygenrePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MusicbygenrePageRoutingModule {}
