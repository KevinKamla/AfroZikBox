/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
import { Component, OnInit } from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';
import { MusicoptionPage } from 'src/app/components/musicoption/musicoption.page';
import { musicTab } from '../play/play.page';

@Component({
  selector: 'app-favoris',
  templateUrl: './favoris.page.html',
  styleUrls: ['./favoris.page.scss'],
})
export class FavorisPage implements OnInit {

  constructor(
    private modalCtrl: ModalController,
    private navCtrl: NavController
  ) { }


  async openOptionSound() {
    const modal = await this.modalCtrl.create({
      component: MusicoptionPage,
      initialBreakpoint: 0.75,
      breakpoints: [0.5, 0.75, 1],
      mode: 'ios'
    })
    
    await modal.present();
  }

  goToPlay() {
    
    musicTab.musicIsPlay = true;
    musicTab.isClose = false;
    this.navCtrl.navigateForward('play');
  }

  ngOnInit() {
  }

}
