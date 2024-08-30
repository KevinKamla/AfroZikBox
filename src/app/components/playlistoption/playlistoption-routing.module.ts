import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PlaylistoptionPage } from './playlistoption.page';

const routes: Routes = [
  {
    path: '',
    component: PlaylistoptionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PlaylistoptionPageRoutingModule {}
