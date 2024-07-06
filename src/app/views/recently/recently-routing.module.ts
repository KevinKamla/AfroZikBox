import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RecentlyPage } from './recently.page';

const routes: Routes = [
  {
    path: '',
    component: RecentlyPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RecentlyPageRoutingModule {}
