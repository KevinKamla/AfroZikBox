import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UploadmusicPage } from './uploadmusic.page';

const routes: Routes = [
  {
    path: '',
    component: UploadmusicPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UploadmusicPageRoutingModule {}
