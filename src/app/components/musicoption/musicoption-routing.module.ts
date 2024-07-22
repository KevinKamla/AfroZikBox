import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MusicoptionPage } from './musicoption.page';

const routes: Routes = [
  {
    path: '',
    component: MusicoptionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MusicoptionPageRoutingModule {}
