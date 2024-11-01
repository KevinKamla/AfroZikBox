import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EdituserinfoPageRoutingModule } from './edituserinfo-routing.module';

import { EdituserinfoPage } from './edituserinfo.page';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; // Ajout de ReactiveFormsModule

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule, // Ajout ici
    EdituserinfoPageRoutingModule
  ],
  declarations: [EdituserinfoPage]
})
export class EdituserinfoPageModule {}
