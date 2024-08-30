import { Component, OnInit } from '@angular/core';
import { musicTab } from '../play/play.page';
import { MusicoptionPage } from 'src/app/components/musicoption/musicoption.page';
import { ModalController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-download',
  templateUrl: './download.page.html',
  styleUrls: ['./download.page.scss'],
})
export class DownloadPage implements OnInit {

  constructor(
    private modalCtrl: ModalController,
    public navCtrl: NavController,
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
    this
  }

}
