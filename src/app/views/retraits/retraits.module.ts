import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RetraitsPageRoutingModule } from './retraits-routing.module';

import { RetraitsPage } from './retraits.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RetraitsPageRoutingModule
  ],
  declarations: [RetraitsPage]
})
export class RetraitsPageModule {}
