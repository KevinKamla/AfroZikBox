import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CommentsModalPage } from './comments-modal.page';

const routes: Routes = [
  {
    path: '',
    component: CommentsModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CommentsModalPageRoutingModule {}
