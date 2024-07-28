/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Camera, CameraResultType } from '@capacitor/camera';

@Component({
  selector: 'app-virement',
  templateUrl: './virement.page.html',
  styleUrls: ['./virement.page.scss'],
})
export class VirementPage implements OnInit {

  option: string = "";
  isGetImg = false;
  imgPath: string = '';
  imgMucic: string = '';
  cardNumber: any;
  cvc: any;
  nameTitular: any;
  expireDate: any;

  constructor(
    private actvroute: ActivatedRoute,
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
    this.option = this.actvroute.snapshot.params['option'];
  }

}
