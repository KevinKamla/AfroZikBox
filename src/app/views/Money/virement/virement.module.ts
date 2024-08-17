import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VirementPageRoutingModule } from './virement-routing.module';

import { VirementPage } from './virement.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VirementPageRoutingModule
  ],
  declarations: [VirementPage]
})
export class VirementPageModule {}
