/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
import { Component, OnInit } from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';
import { MusicoptionPage } from 'src/app/components/musicoption/musicoption.page';
import { musicTab } from '../play/play.page';
import { SuggestionsService } from '../../services/suggestions.service';
import { PlaylistService } from'src/app/services/playlist.service';
import { LecteurService } from 'src/app/services/lecteur.service';

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
    private PlaylistService: PlaylistService,
    private musicService: LecteurService // Injection du service de musique

  ) { }

  
  async openOptionSound(playlistId: any) {
    const selectedPlaylistId = playlistId;
    const playlistData = this.news.find(
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

  news:any[]=[];
  numberOfTopSongs: number = 0;

  ngOnInit() {
    this.suggestionsService.getSuggestions().subscribe(
      (response) => {
        console.log('suggestions récupérés :', response);
        this.news = response.new_releases.data;
        console.log(this.news,'new sonfs');
        const numberOfSongs = this.news.length;
        console.log('Nombre de new songs :', numberOfSongs);

        this.numberOfTopSongs = numberOfSongs;
      },
      (error) => {
        console.error('Erreur lors de la récupération des suggestions :', error);
      }
    );
  }
  loadsong(playlist:any, index:number){
    // console.log('Playlist chargement...')
    this.PlaylistService.updateindex(index)
    this.PlaylistService.loadplaylist(playlist, index)
    this.musicService.loadNewPlaylist(playlist, index);
  }

}
