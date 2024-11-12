import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ModalController, NavController, Platform, ToastController } from '@ionic/angular';
import { musicTab } from '../../views/play/play.page';
import { TopSongsService } from '../../services/top-songs.service';
import { SuggestionsService } from '../../services/suggestions.service';
import { ArtistService } from '../../services/artist.service';
import { GenresService } from '../../services/genres.service';
import { TopAlbumsService } from '../../services/top-albums.service';
import { SongsService } from 'src/app/services/songs.service';
import { HttpClient } from '@angular/common/http';
import { AlbumsService } from 'src/app/services/albums.service';
import { AlbumdetailPage } from '../Albums/albumdetail/albumdetail.page';
import { StatutPage } from '../statut/statut.page';
import { LecteurService } from 'src/app/services/lecteur.service'; // Import du service de musique
import { AuthService } from 'src/app/services/auth.service';
import { PlaylistService } from'src/app/services/playlist.service';
import { StoryService } from 'src/app/services/story.service';
import { EventService } from 'src/app/services/event.service';

@Component({
  selector: 'app-suggestions',
  templateUrl: './suggestions.page.html',
  styleUrls: ['./suggestions.page.scss'],
})
export class SuggestionsPage implements OnInit {
  // Déclaration des propriétés
  isUserLoggedIn: boolean = false;

  selectedgenre: any[]=[];
  topalbums: any[] = [];
  genres: any[] = [];
  latest: any[] = [];
  songs: any[] = [];
  albums: any[] = [];
  topSongs: any[] = [];
  artists: any[] = [];

  // Ajoutez l'objet pour stocker les chansons d'un album
  albumSongs: { [key: string]: any[] } = {};

  currentSongIndex: number = 0;
  currentSong: any;

  constructor(
    private http: HttpClient,
    private authService:AuthService,
    private route: Router,
    private navCtrl: NavController,
    private modal: ModalController,
    private topsService: TopSongsService,
    private suggestionsService: SuggestionsService,
    private artistService: ArtistService,
    private genresService: GenresService,
    private topAlbumsService: TopAlbumsService,
    private songService: SongsService,
    private PlaylistService: PlaylistService,
    private albumsService: AlbumsService,
    private alertController: AlertController,
    private genreService: GenresService,
    private toastController: ToastController,
    private yourService: StoryService,
    private eventService:EventService,
    private musicService: LecteurService // Injection du service de musique
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
      const alert = await this.alertController.create({
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
      alert("vous êtes connecté");
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

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      position: 'bottom',
    });
    await toast.present();
  }

  onGenreClick(genre: any) {
    this.genreService.getGenre(genre.id).subscribe(
      (response) => {
        // Assuming response.data contains the required genres
        const selectedGenreDetails = response.data.find((g: { id: any; }) => g.id === genre.id);
        
        if (selectedGenreDetails) {
          // Now check if the genre is valid for navigation
          this.genreService.getTrackGenre(genre.id, '').subscribe((trackResponse) => {
            const tracks = trackResponse.tracks.data;
            
            // Check if tracks exist for the selected genre
            if (tracks && tracks.length > 0) {
              // Navigate to the genre page if valid
              this.route.navigate(['/musicbygenre', genre.id]);
            } else {
              // Handle the invalid case, e.g., show a message
              // alert('No tracks available for this genre.');
              this.presentToast('Pas de music pour ce genre.');
            }
          });
        } else {
          this.presentToast('Genre not valid for navigation');
        }
      },
      (error) => {
        this.presentToast('Pas de music pour ce genre.');
      }
    );
  }

  openPopup() {
    this.isOpenmodalAchat = true;
  }

  selectGenre(genre: any) {
    // localStorage.setItem('selectedGenre', JSON.stringify(genre));
    this.route.navigate(['/musicbygenre', genre.id]);
  }

  selectAlbum(album: any) {
    localStorage.setItem('selectedAlbum', JSON.stringify(album));
    this.route.navigate(['albumdetail', album.id]);
  }

