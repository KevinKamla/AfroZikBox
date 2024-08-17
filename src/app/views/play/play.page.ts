/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController, NavController } from '@ionic/angular';
import { MusicoptionPage } from 'src/app/components/musicoption/musicoption.page';

export let musicTab = {
  musicIsPlay: false,
  isClose: true
}

@Component({
  selector: 'app-play',
  templateUrl: './play.page.html',
  styleUrls: ['./play.page.scss'],
})


export class PlayPage implements OnInit {

  musictabOption = musicTab;
  muteIcon: string = "mute";
  pauseIcon: string = "play";
  gesVol: string = "medium";

  constructor(
    public navCtrl: NavController,
    public route: Router,
    private modalCtrl: ModalController,
  ) { }

  goToRoute(route: string = '') {
    if (route) {
      this.route.navigate([route]);
    } else {
      this.navCtrl.pop();
    }
  }

  play() {
    if (this.pauseIcon == "pause") {
      this.pauseIcon = "play";
      musicTab.isClose = false;
      musicTab.musicIsPlay = false;

    } else {
      this.pauseIcon = "pause";
      musicTab.isClose = false;
      musicTab.musicIsPlay = true;
    }
  }



  async openOptionSound() {
    const modal = await this.modalCtrl.create({
      component: MusicoptionPage,
      initialBreakpoint: 0.75,
      breakpoints: [0.5, 0.75, 1],
      mode: 'ios'

    })
    await modal.present();
  }


  ngOnInit() {
    musicTab.musicIsPlay? this.pauseIcon = 'pause' : this.pauseIcon = 'play';
    
  }

}
