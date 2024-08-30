import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditeplaylistPage } from './editeplaylist.page';

const routes: Routes = [
  {
    path: '',
    component: EditeplaylistPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditeplaylistPageRoutingModule {}
