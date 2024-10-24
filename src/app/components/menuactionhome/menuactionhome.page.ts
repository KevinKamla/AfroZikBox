/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CreateplaylistPage } from '../createplaylist/createplaylist.page';
import { AlbummodalPage } from '../albummodal/albummodal.page';


@Component({
  selector: 'app-menuactionhome',
  templateUrl: './menuactionhome.page.html',
  styleUrls: ['./menuactionhome.page.scss'],
})
export class MenuactionhomePage implements OnInit {
  message: string = 'Cette action est exclusivement disponible sur le site pour des raisons de qualité et de performance.';
  constructor(
    private modalCtrl: ModalController,
  ) { }



  async albumModal() {
    this.closeModal();
    const modal = await this.modalCtrl.create({
      component: AlbummodalPage,
      initialBreakpoint: 0.75,
      breakpoints: [0.5, 0.75, 1],
      mode: 'ios'
    });
    return await modal.present();
  }
  async openCreatePlaylist() {
    this.closeModal();
    const modal = await this.modalCtrl.create({
      component: CreateplaylistPage,
      initialBreakpoint: 0.75,
      breakpoints: [0.5, 0.75, 1],
      mode: 'ios'

    })
    await modal.present();
  }


  closeModal() {
    this.modalCtrl.dismiss();
  }


  ngOnInit() {
  }


}