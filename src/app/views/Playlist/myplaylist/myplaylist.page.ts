import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController, NavController } from '@ionic/angular';
import { CreateplaylistPage } from 'src/app/components/createplaylist/createplaylist.page';
import { PlaylistoptionPage } from 'src/app/components/playlistoption/playlistoption.page';
import { PlaylistService } from 'src/app/services/playlist.service';

@Component({
  selector: 'app-myplaylist',
  templateUrl: './myplaylist.page.html',
  styleUrls: ['./myplaylist.page.scss'],
})
export class MyplaylistPage implements OnInit {

  playlist : any []=[];
  constructor(
    private modalCtrl: ModalController,
    public navCtrl: NavController,
    public route: Router,
    public playlistService : PlaylistService,
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
    this.playlistService.getPublicPlayList().subscribe(
      (response) => {
        console.log(response);
        this.playlist = response.success.playlists;
        console.log('playlist récupérés :', this.playlist);
      },
      (error) => {
        console.error('Erreur lors de la récupération des playlist :', error);
      }
    );
  }


}
