import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListtendancePage } from './listtendance.page';

const routes: Routes = [
  {
    path: '',
    component: ListtendancePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListtendancePageRoutingModule {}
