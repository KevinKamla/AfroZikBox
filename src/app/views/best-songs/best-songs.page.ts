/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
import { Component, CUSTOM_ELEMENTS_SCHEMA, NgModule, OnInit } from '@angular/core';
import { IonPopover, ModalController, NavController, PopoverController } from '@ionic/angular';
import { MusicoptionPage } from 'src/app/components/musicoption/musicoption.page';
import { musicTab } from '../../views/play/play.page';
import { TopSongsService } from '../../services/top-songs.service';
@Component({
  selector: 'app-best-songs',
  templateUrl: './best-songs.page.html',
  styleUrls: ['./best-songs.page.scss'],
})
export class BestSongsPage implements OnInit {

  topSongs: any[] = [];
  constructor(
    private modalCtrl: ModalController,
    public navCtrl: NavController,
    private topsService: TopSongsService,
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

  numberOfTopSongs: number = 0;
  ngOnInit() {
    this.topsService.getTopSongs().subscribe(
      (response) => {
        console.log('Meilleur songs récupérés :', response);
        this.topSongs = response.data;

        const numberOfSongs = this.topSongs.length;
        console.log('Nombre de Meilleur songs :', numberOfSongs);

        this.numberOfTopSongs = numberOfSongs;
      },
      (error) => {
        console.error('Erreur lors de la récupération des Meilleur songs :', error);
      }
    );
  }

}
