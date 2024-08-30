import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController, NavController } from '@ionic/angular';
import { CreateplaylistPage } from 'src/app/components/createplaylist/createplaylist.page';
import { PlaylistoptionPage } from 'src/app/components/playlistoption/playlistoption.page';

@Component({
  selector: 'app-myplaylist',
  templateUrl: './myplaylist.page.html',
  styleUrls: ['./myplaylist.page.scss'],
})
export class MyplaylistPage implements OnInit {

  constructor(
    private modalCtrl: ModalController,
    public navCtrl: NavController,
    public route: Router,
  ) { }

  
  async openCreatePlaylist() {
    const modale = await this.modalCtrl.create({
      component: CreateplaylistPage,
      initialBreakpoint: 0.75,
      breakpoints: [0.5, 0.75, 1],
      mode: 'ios'

    })
    await modale.present();
  }

  goToRoute(route: string = '') {
    if (route) {
      this.route.navigate([route]);
    } else {
      this.navCtrl.back();
    }
  }

  async openOptionPlaylist() {
    const modale = await this.modalCtrl.create({
      component: PlaylistoptionPage,
      initialBreakpoint: 0.75,
      breakpoints: [0.5, 0.75, 1],
      mode: 'ios'

    })
    await modale.present();
  }


  ngOnInit() {
    this
  }


}
