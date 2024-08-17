import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PlaylistdetailPage } from './playlistdetail.page';

const routes: Routes = [
  {
    path: '',
    component: PlaylistdetailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PlaylistdetailPageRoutingModule {}
