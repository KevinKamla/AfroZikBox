import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import {
  AlertController,
  ModalController,
  NavController,
  Platform,
} from '@ionic/angular';
import { MusicoptionPage } from 'src/app/components/musicoption/musicoption.page';
import { HttpClient } from '@angular/common/http';
import { Media, MediaObject } from '@awesome-cordova-plugins/media/ngx';
import { BehaviorSubject, Subscription } from 'rxjs';
import { LecteurService } from 'src/app/services/lecteur.service';
import { AuthService } from 'src/app/services/auth.service';
import { SongsService } from 'src/app/services/songs.service';
import { TopSongsService } from 'src/app/services/top-songs.service';
import { SuggestionsService } from 'src/app/services/suggestions.service';
import { PlaylistService } from 'src/app/services/playlist.service';
import { DownloadService } from 'src/app/services/download.service';
import { FavoriteService } from 'src/app/services/favorite.service';
import { CommentsModalPage } from '../../components/comments-modal/comments-modal.page';
import { CommentService } from 'src/app/services/comment.service';
import { Share } from '@capacitor/share';

export let musicTab = {
  musicIsPlay: false,
  isClose: true,
};

@Component({
  selector: 'app-play',
  templateUrl: './play.page.html',
  styleUrls: ['./play.page.scss'],
  providers: [Media],
})
export class PlayPage implements OnInit, OnDestroy {
  isPlaying = false;
  pauseIcon: string = 'play';
  file: MediaObject | null = null;
  currentTime = 0;
  duration = 0;
  intervalId: any;
  private songSubscription: Subscription | undefined;
  currentSong: any;
  liked: boolean = false;
  love: boolean = false;

  isUserLoggedIn: boolean = false;
  musictabOption = musicTab;

  sonsCategorieActuelle: any[] = [];
  indexSonActuel: number = 0;
  private currentTimeSubject = new BehaviorSubject<number>(0);
  private playSubscription: Subscription | undefined;
  private timeSubscription: Subscription | undefined;
  private durationSubscription: Subscription | undefined;
  isShuffleEnabled = false;
  isRepeatOneEnabled = false;

  audio: HTMLAudioElement = new Audio();
  currentSongIndex: number = 0;
  sourceArray: any;
  topSongs: any;
  latest: any;
  comments = ['Bonjour', 'Nice']; // Exemple de commentaires

  constructor(
    private downloadService: DownloadService,
    private media: Media,
    private platform: Platform,
    private http: HttpClient,
    public navCtrl: NavController,
    public route: Router,
    private modalCtrl: ModalController,
    private musicPlayerService: LecteurService,
    private songService: SongsService,
    private authService: AuthService,
    private topsService: TopSongsService,
    private suggestionsService: SuggestionsService,
    private PlaylistService: PlaylistService,
    private favoriteService: FavoriteService,
    private modalController: ModalController,
    private commentService:CommentService
  ) {}

