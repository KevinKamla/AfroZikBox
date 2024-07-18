import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MenuactionhomePage } from './menuactionhome.page';

const routes: Routes = [
  {
    path: '',
    component: MenuactionhomePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MenuactionhomePageRoutingModule {}
