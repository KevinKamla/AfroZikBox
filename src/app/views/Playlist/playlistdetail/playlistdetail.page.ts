import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController, NavController } from '@ionic/angular';
import { musicTab } from '../../play/play.page';
import { MusicoptionPage } from 'src/app/components/musicoption/musicoption.page';

@Component({
  selector: 'app-playlistdetail',
  templateUrl: './playlistdetail.page.html',
  styleUrls: ['./playlistdetail.page.scss'],
})
export class PlaylistdetailPage implements OnInit {

  pauseIcon: string = "play-circle";

  constructor(
    private modalCtrl: ModalController,
    public route: Router,
    private navCtrl: NavController,
  ) { }
  buttonAvert = [
    {
      text: 'Annuler',
    },
    {
      text: "D'accord",
      handler: () => {
        this.goToRoute('abonnement');
      },
    }
  ]

  async openOptionSound() {
    const modal = await this.modalCtrl.create({
      component: MusicoptionPage,
      initialBreakpoint: 0.75,
      breakpoints: [0.5, 0.75, 1],
      mode: 'ios'
    })

    await modal.present();
  }

  goToRoute(route: string = '') {
    if (route) {
      this.route.navigate([route]);
    } else {
      this.navCtrl.back();
    }
  }


  play() {
    if (this.pauseIcon == "pause") {
      this.pauseIcon = "play-circle";
      musicTab.isClose = false;
      musicTab.musicIsPlay = false;

    } else {
      this.pauseIcon = "play-circle";
      musicTab.isClose = false;
      musicTab.musicIsPlay = true;
    }
  }


  closeModal() {
    this.modalCtrl.dismiss();
  }

  ngOnInit() {
    this
  }

}
