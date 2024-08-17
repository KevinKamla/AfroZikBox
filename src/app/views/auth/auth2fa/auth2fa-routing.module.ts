import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Auth2faPage } from './auth2fa.page';

const routes: Routes = [
  {
    path: '',
    component: Auth2faPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Auth2faPageRoutingModule {}
