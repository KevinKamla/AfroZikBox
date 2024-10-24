import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-albummodal',
  templateUrl: './albummodal.page.html',
  styleUrls: ['./albummodal.page.scss'],
})
export class AlbummodalPage  {

  message: string = 'Cette action est exclusivement disponible sur le site pour des raisons de qualité et de performance.';

  constructor(private modalController: ModalController) {}

  closeModal() {
    this.modalController.dismiss();
  }

}
