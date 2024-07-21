/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
import { Component, OnInit } from '@angular/core';
import { Camera, CameraResultType } from '@capacitor/camera';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-createplaylist',
  templateUrl: './createplaylist.page.html',
  styleUrls: ['./createplaylist.page.scss'],
})
export class CreateplaylistPage implements OnInit {


  isGetImg = false;
  imgPath: string = '';

  constructor(
    private modalCtrl: ModalController,
  ) { }


  async camera() {
    const image = await Camera.getPhoto({
      quality: 100,
      allowEditing: false,
      resultType: CameraResultType.Base64
    });

    this.imgPath = 'data:image/png;base64,' + image.base64String
    this.isGetImg = true
  }

  
  closeModal() {
    this.modalCtrl.dismiss();
  }
  
  ngOnInit() {
  }

}
