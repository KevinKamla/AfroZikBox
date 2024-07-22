/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
import { Component, CUSTOM_ELEMENTS_SCHEMA, NgModule, OnInit } from '@angular/core';
import { IonPopover, ModalController, NavController, PopoverController } from '@ionic/angular';
import { MusicoptionPage } from 'src/app/components/musicoption/musicoption.page';

@Component({
  selector: 'app-best-songs',
  templateUrl: './best-songs.page.html',
  styleUrls: ['./best-songs.page.scss'],
})
export class BestSongsPage implements OnInit {

  
  constructor(
    private modalCtrl: ModalController,
    public navCtrl: NavController,
  ) { }

  
  async openOptionSound() {
    const modal = await this.modalCtrl.create({
      component: MusicoptionPage,
      initialBreakpoint: 0.75,
      breakpoints: [0.5, 0.75],
      mode: 'ios'

    })
    await modal.present();
  }

  goToPlay() {
    this.navCtrl.navigateForward('play');
  }


  ngOnInit() {
    this
  }

}
