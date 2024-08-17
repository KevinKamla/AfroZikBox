import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AlbumdetailPage } from './albumdetail.page';

const routes: Routes = [
  {
    path: '',
    component: AlbumdetailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AlbumdetailPageRoutingModule {}
