import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { musicTab } from '../../play/play.page';
import { ModalController, NavController } from '@ionic/angular';
import { MusicoptionPage } from 'src/app/components/musicoption/musicoption.page';

@Component({
  selector: 'app-mymusic',
  templateUrl: './mymusic.page.html',
  styleUrls: ['./mymusic.page.scss'],
})
export class MymusicPage implements OnInit {
  type: any;

  constructor(
    private aroute: ActivatedRoute,
    private modalCtrl: ModalController,
    public route: Router,
    private navCtrl: NavController,
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
  }


  goToRoute(route: string = '') {
    if (route) {
      this.route.navigate([route]);
    } else {
      this.navCtrl.back();
    }
  }

  ngOnInit() {
    this.type = this.aroute.snapshot.params['type'];

  }

}
