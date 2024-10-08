/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
import { Component, OnInit } from '@angular/core';
import { musicTab } from '../play/play.page';
import { ModalController, NavController } from '@ionic/angular';
import { SuggestionsService } from 'src/app/services/suggestions.service';
import { UserService } from 'src/app/services/user.service';
import { LecteurService } from 'src/app/services/lecteur.service';

@Component({
  selector: 'app-myliste',
  templateUrl: './myliste.page.html',
  styleUrls: ['./myliste.page.scss'],
})
export class MylistePage implements OnInit {
  latest : any []=[];
  recentP: any[] = [];
  recently:any[]=[];
  numberOfRecently: number = 0;
  userId: number = parseInt(localStorage.getItem('userId') || '0', 10);

  constructor(
    private navCtrl: NavController,
    public suggestionsService : SuggestionsService,
    private userService: UserService,
    private musicService: LecteurService // Injection du service de musique


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
    this.userService.getRecentPlayed(this.userId).subscribe((response) =>{
      console.log(response, 'response');
      this.recentP = response.data.data;
      this.numberOfRecently = response.data.data.lenght;
      console.log(this.recentP, 'recentP');
    });
  }

  playMusicFromSongs(song: any, index: number) {
    this.musicService.loadNewPlaylist(this.recentP, index);
  }

}
