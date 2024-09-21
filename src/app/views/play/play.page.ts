/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController, NavController, Platform } from '@ionic/angular';
import { MusicoptionPage } from 'src/app/components/musicoption/musicoption.page';
import { HttpClient } from '@angular/common/http';
import { Media, MediaObject } from '@awesome-cordova-plugins/media/ngx';
import { Subscription } from 'rxjs';

export let musicTab = {
  musicIsPlay: false,
  isClose: true
}

@Component({
  selector: 'app-play',
  templateUrl: './play.page.html',
  styleUrls: ['./play.page.scss'],
})


export class PlayPage implements OnInit {
  isPlaying = false;
  musictabOption = musicTab;
  muteIcon: string = "mute";
  pauseIcon: string = "play";
  gesVol: string = "medium";
  songFile!: MediaObject;
  file: MediaObject | null = null;
  currentSong: any;
  currentTime = 0; // Position actuelle du morceau
  duration = 0;  // Durée du morceau, sera récupérée dynamiquement
  intervalId: any; // ID pour stocker l'intervalle qui met à jour la position actuelle
  newSongUrl: string = 'https://example.com/new-song.mp3'; // Assurez-vous que l'URL est correcte
  private songSubscription: Subscription | undefined;

  constructor(
    private media: Media,
    private platform: Platform,
    private http:HttpClient,
    public navCtrl: NavController,
    public route: Router,
    private modalCtrl: ModalController,
  ) { }
  playSong(songUrl: string) {
    this.platform.ready().then(() => {
      this.songFile = this.media.create(songUrl);
      this.songFile.play();  
    });
  }

  stopSong() {
    if (this.songFile) {
      this.songFile.stop(); 
    }
  }