  ngOnInit() {
    // this.platform.ready().then(() => {
    //   if (this.platform.is('cordova')) {
    // this.initializeMusicControls();
    // console.log(this.initializeMusicControls());

    //   } else {
    //     console.log('Cordova n\'est pas disponible');
    //   }
    // });

    this.songService.currentSong$.subscribe((song) => {
      if (song) {
        this.currentSong = song;
        this.sourceArray = song.sourceArray;
        localStorage.setItem('currentSong', JSON.stringify(song));
      }
    });
    console.log(this.currentSong);

    this.authService.isAuthenticated().subscribe((authenticated: boolean) => {
      this.isUserLoggedIn = authenticated;
    });

    this.topsService.getTopSongs().subscribe(
      (response) => {
        this.topSongs = response.data;
      },
      (error) => {
        console.error(
          'Erreur lors de la récupération des Meilleurs songs :',
          error
        );
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

    const music = localStorage.getItem('music');
    if (music) {
      this.currentSong = JSON.parse(music);
    }

    // this.songSubscription = this.songService.currentSong$.subscribe((song) => {
    //   this.currentSong = song;
    // });

    // Souscrire au flux du service pour la chanson actuelle
    this.songSubscription = this.musicPlayerService.currentSong$.subscribe(
      (song) => {
        this.currentSong = song;
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
    localStorage.setItem('currentSong', JSON.stringify(this.currentSong)); // Ajouté pour conserver la chanson actuelle dans le localStorage
  }

  toggleShuffle() {
    this.isShuffleEnabled = !this.isShuffleEnabled;
    this.musicPlayerService.toggleShuffle();
  }

  // Activer/désactiver la répétition d'une seule chanson
  toggleRepeatOne() {
    this.isRepeatOneEnabled = !this.isRepeatOneEnabled;
    console.log(234);

    this.musicPlayerService.toggleRepeatOne();
  }

  // Sauter de 30 secondes dans la chanson actuelle
  skipForward() {
    this.musicPlayerService.skipForward();
  }

  download() {
    this.downloadService.downloadAndStoreMusic(this.currentSong);
  }

  // Revenir en arrière de 10 secondes
  rewind() {
    this.musicPlayerService.rewind();
  }

  togglePlayPause() {
    if (this.isPlaying) {
      this.musicPlayerService.pauseMusic();
    } else {
      this.musicPlayerService.resumeMusic();
    }
  }

  formatTime(seconds: number): string {
    const minutes: number = Math.floor(seconds / 60);
    const remainingSeconds: number = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  }

  seekTo(event: any) {
    this.musicPlayerService.seekTo(event.detail.value);
  }

  // Méthode pour jouer la prochaine chanson avec MusicService
  playNextSong() {
    let song = this.PlaylistService.getnextsong();
    this.playMusic(song, this.currentSongIndex);
    // if (this.currentSongIndex + 1 < this.topSongs.length) {
    //   this.currentSongIndex++;
    //   this.playMusic(this.topSongs[this.currentSongIndex], this.currentSongIndex);
    // } else {
    //   console.log('Toutes les chansons ont été jouées.');
    // }
  }

  // Méthode pour jouer la chanson précédente avec MusicService
  playPreviousSong() {
    let song = this.PlaylistService.getprevsong();
    this.playMusic(song, this.currentSongIndex);
    // if (this.currentSongIndex > 0) {
    //   this.currentSongIndex--;
    //   this.playMusic(this.topSongs[this.currentSongIndex], this.currentSongIndex);
    // }
  }

  playMusic(song: any, index: number): void {
    // Appelez la méthode playMusic avec song et index
    this.musicPlayerService.playMusic(song, index);
    musicTab.musicIsPlay = true;
    this.currentSong = song;
    console.log(this.currentSong);
  }

  cleanDescription(description: string): string {
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = description;
    const cleanText = tempDiv.textContent || tempDiv.innerText || '';

    // Retourner les 50 premiers caractères
    return cleanText.length > 50
      ? cleanText.substring(0, 50) + '...'
      : cleanText;
  }

  fetchTopSongs() {
    const apiUrl =
      'https://afrozikbox.com/endpoint/common/discover?server_key=d012ab7a1e170f66e8ed63176dcc4e7b';
    this.http
      .post(apiUrl, {
        access_token: 'your-access-token',
        server_key: 'your-server-key',
        limit: 1,
        offset: 0,
      })
      .subscribe((data: any) => {
        const songUrl = data.new_releases.data[0].audio_location;
        console.log('url audio', songUrl);
        this.playSong(songUrl);
      });
  }

  goToRoute(route: string = '') {
    if (route) {
      this.route.navigate([route]);
    } else {
      this.navCtrl.back();
    }
  }
  playSong(songUrl: any) {
    throw new Error('Method not implemented.');
  }

  play(newSong: boolean = false, songUrl: string = '') {
    if (!this.platform.is('cordova')) {
      console.error("Cordova n'est pas disponible");
      return;
    }

    if (this.isPlaying) {
      this.pause();
      return;
    }

    if (newSong && songUrl) {
      this.changeSong(songUrl);
      return;
    }

    if (this.file) {
      this.file.play({ playAudioWhenScreenIsLocked: true });
      this.isPlaying = true;
      this.pauseIcon = 'pause';
      musicTab.musicIsPlay = true;
      this.startProgressUpdater();
    } else {
      console.error('Aucun fichier audio disponible pour jouer');
    }
  }

  pause() {
    if (this.file) {
      this.file.pause();
      this.isPlaying = false;
      this.pauseIcon = 'play';
      musicTab.musicIsPlay = false;
      this.stopProgressUpdater();
    } else {
      console.error('Aucun fichier audio à mettre en pause');
    }
  }

  stopMusic() {
    if (this.file) {
      this.file.stop();
      this.file.release();
      this.isPlaying = false;
      this.currentTime = 0;
      this.pauseIcon = 'play';
      musicTab.musicIsPlay = false;
      this.stopProgressUpdater();
    }
  }

  changeSong(newSongUrl: string) {
    this.stopMusic();
    this.file = this.media.create(newSongUrl);
    this.file.onStatusUpdate.subscribe((status) =>
      console.log("Status de l'audio: ", status)
    );
    this.file.onSuccess.subscribe(() => console.log('Lecture terminée'));
    this.file.onError.subscribe((error) => console.error('Erreur: ', error));
    this.play(true);
  }

  loadSong(songUrl: string) {
    this.file = this.media.create(songUrl);
    this.file.onStatusUpdate.subscribe((status) =>
      console.log("Status de l'audio: ", status)
    );
    this.file.onSuccess.subscribe(() => console.log('Lecture terminée'));
    this.file.onError.subscribe((error) => console.error('Erreur: ', error));
    this.play();
  }

  startProgressUpdater() {
    this.intervalId = setInterval(() => {
      if (this.file) {
        this.file
          .getCurrentPosition()
          .then((position) => {
            if (position >= 0) {
              this.currentTime = position;
            }
          })
          .catch((err) => {
            console.error(
              'Erreur lors de la récupération du temps actuel',
              err
            );
          });
      }
    }, 1000);
  }

  stopProgressUpdater() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  ngOnDestroy() {
    this.stopMusic();
    if (this.songSubscription) {
      this.songSubscription.unsubscribe();
    }
  }

  async openOptionSound() {
    const modal = await this.modalCtrl.create({
      component: MusicoptionPage,
      initialBreakpoint: 0.75,
      breakpoints: [0.5, 0.75, 1],
      mode: 'ios',
    });
    await modal.present();
  }

  likeSong(audioId: string) {
    this.favoriteService.likeDislikeSong(audioId).subscribe({
      next: (data) => {
        this.liked = true;
        console.log('Song liked:', data);
      },
      error: (err) => {
        console.error('Error liking song:', err);
      },
    });
  }

  dislikeSong(audioId: string) {
    this.favoriteService.dislikeTrack(audioId).subscribe({
      next: (data) => {
        console.log('Song disliked:', data);
        this.liked = false;
      },
      error: (err) => {
        console.error('Error disliking song:', err);
      },
    });
  }

  toggleFavorite(trackId: number) {
    this.favoriteService.toggleFavorite(trackId)
      .subscribe({
        next: (response) => {
          if (response.status === 200) {
            this.love = !this.love; // Toggle the liked status
            console.log('Successfully toggled favorite:', response.mode);
            console.log('successs',response)
          } else {
            console.error('Error toggling favorite:', response.error);
          }
        },
        error: (err) => {
          console.error('Error toggling favorite:', err);
        }
      });
  }

  toggleComment(trackId: number) {
    this.commentService.toggleComment(trackId)
      .subscribe({
        next: (response) => {
          if (response.status === 200) {
            console.log('Successfully toggled Comment:', response.mode);
          } else {
            console.error('Error toggling comment:', response.error);
          }
        },
        error: (err) => {
          console.error('Error toggling comment:', err);
        }
      });
  }
 
  
  async openCommentsModal(currentSong:any) {
    console.log('Chanson actuelle:', currentSong); // Vérifiez que les informations sont présentes
    const modal = await this.modalController.create({
      component: CommentsModalPage,
      componentProps: { currentSong: this.currentSong },
    });
    return await modal.present();
  }

  async shareMusicLink(url: string) {
    try {
      await Share.share({
        title: 'Écoutez cette musique !',
        text: 'Découvrez cette chanson incroyable !',
        url: this.currentSong.url,
        dialogTitle: 'Partager la musique',
      });
    } catch (error) {
      console.error('Erreur lors du partage:', error);
    }
  }
  favoris: any[] = [];

  accessToken: string = localStorage.getItem('accessToken') || '';
  userId: number = parseInt(localStorage.getItem('userId') || '0', 10);
    
  isFavorite(url: string){
  this.favoriteService
  .getFavorites(this.userId, this.accessToken)
  .subscribe((res) => {
    console.log(res);
    this.favoris = res.data.data;
    const isFavorite = this.favoris.some(favorite => favorite.url === this.currentSong.url);
    return isFavorite ? 'oui' : 'non'; // Retourner 'oui' ou 'non'
  });
  }
}
