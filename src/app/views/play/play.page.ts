import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController, NavController, Platform } from '@ionic/angular';
import { MusicoptionPage } from 'src/app/components/musicoption/musicoption.page';
import { HttpClient } from '@angular/common/http';
import { Media, MediaObject } from '@awesome-cordova-plugins/media/ngx';
import { Subscription } from 'rxjs';

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

  constructor(
    private media: Media,
    private platform: Platform,
    private http: HttpClient,
    public navCtrl: NavController,
    public route: Router,
    private modalCtrl: ModalController
  ) {}

  ngOnInit() {
    // Vérifie si la musique est en cours de lecture au chargement de la page
    musicTab.musicIsPlay
      ? (this.pauseIcon = 'pause')
      : (this.pauseIcon = 'play');

    const music = localStorage.getItem('music');
    if (music) {
      this.currentSong = JSON.parse(music);
      console.log(this.currentSong);
      this.loadSong(this.currentSong.url); // Charge et joue la chanson enregistrée dans localStorage
    }

    // Vérifie si un fichier audio est chargé et si la musique est censée être en lecture
    if (this.file && musicTab.musicIsPlay) {
      this.isPlaying = true; // La musique est en cours de lecture
      this.startProgressUpdater(); // Démarre la mise à jour de la progression
    } else {
      this.isPlaying = false; // Pas de musique en cours de lecture
    }
  }

  musictabOption = musicTab;

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
}
