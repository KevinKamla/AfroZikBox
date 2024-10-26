import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AlbummodalPage } from './albummodal.page';

const routes: Routes = [
  {
    path: '',
    component: AlbummodalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AlbummodalPageRoutingModule {}
