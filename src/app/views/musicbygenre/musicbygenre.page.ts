/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ModalController, NavController } from '@ionic/angular';
import { MusicoptionPage } from 'src/app/components/musicoption/musicoption.page';
import { GenresService } from '../../services/genres.service';
import { LecteurService } from 'src/app/services/lecteur.service';
import { musicTab } from '../play/play.page';
import { PlaylistService }  from '../../services/playlist.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-musicbygenre',
  templateUrl: './musicbygenre.page.html',
  styleUrls: ['./musicbygenre.page.scss'],
})
export class MusicbygenrePage implements OnInit {

  genre = '';
  genres: any[]=[];
  loading: boolean = true;
  genreName = ''; // Ajout d'une propriété pour le nom du genre

  constructor(    
    private actvroute: ActivatedRoute, 
    private modalCtrl: ModalController,
    public navCtrl: NavController,
    private genreService: GenresService,
    private PlaylistService: PlaylistService,
    private route: ActivatedRoute,
    private musicService: LecteurService // Injection du service de musique
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
    this.navCtrl.navigateForward('play');
  }

  ngOnInit() {    
    this.genre = this.actvroute.snapshot.params['genre'];
    const genreId = this.route.snapshot.paramMap.get('id');

    // Use forkJoin to ensure both requests complete before proceeding
    forkJoin({
      genreDetails: this.genreService.getGenre(genreId),
      trackDetails: this.genreService.getTrackGenre(Number(this.genre), '')
    }).subscribe(
      ({ genreDetails, trackDetails }) => {
        this.genres = trackDetails.tracks.data;
        const genre = genreDetails.data.find((g :any) => g.id === Number(this.genre));
        this.genreName = genre ? genre.category_name : '';
        console.log('Détails du genre récupérés:', this.genres);
        this.loading = false; // Set loading to false once data is ready
      },
      (error) => {
        console.error('Erreur lors de la récupération des détails du genre :', error);
        this.loading = false;  // Set loading to false in case of error
      }
    );
  }

  // playMusicFromSongs(song: any, index: number) {
  //   this.musicService.loadNewPlaylist(this.genres, index);
  // }

  loadsong(playlist:any, index:number){
    // console.log('Playlist chargement...')
    this.PlaylistService.updateindex(index)
    this.PlaylistService.loadplaylist(playlist, index)
    this.musicService.loadNewPlaylist(playlist, index);
    musicTab.musicIsPlay = true;
  }
}

