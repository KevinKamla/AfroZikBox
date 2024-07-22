/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController, NavController } from '@ionic/angular';
import { MusicoptionPage } from 'src/app/components/musicoption/musicoption.page';

@Component({
  selector: 'app-play',
  templateUrl: './play.page.html',
  styleUrls: ['./play.page.scss'],
})
export class PlayPage implements OnInit {


  musicIsPlay = false;
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
      this.musicIsPlay = false;
      
    } else {
      this.pauseIcon = "pause";
      this.musicIsPlay = true;
    }
  }
  
    

  async openOptionSound() {
    const modal = await this.modalCtrl.create({
      component: MusicoptionPage,
      initialBreakpoint: 0.75,
      breakpoints: [0.5, 0.75],
      mode: 'ios'

    })
    await modal.present();
  }


  ngOnInit() {
  }

}
