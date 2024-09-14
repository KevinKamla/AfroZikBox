import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController, NavController, Platform } from '@ionic/angular';
import { musicTab } from '../../views/play/play.page';
import { TopSongsService } from '../../services/top-songs.service';
import { SuggestionsService } from '../../services/suggestions.service';
import { ArtistService } from '../../services/artist.service';
import { GenresService } from '../../services/genres.service';
import { TopAlbumsService } from '../../services/top-albums.service';
import { SongsService } from 'src/app/services/songs.service';
import { HttpClient } from '@angular/common/http';
import { NativeAudio } from '@capacitor-community/native-audio';
import { AlbumdetailPage } from '../Albums/albumdetail/albumdetail.page';
import { StatutPage } from '../statut/statut.page';
import {Media, MediaObject } from '@awesome-cordova-plugins/media/ngx';

@Component({
  selector: 'app-suggestions',
  templateUrl: './suggestions.page.html',
  styleUrls: ['./suggestions.page.scss'],
})
export class SuggestionsPage implements OnInit {

  topalbums: any[] = [];
  file: MediaObject | null = null;
  isPlaying: boolean = false;
  currentSongId: string = '';
  genres: any[]=[];
  latest: any[] = [];
  songs: any[] = [];
  albums: any[] = [];
  artists: any[] = [];
  topSongs: any[] = [];

  constructor(
    private http: HttpClient,
    private route: Router,
    private navCtrl: NavController,
    private modal: ModalController,
    private topsService: TopSongsService,
    private suggestionsService: SuggestionsService,
    private artistService: ArtistService,
    private genresService: GenresService,
    private topAlbumsService: TopAlbumsService,
    private songService: SongsService,
    private media: Media,
    private platform: Platform
  ) { }

  tabSong = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  isOpenmodalAchat = false;
  walletIsOpen = false;
  
  walletButtons = [
    {
      text: 'Annuler',
      handler: () => { this.walletIsOpen = false; },
    },
    {
      text: 'Ajouter un porte monnaie',
      handler: () => { this.walletIsOpen = false; this.navCtrl.navigateForward('/wallet'); },
    },
  ];

  // Méthode pour jouer ou mettre en pause la musique
  playMusic = (item: any) => {
    console.log(item);
    localStorage.setItem('music', JSON.stringify(item));
    musicTab.isClose = false;
    musicTab.musicIsPlay = true;
    console.log('musicTab : ', musicTab);
    const songUrl = item.audio_location;
    const songId = item.id; // Track the song ID

    // Arrête le son en cours si nécessaire
    if (this.isPlaying && this.currentSongId !== songId) {
      this.stopCurrentMusic().then(() => {
        this.loadAndPlayMusic(songUrl, songId);
      }).catch(err => {
        console.log('Erreur lors de l\'arrêt du son', err);
      });
    } else if (!this.isPlaying) {
      this.loadAndPlayMusic(songUrl, songId);
    }
    this.songService.updateCurrentSong(item); // Met à jour l'état global

  };

  // Méthode pour arrêter le son en cours
  stopCurrentMusic() {
    return NativeAudio.stop({
      assetId: 'fire'
    }).then(() => {
      console.log('Son arrêté');
      return NativeAudio.unload({
        assetId: 'fire'
      });
    }).then(() => {
      this.isPlaying = false;
    });
  }

  // Méthode pour charger et jouer la nouvelle musique
  loadAndPlayMusic(songUrl: string, songId: string) {
    // Si un fichier est déjà en cours de lecture, arrêtez-le et libérez les ressources
    if (this.file) {
      this.file.stop();
      this.file.release();
      this.isPlaying = false;
    }

    this.platform.ready().then(() => {
      // Crée un nouvel objet Media à partir de l'URL de la chanson
      this.file = this.media.create(songUrl);
      this.currentSongId = songId;  // Met à jour l'ID de la chanson actuelle
      
      // Lance la lecture après la création du MediaObject
      this.file.play();
      this.isPlaying = true;
      console.log("son charger avec succes et en lecture")
      // Facultatif : surveiller les événements de lecture
      this.file.onStatusUpdate.subscribe(status => console.log('Status Update: ', status));
      this.file.onSuccess.subscribe(() => console.log('Lecture terminée'));
      this.file.onError.subscribe(error => console.log('Erreur: ', error));
    }).catch(err => {
      console.log('Erreur lors du chargement de la plateforme', err);
    });
  }
  // loadAndPlayMusic(songUrl: string, songId: string) {
    
  //   NativeAudio.preload({
  //     assetId: 'fire',
  //     assetPath: songUrl,
  //     audioChannelNum: 1,
  //     isUrl: true
  //   }).then(() => {
  //     console.log('Audio préchargé');
  //     this.isPlaying = true;
  //     this.currentSongId = songId; // Update current song ID

  //     // Jouer la musique seulement après le préchargement réussi
  //     NativeAudio.play({
  //       assetId: 'fire'
  //     }).then(() => {
  //       console.log('Lecture en cours');
  //     }).catch(err => {
  //       console.log('Erreur lors de la lecture', err);
  //     });
  //   }).catch(err => {
  //     console.log('Erreur lors du préchargement', err);
  //   });
  // }

  async openActut() {
    const modal = await this.modal.create({
      component: StatutPage,
      animated: true,
      showBackdrop: true,
      backdropDismiss: false,
    });

    await modal.present();
  }

  async openAlbumDetail(props: any) {
    const modal = await this.modal.create({
      component: AlbumdetailPage,
      animated: true,
      showBackdrop: true,
      backdropDismiss: false,
    });
    await modal.present();
  }

  openPopup() {
    this.isOpenmodalAchat = true;
  }

  selectGenre(genre: any) {
    localStorage.setItem('selectedGenre', JSON.stringify(genre));
    this.route.navigate(['/musicbygenre', genre.id]);
  }

  selectAlbum(album: any) {
    localStorage.setItem('selectedAlbum', JSON.stringify(album));
    this.route.navigate(['albumdetail', album.id]);
  }

  goToSegment(segment: string) {
    this.route.navigate([segment]);
  }

  ngOnInit() {
    // this.songService.fetchTopSongs();
    this.topsService.getTopSongs().subscribe(
      (response) => {
        this.topSongs = response.data;
        // console.log('Meilleur songs récupérés :', this.topSongs);
      },
      (error) => {
        console.error('Erreur lors de la récupération des Meilleur songs :', error);
      }
    );
    this.artistService.getArtists().subscribe(
      (response) => {
        console.log('Artistes récupérés :', response);
        this.artists = response.data.data;
      },
      (error) => {
        console.error('Erreur lors de la récupération des artistes :', error);
      }
    );
    this.suggestionsService.getSuggestions().subscribe(
      (response) => {
        console.log('suggestions récupérés :', response);
        this.albums = response.randoms.album;
        this.songs = response.randoms.song;
        this.latest = response.new_releases.data;
        console.log(this.latest, 'latest songs');
      },
      (error) => {
        console.error('Erreur lors de la récupération des suggestions :', error);
      }
    );
    this.genresService.getGenre().subscribe(
      (response) => {
        this.genres = response.data;
        console.log('genres récupérés :', this.genres);
      },
      (error) => {
        console.error('Erreur lors de la récupération des genres :', error);
      }
    );
    this.topAlbumsService.getTopAlbums().subscribe(
      (response) => {
        this.topalbums = response.top_albums;
        console.log('meilleurs albums récupérés :', this.topalbums);
      },
      (error) => {
        console.error('Erreur lors de la récupération des meilleurs albums :', error);
      }
    );
  }
}
