import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MylistePageRoutingModule } from './myliste-routing.module';

import { MylistePage } from './myliste.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MylistePageRoutingModule
  ],
  declarations: [MylistePage]
})
export class MylistePageModule {}
