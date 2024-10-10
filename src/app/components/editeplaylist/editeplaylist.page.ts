import { Component, Input, OnInit } from '@angular/core';
import { Camera, CameraResultType } from '@capacitor/camera';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-editeplaylist',
  templateUrl: './editeplaylist.page.html',
  styleUrls: ['./editeplaylist.page.scss'],
})
export class EditeplaylistPage implements OnInit {

  @Input() playlistId: any | undefined;
  playlistEdit: any | null = null;
  valueConfid = 'Publique';
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

  selectedConfid(item:string) {
    this.valueConfid = item;
    this.closeModal();
  }

  closeModal() {
    this.modalCtrl.dismiss();
  }
  
  ngOnInit() {
    if (this.playlistId && this.playlistId.thumbnail_ready) {
      this.imgPath = this.playlistId.thumbnail_ready;
      this.isGetImg = true;
    } else {
      console.log("playlistId ou thumbnail_ready est undefined");
    }
  }

}
