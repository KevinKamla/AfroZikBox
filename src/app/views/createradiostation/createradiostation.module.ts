import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreateradiostationPageRoutingModule } from './createradiostation-routing.module';

import { CreateradiostationPage } from './createradiostation.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CreateradiostationPageRoutingModule
  ],
  declarations: [CreateradiostationPage]
})
export class CreateradiostationPageModule {}
