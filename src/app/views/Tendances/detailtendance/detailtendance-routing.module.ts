import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetailtendancePage } from './detailtendance.page';

const routes: Routes = [
  {
    path: '',
    component: DetailtendancePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DetailtendancePageRoutingModule {}
