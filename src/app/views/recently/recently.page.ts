/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
import { Component, OnInit } from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';
import { MusicoptionPage } from 'src/app/components/musicoption/musicoption.page';
import { musicTab } from '../play/play.page';
import { ActivatedRoute } from '@angular/router';
import { SuggestionsService } from '../../services/suggestions.service';

@Component({
  selector: 'app-recently',
  templateUrl: './recently.page.html',
  styleUrls: ['./recently.page.scss'],
})
export class RecentlyPage implements OnInit {
  idUser: any;
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


  recently:any[]=[];
  numberOfRecently: number = 0;

  ngOnInit() {
    this.suggestionsService.getSuggestions().subscribe(
      (response) => {
        console.log('suggestions récupérés :', response);
        this.recently = response.recently_played;
        console.log(this.recently);
        const numberOfRecentlys = this.recently.length;
        console.log('Nombre de recently :', numberOfRecentlys);

        this.numberOfRecently = numberOfRecentlys;
      },
      (error) => {
        console.error('Erreur lors de la récupération des suggestions :', error);
      }
    );
  }

}
