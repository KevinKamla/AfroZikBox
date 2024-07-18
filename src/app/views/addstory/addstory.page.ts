/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
import { Component, OnInit } from '@angular/core';
import { Camera, CameraResultType } from '@capacitor/camera';
import { ActionSheetController } from '@ionic/angular';
import { Filesystem, Directory } from '@capacitor/filesystem';
import { FileChooser } from '@ionic-native/file-chooser/ngx';


@Component({
  selector: 'app-addstory',
  templateUrl: './addstory.page.html',
  styleUrls: ['./addstory.page.scss'],
})
export class AddstoryPage implements OnInit {


  isGetImg = false;
  imgPath: string = '';
  imgMucic: string = '';
  canview = 'Qui peut voir'

  constructor(
    private actionSheetCtrl: ActionSheetController,
    private fileChooser: FileChooser
  ) { }

  async pickAudioFile() {
    const result = await this.fileChooser.open({
      mime: 'audio/mp3',      
    });
  
    if (result && result.length > 0) {
      const fileObject = result[0];
      // const filePath = fileObject.nativeURL;
      
    }
    this.imgMucic = 'assets/icon/son.png';
  }



  async camera() {
    const image = await Camera.getPhoto({
      quality: 100,
      allowEditing: false,
      resultType: CameraResultType.Base64
    });

    this.imgPath = 'data:image/png;base64,' + image.base64String
    this.isGetImg = true
  }

  async openCanViewModal() {
    const actionSheet = await this.actionSheetCtrl.create({
      header: 'Qui peut voir ?',
      buttons: [
        {
          text: 'Mes abonnés',
          handler: () => {
            this.canview = "Mes abonnés"
            console.log(this.canview);

          }
        },
        {
          text: 'Tout le monde(Promotion)',
          handler: () => {
            this.canview = 'Tout le monde(Promotion)'
            console.log(this.canview);

          }
        }
      ]
    })

    await actionSheet.present();
  }


  ngOnInit() {
  }

}
