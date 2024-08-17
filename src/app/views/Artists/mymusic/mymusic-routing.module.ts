import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MymusicPage } from './mymusic.page';

const routes: Routes = [
  {
    path: '',
    component: MymusicPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MymusicPageRoutingModule {}