  fetchTopSongs() {
    const apiUrl = 'https://afrozikbox.com/endpoint/common/discover?server_key=d012ab7a1e170f66e8ed63176dcc4e7b';
    this.http.post(apiUrl, {
      access_token: 'your-access-token',
      server_key: 'your-server-key',
      limit: 1,
      offset: 0
    }).subscribe((data: any) => {
      const songUrl = data.new_releases.data[0].audio_location;
      console.log("url audio", songUrl);
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

  // play() {
    // if (this.pauseIcon == "pause") {
    //   this.pauseIcon = "play";
    //   musicTab.isClose = false;
    //   musicTab.musicIsPlay = false;

    // } else {
    //   this.pauseIcon = "pause";
    //   musicTab.isClose = false;
    //   musicTab.musicIsPlay = true;
    // }
  // }



  async openOptionSound() {
    const modal = await this.modalCtrl.create({
      component: MusicoptionPage,
      initialBreakpoint: 0.75,
      breakpoints: [0.5, 0.75, 1],
      mode: 'ios'

    })
    await modal.present();
  }

  ngOnInit() {
    // Vérifie si la musique est en cours de lecture au chargement de la page
    musicTab.musicIsPlay ? this.pauseIcon = 'pause' : this.pauseIcon = 'play';
    
    const music = localStorage.getItem('music');
    if (music) {
      this.currentSong = JSON.parse(music);
      console.log(this.currentSong);
      this.loadSong(this.currentSong.url);  // Charge et joue la chanson enregistrée dans localStorage
    }
  
    // Vérifie si un fichier audio est chargé et si la musique est censée être en lecture
    if (this.file && musicTab.musicIsPlay) {
      this.isPlaying = true;  // La musique est en cours de lecture
      this.startProgressUpdater();  // Démarre la mise à jour de la progression
    } else {
      this.isPlaying = false;  // Pas de musique en cours de lecture
    }
  }
  
  loadSong(songUrl: string) {
    if (this.file) {
      this.file.stop();
      this.file.release();
    }

    this.file = this.media.create(songUrl);
    this.file.play();
  }

  ngOnDestroy() {
    this.stopProgressUpdater(); // Nettoyer l'intervalle lors de la destruction du composant
    if (this.file) {
      this.file.stop();
      this.file.release();
    }
    if (this.songSubscription) {
      this.songSubscription.unsubscribe(); // Nettoyer l'abonnement
    }
  }

  play(newSong: boolean = false) {
    if (this.pauseIcon == "pause") {
      this.pauseIcon = "play";
      musicTab.isClose = false;
      musicTab.musicIsPlay = false;

    } else {
      this.pauseIcon = "pause";
      musicTab.isClose = false;
      musicTab.musicIsPlay = true;
    }
    if (!this.platform.is('cordova')) {
      console.error('Cordova n\'est pas disponible');
      return;
    }
  
    if (newSong) {
      if (this.file) {
        this.file.stop();
        this.file.release();
      }
      if (this.newSongUrl) {
        this.file = this.media.create(this.newSongUrl);
        this.file.play();
        this.currentTime = 0;
        musicTab.musicIsPlay = true;
        this.startProgressUpdater();
        setTimeout(() => this.updateDuration(), 1000); // Attendre une seconde avant d'appeler updateDuration
      } else {
        console.error('URL de la nouvelle chanson non définie');
      }
    } else {
      if (this.isPlaying) {
        this.pause();
      } else {
        if (this.file) {
          this.file.play({ playAudioWhenScreenIsLocked: true });
          this.isPlaying = true;
          musicTab.musicIsPlay = true;
          this.startProgressUpdater();
        } else {
          console.error('Aucun fichier audio disponible pour jouer');
        }
      }
    }
  }
  
  
  pause() {
    if (this.file) {
      this.file.pause();
      this.isPlaying = false;
      musicTab.musicIsPlay = false;
      this.stopProgressUpdater();
    } else {
      console.error('Aucun fichier audio à mettre en pause');
    }
  }

  changeSong(newSongUrl: string) {
    if (this.file) {
      this.file.stop();
      this.file.release();
    }
  
    // Charge le nouveau fichier audio
    if (newSongUrl) {
      this.file = this.media.create(newSongUrl);
      this.play(true);  // Passe `true` pour indiquer qu'il s'agit d'une nouvelle chanson
    } else {
      console.error('URL de la nouvelle chanson non définie');
    }
  }

  seekTo(event: any) {
    const newPosition = event.detail.value;
    this.currentTime = newPosition;

    if (this.file) {
      this.file.seekTo(this.currentTime * 1000); // Seek in milliseconds
    }
  }

  startProgressUpdater() {
    this.intervalId = setInterval(() => {
      if (this.file) {
        this.file.getCurrentPosition().then(position => {
          if (position >= 0) {
            this.currentTime = position;
            console.log('Current time: ', this.currentTime);
          }
        }).catch(err => {
          console.log('Erreur lors de la récupération du temps actuel', err);
        });
      }
    }, 1000); // Mettre à jour chaque seconde
  }

  stopProgressUpdater() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  updateDuration() {
    if (this.file) {
      const maxRetries = 10;
      let retries = 0;

      const checkDuration = () => {
        try {
          const duration = this.file?.getDuration();
          if (duration !== undefined && duration > 0) {
            this.duration = duration;
            console.log('Durée: ', this.duration);
          } else if (retries < maxRetries) {
            retries++;
            // console.log('Durée non disponible, réessai...', retries);
            setTimeout(checkDuration, 500); // Réessayer après 500 ms
          } else {
            console.log('Durée toujours non disponible après plusieurs essais');
          }
        } catch (err) {
          console.log('Erreur lors de la récupération de la durée', err);
        }
      };

      checkDuration();
    } else {
      console.error('Le fichier média est nul');
    }
  }

  stopMusic() {
    if (this.file) {
      this.file.stop(); // Arrêter la musique
      this.isPlaying = false;
      this.currentTime = 0;
      this.file.release(); // Libérer les ressources
      this.stopProgressUpdater(); // Arrêter la mise à jour de la progression
      console.log('Musique arrêtée');
    }
  }

}

