import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreatepubPageRoutingModule } from './createpub-routing.module';

import { CreatepubPage } from './createpub.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CreatepubPageRoutingModule
  ],
  declarations: [CreatepubPage]
})
export class CreatepubPageModule {}
