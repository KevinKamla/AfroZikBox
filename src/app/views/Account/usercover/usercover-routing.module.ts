import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UsercoverPage } from './usercover.page';

const routes: Routes = [
  {
    path: '',
    component: UsercoverPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UsercoverPageRoutingModule {}
