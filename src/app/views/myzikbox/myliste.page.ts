/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
import { Component, OnInit } from '@angular/core';
import { musicTab } from '../play/play.page';
import { ModalController, NavController } from '@ionic/angular';
import { SuggestionsService } from 'src/app/services/suggestions.service';

@Component({
  selector: 'app-myliste',
  templateUrl: './myliste.page.html',
  styleUrls: ['./myliste.page.scss'],
})
export class MylistePage implements OnInit {
  latest : any []=[];
  constructor(
    private navCtrl: NavController,
    public suggestionsService : SuggestionsService
  ) { }


  goToPlay = (item: any) => {
    console.log(item);
    localStorage.setItem('latest', JSON.stringify(item));
    musicTab.musicIsPlay = true;
    musicTab.isClose = false;
  }

  onClick() {
  }

  ngOnInit() {
    this.suggestionsService.getSuggestions().subscribe(
      (response) => {
        console.log('suggestions récupérés :', response);
        this.latest = response.new_releases.data;
        console.log(this.latest, 'latest songs');
      },
      (error) => {
        console.error('Erreur lors de la récupération des suggestions :', error);
      }
    );
  }

}
