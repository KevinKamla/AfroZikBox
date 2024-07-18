import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SettingnotifPage } from './settingnotif.page';

const routes: Routes = [
  {
    path: '',
    component: SettingnotifPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SettingnotifPageRoutingModule {}
