import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserlockPage } from './userlock.page';

const routes: Routes = [
  {
    path: '',
    component: UserlockPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserlockPageRoutingModule {}
