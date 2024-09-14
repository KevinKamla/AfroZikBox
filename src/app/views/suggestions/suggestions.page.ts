import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ModalController, NavController, Platform } from '@ionic/angular';
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
    private platform: Platform,
    private alertController: AlertController
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

  // Méthode pour afficher une alerte
  async showAlert(message: string) {
    const alert = await this.alertController.create({
      header: 'Erreur',
      message: message,
      buttons: ['OK']
    });

    await alert.present();
  }

  // Méthode pour arrêter la musique en cours
  stopCurrentMusic(): Promise<void>  {
    return this.songService.stopMusic().then(() => {
      console.log('Son arrêté');
    }).catch(err => {
      console.log('Erreur lors de l\'arrêt du son', err);
      this.showAlert('Une erreur est survenue : ' + err);
    });
  }

  // Méthode pour jouer ou mettre en pause la musique
  playMusic(item: any) {
    console.log(item);
    localStorage.setItem('music', JSON.stringify(item));
    this.songService.updateCurrentSong(item); // Met à jour l'état global

    const songUrl = item.audio_location;
    const songId = item.id;

    this.songService.isPlaying$.subscribe(isPlaying => {
      if (isPlaying && this.currentSongId !== songId) {
        this.stopCurrentMusic().then(() => {
          this.songService.loadSong(songUrl, songId).then(() => {
            this.showAlert('Success loaded song file');
            this.songService.playMusic().catch(err => {
            this.showAlert('Erreur lors de la lecture de la chanson : ' + err);
            console.log('Erreur lors de la lecture de la chanson', err);
            });
          }).catch(err => {
            console.log('Erreur lors du chargement de la chanson', err);
          });
        }).catch(err => {
          console.log('Erreur lors de l\'arrêt du son', err);
        });
      } else if (!isPlaying) {
        this.songService.loadSong(songUrl, songId).then(() => {
          this.songService.playMusic().catch(err => {
            this.showAlert('Erreur lors de la lecture de la chanson : ' + err);
            console.log('Erreur lors de la lecture de la chanson', err);
          });
        }).catch(err => {
          console.log('Erreur lors du chargement de la chanson', err);
        });
      } else {
        this.songService.pauseMusic().then(() => {
          console.log('Musique mise en pause');
        }).catch(err => {
          console.log('Erreur lors de la mise en pause', err);
          this.showAlert('Erreur lors de la mise en pause : ' + err);
        });
      }
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
    this.songService.isPlaying$.subscribe(isPlaying => {
      this.isPlaying = isPlaying;
    });

    this.songService.currentSong$.subscribe(currentSong => {
      if (currentSong) {
        this.currentSongId = currentSong.id;
      }
    });

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
