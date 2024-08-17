import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AmisinvitePage } from './amisinvite.page';

const routes: Routes = [
  {
    path: '',
    component: AmisinvitePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AmisinvitePageRoutingModule {}
