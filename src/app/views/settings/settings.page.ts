/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
import { Component, OnInit } from '@angular/core';
import { ActionSheetController, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {

  themeList = ["Light", "Dark"];

  constructor(
    private modal: ModalController,
    private actionSheetController: ActionSheetController

  ) { }

  async presentActionSheet() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Se déconnecter',
      subHeader: 'Êtes vous sûr de vouloir vous déconnecter ?',
      buttons: [
        {
          text: 'Annuler',
          cssClass: 'btn-white',
          handler: () => {
            console.log('Delete clicked');
          }
        },
        {
          text: 'Oui',
          cssClass: 'btn-primary',
          handler: () => {
            console.log('Share clicked');
          }

        }]
    });

    await actionSheet.present();
  }

  selectedTheme(theme: string) {
    this.modal.dismiss();
  }
  ngOnInit() {
  }

}
