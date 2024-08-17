import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PlaylistpopularPage } from './playlistpopular.page';

const routes: Routes = [
  {
    path: '',
    component: PlaylistpopularPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PlaylistpopularPageRoutingModule {}
