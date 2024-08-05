import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GenrePageRoutingModule } from './genre-routing.module';

import { GenrePage } from './genre.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GenrePageRoutingModule
  ],
  declarations: [GenrePage]
})
export class GenrePageModule {}
