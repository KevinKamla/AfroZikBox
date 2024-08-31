/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
import { Component, OnInit } from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';
import { MusicoptionPage } from 'src/app/components/musicoption/musicoption.page';
import { musicTab } from '../play/play.page';
import { SuggestionsService } from '../../services/suggestions.service';

@Component({
  selector: 'app-news',
  templateUrl: './news.page.html',
  styleUrls: ['./news.page.scss'],
})
export class NewsPage implements OnInit {

  constructor(
    private modalCtrl: ModalController,
    public navCtrl: NavController,
    private suggestionsService: SuggestionsService,

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

  new:any[]=[];
  numberOfTopSongs: number = 0;

  ngOnInit() {
    this.suggestionsService.getSuggestions().subscribe(
      (response) => {
        console.log('suggestions récupérés :', response);
        this.new = response.new_releases.data;
        console.log(this.new,'new sonfs');
        const numberOfSongs = this.new.length;
        console.log('Nombre de new songs :', numberOfSongs);

        this.numberOfTopSongs = numberOfSongs;
      },
      (error) => {
        console.error('Erreur lors de la récupération des suggestions :', error);
      }
    );
  }

}