  goToSegment(segment: string) {
    this.route.navigate([segment]);
  }

  // Méthode pour charger et jouer la musique avec MusicService
  playMusic(song: any, index: number): void {
    // Appelez la méthode playMusic avec song et index
    this.musicService.playMusic(song, index);
    musicTab.musicIsPlay = true;
    this.currentSong = song;
    console.log(this.currentSong);
  }

  playMusicFromTopList(song: any, index: number) {
    this.musicService.loadNewPlaylist(this.topSongs, index);
    console.log(this.topSongs,'top songsssssss')
  }

  // Charger et jouer la liste "Latest Songs"
  playMusicFromLatestList(song: any, index: number) {

    this.musicService.loadNewPlaylist(this.latest, index);
  }

  // Méthode pour jouer la prochaine chanson avec MusicService
  playNextSong() {
    let song = this.PlaylistService.getnextsong()
    if (song) {
      this.playMusic(song, this.currentSongIndex);
    }
    // if (this.currentSongIndex + 1 < this.topSongs.length) {
    //   this.currentSongIndex++;
    //   this.playMusic(this.topSongs[this.currentSongIndex], this.currentSongIndex);
    // } else {
    //   console.log('Toutes les chansons ont été jouées.');
    // }
  }

  // Méthode pour jouer la chanson précédente avec MusicService
  playPreviousSong() {
    if (this.currentSongIndex > 0) {
      this.currentSongIndex--;
      this.playMusic(this.topSongs[this.currentSongIndex], this.currentSongIndex);
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
  events: any[]=[];
  userId: number = parseInt(localStorage.getItem('userId') || '0', 10);
  ngOnInit() {
    this.eventService.getMyEvents(this.userId).subscribe((res) => {
      console.log('eventtttttttttttt', res);
      this.events = res.data;
      console.log(this.events);
      
    });
    this.loadStories();
    this.isUserLoggedIn = this.authService.isLoggedIn();

    const u = localStorage.getItem("UserData");
    if (u) {
      const UserData = JSON.parse(u);
      console.log("userdata :", UserData);
      this.avatar = UserData.avatar;
    }

    this.topAlbumsService.getTopAlbums().subscribe(
      (response) => {
        this.topalbums = response.top_albums;
        this.loadSongsForTopAlbums();
      },
      (error) => {
        console.error('Erreur lors de la récupération des meilleurs albums :', error);
      }
    );

    this.topsService.getTopSongs().subscribe(
      (response) => {
        this.topSongs = response.data;
        this.loadSongsForTopAlbums();
        console.log(this.topSongs);
      },
      (error) => {
        console.error('Erreur lors de la récupération des Meilleur songs :', error);
      }
    );

    this.artistService.getArtist('').subscribe(
      (response) => {
        this.artists = response.data.data;
        console.log(this.artists);
      },
      (error) => {
        console.error('Erreur lors de la récupération des artistes :', error);
      }
    );

    this.suggestionsService.getSuggestions().subscribe(
      (response) => {
        this.latest = response.new_releases.data;
        console.log(this.latest)
        this.loadSongsForTopAlbums();
      },
      (error) => {
        console.error('Erreur lors de la récupération des suggestions :', error);
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


  truncateTitle(title: string, limit: number): string {
    return title.length > limit ? title.slice(0, limit) + '...' : title;
  }

  stories: any[] = []; // Array to hold story data

  loadStories() {
    this.yourService.getStories().subscribe({
      next: (response) => {
        this.stories = response; // Assuming response contains an array of stories
        console.log(this.stories)
      },
      error: (error) => {
        console.error('Error loading stories', error);
      }
    });
  }





  // Gestion chargement de la musique et playlist 
  loadsong(playlist:any, index:number){
    // console.log('Playlist chargement...')
    this.PlaylistService.updateindex(index)
    this.PlaylistService.loadplaylist(playlist, index)
    this.musicService.loadNewPlaylist(playlist, index);
  } 
}
