import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Auth2faPageRoutingModule } from './auth2fa-routing.module';

import { Auth2faPage } from './auth2fa.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Auth2faPageRoutingModule
  ],
  declarations: [Auth2faPage]
})
export class Auth2faPageModule {}
