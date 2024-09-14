import { Component, OnInit, OnDestroy } from '@angular/core';
import { NavController } from '@ionic/angular';
import { musicTab } from '../views/play/play.page';
import { NativeAudio } from '@capacitor-community/native-audio';
import { SongsService } from 'src/app/services/songs.service';
import { Subscription } from 'rxjs';
import { MediaObject } from '@awesome-cordova-plugins/media/ngx';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})

export class TabsPage implements OnInit, OnDestroy {
  musictabOption = musicTab;
  dataSon: any;
  file: MediaObject | null = null;
  isPlaying = false;
  currentTime = 0; // Position actuelle du morceau
  duration = 0;  // Durée du morceau, sera récupérée dynamiquement
  intervalId: any; // ID pour stocker l'intervalle qui met à jour la position actuelle

  constructor(private navCtrl: NavController,    private songService: SongsService  ) { }
   // Méthode pour jouer ou mettre en pause la musique
   play() {
    if (!this.isPlaying) {
      this.songService.playMusic().then(() => {
        this.isPlaying = true;
        musicTab.musicIsPlay = true;
        this.startProgressUpdater();
        this.updateDuration(); // Mettre à jour la durée après la lecture
      }).catch(err => {
        console.log('Erreur lors de la lecture de la musique', err);
      });
    } else {
      this.pause();
    }
  }

  // Méthode pour mettre en pause la musique
  pause() {
    this.songService.pauseMusic().then(() => {
      this.isPlaying = false;
      musicTab.musicIsPlay = false;
      this.stopProgressUpdater(); // Arrêter la mise à jour de la progression
    }).catch(err => {
      console.log('Erreur lors de la mise en pause de la musique', err);
    });
  }

  // Méthode pour aller à une nouvelle position dans la musique
  seekTo(event: any) {
    const newPosition = event.detail.value;
    this.currentTime = newPosition;
    this.songService.seekTo(newPosition).catch(err => {
      console.log('Erreur lors de la recherche dans la musique', err);
    });
  }

  // Méthode pour démarrer la mise à jour de la progression
  startProgressUpdater() {
    this.intervalId = setInterval(() => {
      this.songService.getCurrentTime().then(position => {
        this.currentTime = position;
        console.log('Current time: ', this.currentTime);
      }).catch(err => {
        console.log('Erreur lors de la récupération du temps actuel', err);
      });
    }, 1000); // Mettre à jour chaque seconde
  }

  // Méthode pour arrêter la mise à jour de la progression
  stopProgressUpdater() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  // Méthode pour fermer le lecteur de musique
  close() {
    musicTab.isClose = true;
    musicTab.musicIsPlay = false;
    this.stopMusic();
  }

  // Méthode pour récupérer la durée du morceau
  updateDuration() {
    this.songService.getDuration().then(duration => {
      this.duration = duration;
      console.log('Duration: ', this.duration);
    }).catch(err => {
      console.log('Erreur lors de la récupération de la durée', err);
    });
  }

  // Méthode pour arrêter complètement la musique
  stopMusic() {
    this.songService.stopMusic().then(() => {
      this.isPlaying = false;
      this.currentTime = 0;
      this.stopProgressUpdater(); // Arrêter la mise à jour de la progression
      console.log('Musique arrêtée');
    }).catch(err => {
      console.log('Erreur lors de l\'arrêt de la musique', err);
    });
  }


  // Méthode pour aller à la page de lecture
  goToPlay() {
    this.navCtrl.navigateForward('play');
  }
  currentSong: any;
  private songSubscription: Subscription | undefined;

  ngOnInit() {
    // Récupérer les données de localStorage
    const music = localStorage.getItem('music');
    if (music) {
      this.dataSon = JSON.parse(music);
    }

    // S'abonner au service pour obtenir les détails actuels de la chanson
    this.songSubscription = this.songService.currentSong$.subscribe(song => {
      this.currentSong = song;
      if (song) {
        this.updateDuration();
      }
    });
  }

  ngOnDestroy() {
    this.stopProgressUpdater(); // Nettoyer l'intervalle lors de la destruction du composant
  }
}

  // Méthode pour jouer ou mettre en pause la musique
  // play() {
  //   if (!this.isPlaying) {
  //     NativeAudio.play({
  //       assetId: 'fire',
  //       time: this.currentTime
  //     }).then(() => {
  //       console.log('Lecture en cours');
  //       this.isPlaying = true;
  //       musicTab.musicIsPlay = true;

  //       // Commence à mettre à jour la position actuelle
  //       this.startProgressUpdater();
  //       this.updateDuration(); // Mettre à jour la durée après la lecture
  //     }).catch(err => {
  //       console.log('Erreur lors de la lecture', err);
  //     });
  //   } else {
  //     this.pause();
  //   }
  // }

  // // Méthode pour mettre en pause la musique
  // pause() {
  //   NativeAudio.getCurrentTime({
  //     assetId: 'fire'
  //   }).then(result => {
  //     this.currentTime = result.currentTime;
  //     NativeAudio.stop({
  //       assetId: 'fire'
  //     }).then(() => {
  //       this.isPlaying = false;
  //       musicTab.musicIsPlay = false;
  //       this.stopProgressUpdater(); // Arrêter la mise à jour de la progression
  //     }).catch(err => {
  //       console.log('Erreur lors de la mise en pause', err);
  //     });
  //   });
  // }

  // // Méthode pour aller à une nouvelle position dans la musique
  // seekTo(event: any) {
  //   const newPosition = event.detail.value;
  //   this.currentTime = newPosition;
  //   NativeAudio.play({
  //     assetId: 'fire',
  //     time: this.currentTime
  //   });
  // }

  // // Méthode pour démarrer la mise à jour de la progression
  // startProgressUpdater() {
  //   this.intervalId = setInterval(() => {
  //     NativeAudio.getCurrentTime({
  //       assetId: 'fire'
  //     }).then(result => {
  //       this.currentTime = result.currentTime;
  //       console.log('Current time: ', this.currentTime);
  //     }).catch(err => {
  //       console.log('Erreur lors de la récupération du temps actuel', err);
  //     });
  //   }, 1000); // Mettre à jour chaque seconde
  // }

  // // Méthode pour arrêter la mise à jour de la progression
  // stopProgressUpdater() {
  //   clearInterval(this.intervalId);
  // }
  
  // // Méthode pour récupérer la durée du morceau
  // updateDuration() {
  //   if (this.currentSong) {
  //     NativeAudio.getDuration({
  //       assetId: 'fire'
  //     }).then(result => {
  //       this.duration = result.duration;
  //       console.log('Duration: ', this.duration);
  //     }).catch(err => {
  //       console.log('Erreur lors de la récupération de la durée', err);
  //     });
  //   }
  // }

  // // Méthode pour arrêter complètement la musique
  // stopMusic() {
  //   NativeAudio.stop({
  //     assetId: 'fire'
  //   }).then(() => {
  //     this.isPlaying = false;
  //     this.currentTime = 0;
  //     this.stopProgressUpdater(); // Arrêter la mise à jour de la progression
  //   }).catch(err => {
  //     console.log('Erreur lors de l\'arrêt de la musique', err);
  //   });
  // }
