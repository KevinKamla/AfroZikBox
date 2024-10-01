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
import { AlbumsService } from 'src/app/services/albums.service';
import { UserService } from 'src/app/services/user.service';

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
    private albumsService: AlbumsService,
    private alertController : AlertController
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
  
  async showLoginPopup() {
    
  }
  // Méthode pour jouer ou mettre en pause la musique
  playMusic = (item: any) => {
    console.log(item);
    // localStorage.setItem('music', JSON.stringify(item));
    // musicTab.isClose = false;
    // musicTab.musicIsPlay = true;
    // console.log('musicTab : ', musicTab);
    
    const songUrl = item.audio_location;
    const songId = item.id; // Suivi de l'ID de la chanson
    let sourceArray = '';
    if (this.latest.some(song => song.id === item.id)) {
      sourceArray = 'latest';
      console.log('Le son provient du tableau latest');
    } else if (this.songs.some(song => song.id === item.id)) {
      sourceArray = 'songs';
      console.log('Le son provient du tableau songs');
    } else {
      console.log('Le son ne provient ni de latest ni de songs');
    }

    const musicInfo = {
      ...item,
      sourceArray
    };
    localStorage.setItem('music', JSON.stringify(musicInfo));
    
    musicTab.isClose = false;
    musicTab.musicIsPlay = true;
    console.log('musicTab : ', musicTab);
    // Vérifie si une chanson est en cours de lecture
    if (this.isPlaying) {
        // Si la chanson actuelle est différente de la nouvelle chanson, arrêtez-la
        if (this.currentSongId !== songId) {
            this.stopCurrentMusic(); // Appel sans promesse
            this.loadAndPlayMusic(songUrl, songId);
        }
    } else {
        // Si aucune chanson n'est en cours, chargez et lisez la nouvelle chanson
        this.loadAndPlayMusic(songUrl, songId);
    }

    // Mettez à jour l'état de la chanson actuelle
    this.songService.updateCurrentSong(item);
};

 // Méthode pour jouer ou mettre en pause la musique
 artistDetail = (item: any) => {
  console.log(item);
  localStorage.setItem('artist', JSON.stringify(item));
  this.route.navigate(['/artistprofil', item.id]);
};


  // Méthode pour arrêter le son en cours
  stopCurrentMusic() {
    // Vérifie si une musique est en cours de lecture avant de tenter d'arrêter
    if (!this.isPlaying || !this.file) {
        console.log('Aucune musique n\'est actuellement en cours de lecture.');
        return; // Sortie immédiate si aucune musique n'est jouée
    }


    try {
        // Arrête la musique et libère les ressources
        this.file.stop(); // Arrête la lecture
        this.file.release(); // Libère les ressources associées

        // Mise à jour de l'état de lecture
        this.isPlaying = false;
        console.log('Musique arrêtée et ressources libérées avec succès.');
    } catch (error) {
        // Gestion des erreurs
        console.error('Erreur lors de l\'arrêt de la musique :', error);
    }
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

  loadSongsForTopAlbums() {
    this.topalbums.forEach(album => {
      this.albumsService.getAlbumsr(album.id, '').subscribe(
        (response) => {
          // console.log(response, 'response');
          this.albumSongs[album.id] = response.songs; // Stocke les chansons pour chaque album
          // console.log(`Chansons pour l'album ${album.id} :`, response.songs);
        },
        (error) => {
          console.error(`Erreur lors de la récupération des chansons pour l'album ${album.id} :`, error);
        }
      );
    });
  }

  albumSongs: { [key: string]: any[] } = {};
  recentP :any []=[];
  avatar: any;

  ngOnInit() {
    const u = localStorage.getItem("UserData")
    if (u) {
      const UserData = JSON.parse(u)
      console.log("userdata :", UserData )
      this.avatar = UserData.avatar
    }
    this.suggestionsService.getSuggestion(2, '').subscribe(
      (response) => {
        // console.log('suggestions récupérés :', response);
        this.albums = response.top_albums;
        this.songs = response.top_songs;

      },
      (error) => {
        console.error('Erreur lors de la récupération des suggestions :', error);
      }
    );
    this.topAlbumsService.getTopAlbums().subscribe(
      (response) => {
        this.topalbums = response.top_albums;
        // console.log('meilleurs albums récupérés :', this.topalbums);
        this.loadSongsForTopAlbums();
      },
      (error) => {
        console.error('Erreur lors de la récupération des meilleurs albums :', error);
      }
    );
    this.topsService.getTopSongs().subscribe(
      (response) => {
        this.topSongs = response.data;
        // console.log('Meilleur songs récupérés :', this.topSongs);
      },
      (error) => {
        console.error('Erreur lors de la récupération des Meilleur songs :', error);
      }
    );
    this.artistService.getArtist('').subscribe(
      (response) => {
        // console.log('Artistes récupérés :', response);
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
        console.error('Erreur lors de la récupération des suggestions :', error);
      }
    );
    this.genresService.getGenre().subscribe(
      (response) => {
        this.genres = response.data;
        // console.log('genres récupérés :', this.genres);
      },
      (error) => {
        console.error('Erreur lors de la récupération des genres :', error);
      }
    );
  }

}

