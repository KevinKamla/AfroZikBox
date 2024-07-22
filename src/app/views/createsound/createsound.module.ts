import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreatesoundPageRoutingModule } from './createsound-routing.module';

import { CreatesoundPage } from './createsound.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CreatesoundPageRoutingModule
  ],
  declarations: [CreatesoundPage]
})
export class CreatesoundPageModule {}
