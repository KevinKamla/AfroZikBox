/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
import { Component, OnInit } from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';
import { MusicoptionPage } from 'src/app/components/musicoption/musicoption.page';
import { musicTab } from '../play/play.page';
import { SuggestionsService } from '../../services/suggestions.service';

@Component({
  selector: 'app-popular',
  templateUrl: './popular.page.html',
  styleUrls: ['./popular.page.scss'],
})
export class PopularPage implements OnInit {

  suggestions: any[] = [];

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

  mostPopular:any[]=[];
  numberOfPopular: number = 0;

  ngOnInit() {
    this.suggestionsService.getSuggestions().subscribe(
      (response) => {
        console.log('suggestions récupérés :', response);
        this.mostPopular = response.most_popular_week;
        console.log(this.mostPopular);
        const numberOfPopulars = this.mostPopular.length;
        console.log('Nombre de popular :', numberOfPopulars);

        this.numberOfPopular = numberOfPopulars;
      },
      (error) => {
        console.error('Erreur lors de la récupération des suggestions :', error);
      }
    );
  }

}
