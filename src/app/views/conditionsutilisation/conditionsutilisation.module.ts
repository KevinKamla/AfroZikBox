import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ConditionsutilisationPageRoutingModule } from './conditionsutilisation-routing.module';

import { ConditionsutilisationPage } from './conditionsutilisation.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ConditionsutilisationPageRoutingModule
  ],
  declarations: [ConditionsutilisationPage]
})
export class ConditionsutilisationPageModule {}
