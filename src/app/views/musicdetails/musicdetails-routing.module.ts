import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MusicdetailsPage } from './musicdetails.page';

const routes: Routes = [
  {
    path: '',
    component: MusicdetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MusicdetailsPageRoutingModule {}
