/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
import { Component, OnInit } from '@angular/core';
import { ActionSheetController, ModalController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {

  themeList = ["Light", "Dark"];
  email: string = '';  
  avatar: any;
  name = ''
  

  constructor(
    private storage: Storage,
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
  async ngOnInit() {
    const u = localStorage.getItem("UserData")
    if (u) {
      const UserData = JSON.parse(u)
      console.log("userdata :", UserData )
      this.email = UserData.email
      this.avatar = UserData.avatar
      this.name = UserData.name
    }
    // await this.storage.create(); 

    // Récupérer les informations utilisateur stockées
    // const user = await this.storage.get('user');
    // if (user) {
    //   this.email = user.email;  // Assigner l'email stocké à la variable
    // }
  }

}
