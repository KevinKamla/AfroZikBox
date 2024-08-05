/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {

  themeList = ["Light", "Dark"];

  constructor(
    private modal: ModalController,
  ) { }
  
  selectedTheme(theme: string) {
    this.modal.dismiss();
  }
  ngOnInit() {
  }

}
