/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
import { Component, OnInit } from '@angular/core';
import { Camera, CameraResultType } from '@capacitor/camera';
import { ActionSheetController } from '@ionic/angular';

@Component({
  selector: 'app-createalbum',
  templateUrl: './createalbum.page.html',
  styleUrls: ['./createalbum.page.scss'],
})
export class CreatealbumPage implements OnInit {

  isGetImg = false;
  imgPath: string = '';

  constructor(
    private actionSheetCtrl: ActionSheetController,
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
