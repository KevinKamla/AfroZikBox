import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ArtistprofilPage } from './artistprofil.page';

const routes: Routes = [
  {
    path: '',
    component: ArtistprofilPage
  },
  {
    path: 'mymusic/:type',
    loadChildren: () => import('../../../views/Artists/mymusic/mymusic.module').then( m => m.MymusicPageModule)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ArtistprofilPageRoutingModule {}
