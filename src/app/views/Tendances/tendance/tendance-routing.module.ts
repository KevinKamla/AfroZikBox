import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TendancePage } from './tendance.page';

const routes: Routes = [
  {
    path: '',
    component: TendancePage
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TendancePageRoutingModule {}
