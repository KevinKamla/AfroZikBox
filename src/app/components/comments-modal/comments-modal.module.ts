import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CommentsModalPageRoutingModule } from './comments-modal-routing.module';

import { CommentsModalPage } from './comments-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CommentsModalPageRoutingModule
  ],
  declarations: [CommentsModalPage]
})
export class CommentsModalPageModule {}
