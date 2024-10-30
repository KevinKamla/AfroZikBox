import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddstoryPageRoutingModule } from './addstory-routing.module';

import { AddstoryPage } from './addstory.page';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; // Ajout de ReactiveFormsModule

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule, // Ajout ici
    AddstoryPageRoutingModule
  ],
  declarations: [AddstoryPage]
})
export class AddstoryPageModule {}
