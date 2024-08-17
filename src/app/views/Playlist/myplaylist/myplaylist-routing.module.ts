import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MyplaylistPage } from './myplaylist.page';

const routes: Routes = [
  {
    path: '',
    component: MyplaylistPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MyplaylistPageRoutingModule {}
