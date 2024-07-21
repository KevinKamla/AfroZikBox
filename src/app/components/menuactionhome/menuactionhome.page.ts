/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CreateplaylistPage } from '../createplaylist/createplaylist.page';


@Component({
  selector: 'app-menuactionhome',
  templateUrl: './menuactionhome.page.html',
  styleUrls: ['./menuactionhome.page.scss'],
})
export class MenuactionhomePage implements OnInit {

  constructor(
    private modalCtrl: ModalController,
  ) { }

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