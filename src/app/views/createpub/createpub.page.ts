/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
import { Component, OnInit } from '@angular/core';
import { Camera, CameraResultType } from '@capacitor/camera';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-createpub',
  templateUrl: './createpub.page.html',
  styleUrls: ['./createpub.page.scss'],
})
export class CreatepubPage implements OnInit {
  isGetImg = false;
  imgPath: string = '';

  constructor(
    private modal: ModalController
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

  ngOnInit() {
  }

}
