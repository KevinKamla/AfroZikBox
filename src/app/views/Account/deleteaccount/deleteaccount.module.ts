import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DeleteaccountPageRoutingModule } from './deleteaccount-routing.module';

import { DeleteaccountPage } from './deleteaccount.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DeleteaccountPageRoutingModule
  ],
  declarations: [DeleteaccountPage]
})
export class DeleteaccountPageModule {}
