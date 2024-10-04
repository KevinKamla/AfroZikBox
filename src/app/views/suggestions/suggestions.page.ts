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
import { Media, MediaObject } from '@awesome-cordova-plugins/media/ngx';
import { AlbumsService } from 'src/app/services/albums.service';
import { AlbumdetailPage } from '../Albums/albumdetail/albumdetail.page';
import { StatutPage } from '../statut/statut.page';

@Component({
  selector: 'app-suggestions',
  templateUrl: './suggestions.page.html',
  styleUrls: ['./suggestions.page.scss'],
})
export class SuggestionsPage implements OnInit {
  // Déclaration des propriétés
  topalbums: any[] = [];
  file: MediaObject | null = null;
  isPlaying: boolean = false;
  currentSongId: string = '';
  genres: any[] = [];
  latest: any[] = [];
  songs: any[] = [];
  albums: any[] = [];
  topSongs: any[] = [];
  artists: any[] = [];

  // Ajoutez l'objet pour stocker les chansons d'un album
  albumSongs: { [key: string]: any[] } = {};

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
    private albumsService: AlbumsService,
    private alertController : AlertController
  ) {}
  tabSong = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  isOpenmodalAchat = false;
  walletIsOpen = false;

  walletButtons = [
    {
      text: 'Annuler',
      handler: () => {
        this.walletIsOpen = false;
      },
    },
    {
      text: 'Ajouter un porte monnaie',
      handler: () => {
        this.walletIsOpen = false;
        this.navCtrl.navigateForward('/wallet');
      },
    },
  ];
  async handleStoryClick() {
    const userData = localStorage.getItem("UserData");
    if (!userData) {
      const alert =await this.alertController.create({
        header: 'Accès refusé',
        message: 'Veuillez vous connecter pour voir cette story',
        buttons: [{
            text: 'OK',
            handler: () => {
              this.route.navigate(['/tabs']);
            }
        }]
      }); 
     alert.present();
    } else {
      alert("vous etes connecter");
    }
  }

 // Méthode pour jouer ou mettre en pause la musique
 artistDetail = (item: any) => {
  console.log(item);
  localStorage.setItem('artist', JSON.stringify(item));
  this.route.navigate(['/artistprofil', item.id]);
};


 

  async openActut() {
    const modal = await this.modal.create({
      component: StatutPage,
      animated: true,
      showBackdrop: true,
      backdropDismiss: false,
    });

    await modal.present();
    modal.onDidDismiss().then(() => {
      console.log('Modal fermé');
  });
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



  // Méthode pour charger et jouer la musique
  currentSongIndex: number = 0;
  audio: HTMLAudioElement = new Audio();

  playMusic(item: any, index: number) {
    const songId = item.id;
    let sourceArray = '';
    // Enregistrer les informations de la chanson dans le localStorage
    const musicInfo = {
      ...item,
      sourceArray,
    };
    console.log(musicInfo);
    
    localStorage.setItem('music', JSON.stringify(musicInfo));

    // Ouvrir le panneau de lecture et définir l'état de la lecture
    musicTab.isClose = false;
    musicTab.musicIsPlay = true;

    // if (this.isPlaying && this.currentSongId !== songId) {
    //   // Si une autre chanson est déjà en lecture, arrêtez la chanson actuelle
    //   // this.stopCurrentMusic();
    //   this.loadAndPlayMusic(item.audio_location, songId);
    // } else if (!this.isPlaying) {
    //   console.log(songId);
    //   // Si aucune chanson n'est en lecture, démarrez la lecture
    //   this.loadAndPlayMusic(item.audio_location, songId);
    //   this.isPlaying = true;
    // }

    this.songService.updateCurrentSong(item);
  }

  loadAndPlayMusic(songUrl: string, songId: any) {
    this.audio.src = songUrl;
    console.log(this.audio.src);
    
    this.audio.load();
    this.audio.play();

    // Mettre à jour l'ID de la chanson actuelle
    this.currentSongId = songId;
    this.isPlaying = true;

    // Gérer la fin de la chanson pour passer à la suivante
    this.audio.onended = () => {
      this.playNextSong();
    };
  }

  // stopCurrentMusic() {
  //   this.audio.pause();
  //   this.isPlaying = false;
  // }


  playNextSong() {
    if (this.currentSongIndex + 1 < this.topSongs.length) {
      this.currentSongIndex++;
      this.playMusic(
        this.topSongs[this.currentSongIndex],
        this.currentSongIndex
      );
    } else {
      console.log('Toutes les chansons ont été jouées.');
    }
  }

  playPreviousSong() {
    if (this.currentSongIndex > 0) {
      this.currentSongIndex--;
      this.playMusic(
        this.topSongs[this.currentSongIndex],
        this.currentSongIndex
      );
    }
  }

  stopCurrentMusic() {
    if (this.file && this.isPlaying) {
      try {
        this.file.stop();
        this.file.release();
        this.isPlaying = false;
      } catch (error) {
        console.error("Erreur lors de l'arrêt de la musique :", error);
      }
    }
  }

  

  // nextMusic() {
  //   const currentIndex = this.songs.findIndex(
  //     (song) => song.id === this.currentSongId
  //   );
  //   const nextIndex = (currentIndex + 1) % this.songs.length;
  //   const nextSong = this.songs[nextIndex];

  //   if (nextSong) {
  //     this.playMusic(nextSong);
  //   }
  // }

  pauseMusic() {
    if (this.file && this.isPlaying) {
      this.file.pause();
      this.isPlaying = false;
    }
  }

  resumeMusic() {
    if (this.file && !this.isPlaying) {
      this.file.play();
      this.isPlaying = true;
    }
  }

  loadSongsForTopAlbums() {
    this.topalbums.forEach((album) => {
      this.albumsService.getAlbumsr(album.id, '').subscribe(
        (response) => {
          this.albumSongs[album.id] = response.songs;
        },
        (error) => {
          console.error(
            `Erreur lors de la récupération des chansons pour l'album ${album.id} :`,
            error
          );
        }
      );
    });
  }

  avatar: any;

  ngOnInit() {
    const u = localStorage.getItem("UserData")
    if (u) {
      const UserData = JSON.parse(u)
      console.log("userdata :", UserData )
      this.avatar = UserData.avatar
    }
    // this.suggestionsService.getSuggestion(2, '').subscribe(
    //   (response) => {
    //     this.albums = response.top_albums;
    //     this.songs = response.top_songs;
    //   },
    //   (error) => {
    //     console.error(
    //       'Erreur lors de la récupération des suggestions :',
    //       error
    //     );
    //   }
    // );

    this.topAlbumsService.getTopAlbums().subscribe(
      (response) => {
        this.topalbums = response.top_albums;
        // this.loadSongsForTopAlbums();
      },
      (error) => {
        console.error(
          'Erreur lors de la récupération des meilleurs albums :',
          error
        );
      }
    );

    this.topsService.getTopSongs().subscribe(
      (response) => {
        this.topSongs = response.data;
        console.log(this.topSongs);
      },
      (error) => {
        console.error(
          'Erreur lors de la récupération des Meilleur songs :',
          error
        );
      }
    );

    this.artistService.getArtist('').subscribe(
      (response) => {
        this.artists = response.data.data;
      },
      (error) => {
        console.error('Erreur lors de la récupération des artistes :', error);
      }
    );

    this.suggestionsService.getSuggestions().subscribe(
      (response) => {
        this.latest = response.new_releases.data;
      },
      (error) => {
        console.error(
          'Erreur lors de la récupération des suggestions :',
          error
        );
      }
    );

    this.genresService.getGenre().subscribe(
      (response) => {
        this.genres = response.data;
      },
      (error) => {
        console.error('Erreur lors de la récupération des genres :', error);
      }
    );
  }
}
