import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ArtistPageRoutingModule } from './artist-routing.module';

import { ArtistPage } from './artist.page';
import { ArtistprofilPage } from '../artistprofil/artistprofil.page';

const routes: Routes = [
  { path: '', component: ArtistPage },
  { path: 'artist-profil/:id', component: ArtistprofilPage },
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    CommonModule,
    FormsModule,
    IonicModule,
    ArtistPageRoutingModule
  ],
  declarations: []
})
export class ArtistPageModule {}
