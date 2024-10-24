import { Component, OnInit, OnDestroy } from '@angular/core';import { AlertController, NavController, Platform } from '@ionic/angular';
import { register } from 'swiper/element/bundle';
import { SongsService } from './services/songs.service';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';
import { TopSongsService } from './services/top-songs.service';
import { SuggestionsService } from './services/suggestions.service';
import { LecteurService } from './services/lecteur.service';
import { TopAlbumsService } from './services/top-albums.service';
import { FavoriteService } from './services/favorite.service';
import { PlaylistService } from'src/app/services/playlist.service';
import { musicTab } from './views/play/play.page';
import { BehaviorSubject, Subscription } from 'rxjs';

register();

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  canAccessPrivateTab!: boolean;
  isUserLogged: boolean = false;
  musictabOption = musicTab;
  currentSong: any;
  topSongs: any[] = [];
  latest: any[] = [];
  isPlaying = false;
  currentTime = 0;
  duration = 0;
  sonsCategorieActuelle: any[] = [];
  indexSonActuel: number = 0;
  private songSubscription: Subscription | undefined;
  private currentTimeSubject = new BehaviorSubject<number>(0);
  private playSubscription: Subscription | undefined;
  private timeSubscription: Subscription | undefined;
  private durationSubscription: Subscription | undefined;

  accessToken: string = localStorage.getItem('accessToken') || '';
  userId: number = parseInt(localStorage.getItem('userId') || '0', 10);
  audio: HTMLAudioElement = new Audio();
  currentSongIndex: number = 0;
  sourceArray: any;
  topalbums:any[]=[];
  favoris: any[] = [];
  indexCurrentSong: number = 0;
  constructor(private navCtrl: NavController,
    private songService: SongsService,
    private platform: Platform,
    private authService: AuthService,
    private alertController: AlertController,
    private router: Router,
    private topsService: TopSongsService,
    private suggestionsService: SuggestionsService,
    private musicPlayerService: LecteurService,
    private topAlbumsService:TopAlbumsService,
    private favoriteService: FavoriteService,
    private PlaylistService: PlaylistService,) {}

    isUserLoggedIn(): boolean {
      return this.authService.isUserLoggedIn(); // Méthode pour vérifier si l'utilisateur est connecté
    }
    ngOnInit() {
      // je recuperer l'index du song en cours
      let a = localStorage.getItem('index')
      if (a) {
        this.indexCurrentSong = JSON.parse(a)
      }
  
      this.isUserLogged = this.isUserLoggedIn()
      console.log(this.isUserLogged);
      
      // this.favoriteService.getFavorites(this.userId, this.accessToken).subscribe((res) => {
      //   console.log(res);
      //   this.favoris = res.data.data;
      // });
      // this.topAlbumsService.getTopAlbums().subscribe(
      //   (response) => {
      //     this.topalbums = response.top_albums;
      //   }
      // );
      
      this.songService.currentSong$.subscribe((song) => {
        if (song) {
          this.currentSong = song;
          this.sourceArray = song.sourceArray;
        }
      });
  
      this.authService.isAuthenticated().subscribe((authenticated: boolean) => {
        // this.isUserLoggedIn = authenticated;
      });
  
      // this.topsService.getTopSongs().subscribe(
      //   (response) => {
      //     this.topSongs = response.data;
      //   },
      //   (error) => {
      //     console.error(
      //       'Erreur lors de la récupération des Meilleurs songs :',
      //       error
      //     );
      //   }
      // );
  
      // this.suggestionsService.getSuggestions().subscribe(
      //   (response) => {
      //     this.latest = response.new_releases.data;
      //   },
      //   (error) => {
      //     console.error(
      //       'Erreur lors de la récupération des suggestions :',
      //       error
      //     );
      //   }
      // );
  
      const music = localStorage.getItem('music');
      if (music) {
        this.currentSong = JSON.parse(music);
      }
  
      this.songSubscription = this.songService.currentSong$.subscribe((song) => {
        this.currentSong = song;
      });
  
      // Souscrire au flux du service pour la chanson actuelle
      this.songSubscription = this.musicPlayerService.currentSong$.subscribe(
        (song) => {
          this.currentSong = song;
          if (this.currentSong) {
            this.musicPlayerService.getAudioElement().onended = () => {
              this.playNextSong();
            };
          }
        }
      );
  
      // Souscrire à l'état de lecture (playing ou pause)
      this.playSubscription = this.musicPlayerService.isPlaying$.subscribe(
        (isPlaying) => {
          this.isPlaying = isPlaying;
        }
      );
  
      // Souscrire à la mise à jour du temps actuel
      this.timeSubscription = this.musicPlayerService.currentTime$.subscribe(
        (time) => {
          this.currentTime = time;
        }
      );
  
      // Souscrire à la mise à jour de la durée
      this.durationSubscription = this.musicPlayerService.duration$.subscribe(
        (duration) => {
          this.duration = duration;
        }
      );
      console.log(this.currentSong);
    }


  goToPlay() {
    if (this.currentSong) {
      localStorage.setItem('music', JSON.stringify(this.currentSong));
      this.navCtrl.navigateForward('play');
    } else {
      console.error('Aucune chanson actuelle à sauvegarder');
    }
  }

  async stopCurrentSong(): Promise<void> {
    this.musicPlayerService.stopCurrentMusic();
    this.isPlaying = false;
    this.currentTime = 0;
    this.duration = 0;
  }

  async next() {
    if (this.sonsCategorieActuelle.length > 0) {
      await this.stopCurrentSong();
      this.indexSonActuel =
        (this.indexSonActuel + 1) % this.sonsCategorieActuelle.length;
      this.currentSong = this.sonsCategorieActuelle[this.indexSonActuel];
      this.songService.setCurrentSong(this.currentSong);
      await new Promise((resolve) => setTimeout(resolve, 100));
    }
  }

  // Méthode pour jouer la prochaine chanson avec MusicService
  playNextSong() {
    // if (this.currentSongIndex + 1 < this.topSongs.length) {
    //   this.currentSongIndex++;
    //   this.playMusic(
    //     this.topSongs[this.currentSongIndex],
    //     this.currentSongIndex
    //   );
    // } else {
    //   console.log('Toutes les chansons ont été jouées.');
    // }

    

    let song = this.PlaylistService.getnextsong()
    this.playMusic(song, this.currentSongIndex) 
  }

  // Méthode pour jouer la chanson précédente avec MusicService
  playPreviousSong() {
    // if (this.currentSongIndex > 0) {
    //   this.currentSongIndex--;
    //   this.playMusic(
    //     this.topSongs[this.currentSongIndex],
    //     this.currentSongIndex
    //   );
    // }



    let song = this.PlaylistService.getprevsong()
    this.playMusic(song, this.currentSongIndex)
  }

  playMusic(song: any, index: number): void {
    // Appelez la méthode playMusic avec song et index
    this.musicPlayerService.playMusic(song, index);
    musicTab.musicIsPlay = true;
    this.currentSong = song;
    console.log(this.currentSong);
  }

  stopMusic() {
    this.musicPlayerService.stopCurrentMusic();
    musicTab.musicIsPlay = false;
  }

  ngOnDestroy() {
    if (this.songSubscription) this.songSubscription.unsubscribe();
    if (this.playSubscription) this.playSubscription.unsubscribe();
    if (this.timeSubscription) this.timeSubscription.unsubscribe();
    if (this.durationSubscription) this.durationSubscription.unsubscribe();
  }

  closePlayer() {
    this.stopMusic();
    this.currentSong = null;
    musicTab.isClose = true;
  }
}
