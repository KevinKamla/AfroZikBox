import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MylistePage } from './myliste.page';

const routes: Routes = [
  {
    path: '',
    component: MylistePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MylistePageRoutingModule {}
