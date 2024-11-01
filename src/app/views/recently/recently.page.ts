/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
import { Component, OnInit } from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';
import { MusicoptionPage } from 'src/app/components/musicoption/musicoption.page';
import { musicTab } from '../play/play.page';
import { ActivatedRoute } from '@angular/router';
import { SuggestionsService } from '../../services/suggestions.service';
import { UserService } from 'src/app/services/user.service';
import { LecteurService } from 'src/app/services/lecteur.service';
import { PlaylistService } from'src/app/services/playlist.service';

@Component({
  selector: 'app-recently',
  templateUrl: './recently.page.html',
  styleUrls: ['./recently.page.scss'],
})
export class RecentlyPage implements OnInit {
  idUser: any;
  suggestions: any[] = [];
  userId: number = parseInt(localStorage.getItem('userId') || '0', 10);
  recentP: any[] = [];
  constructor(
    private modalCtrl: ModalController,
    public navCtrl: NavController,
    private suggestionsService: SuggestionsService,
    private userService: UserService,
    private musicService: LecteurService, // Injection du service de musique
    private PlaylistService: PlaylistService,
    // private musicService: LecteurService // Injection du service de musique

  ) { }

  
  async openOptionSound(playlistId: any) {
    const selectedPlaylistId = playlistId;
    const playlistData = this.recentlys.find(
      (playlist) => playlist.id === selectedPlaylistId
    ); 
    const modal = await this.modalCtrl.create({
      component: MusicoptionPage,
      componentProps: { playlistId, playlistData }, // Passer l'ID et les données de la playlist
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


  recentlys:any[]=[];
  numberOfRecently: number = 0;

  ngOnInit() {
    this.suggestionsService.getSuggestions().subscribe(
      (response) => {
        console.log('suggestions récupérés :', response);
        // this.recently = response.recently_played;
        // console.log(this.recently);
        const numberOfRecentlys = this.recentlys.length;
        // console.log('Nombre de recently :', numberOfRecentlys);

        // this.numberOfRecently = numberOfRecentlys;
      },
      (error) => {
        console.error('Erreur lors de la récupération des suggestions :', error);
      }
    );
    this.userService.getRecentPlayed(this.userId).subscribe((response) =>{
      console.log(response, 'response');
      this.recentlys = response.data.data;
      this.numberOfRecently = response.data.data.length;
      console.log('Nombre de recently :', this.recentlys);

    })
  }

  playMusicFromSongs(song: any, index: number) {
    this.musicService.loadNewPlaylist(this.recentlys, index);
  }
  loadsong(playlist:any, index:number){
    // console.log('Playlist chargement...')
    this.PlaylistService.updateindex(index)
    this.PlaylistService.loadplaylist(playlist, index)
    this.musicService.loadNewPlaylist(playlist, index);
  }
}
