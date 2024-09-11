import { Component, OnInit, OnDestroy } from '@angular/core';
import { NavController } from '@ionic/angular';
import { musicTab } from '../views/play/play.page';
import { NativeAudio } from '@capacitor-community/native-audio';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})

export class TabsPage implements OnInit, OnDestroy {
  musictabOption = musicTab;
  dataSon: any;
  isPlaying = false;
  currentTime = 0; // Position actuelle du morceau
  duration = 0;  // Durée du morceau, sera récupérée dynamiquement
  intervalId: any; // ID pour stocker l'intervalle qui met à jour la position actuelle

  constructor(private navCtrl: NavController) { }

  // Méthode pour jouer ou mettre en pause la musique
  play() {
    if (!this.isPlaying) {
      NativeAudio.play({
        assetId: 'fire',
        time: this.currentTime
      }).then(() => {
        console.log('Lecture en cours');
        this.isPlaying = true;
        musicTab.musicIsPlay = true;

        // Commence à mettre à jour la position actuelle
        this.startProgressUpdater();
        this.updateDuration(); // Mettre à jour la durée après la lecture
      }).catch(err => {
        console.log('Erreur lors de la lecture', err);
      });
    } else {
      this.pause();
    }
  }

  // Méthode pour mettre en pause la musique
  pause() {
    NativeAudio.getCurrentTime({
      assetId: 'fire'
    }).then(result => {
      this.currentTime = result.currentTime;
      NativeAudio.stop({
        assetId: 'fire'
      }).then(() => {
        this.isPlaying = false;
        musicTab.musicIsPlay = false;
        this.stopProgressUpdater(); // Arrêter la mise à jour de la progression
      }).catch(err => {
        console.log('Erreur lors de la mise en pause', err);
      });
    });
  }

  // Méthode pour aller à une nouvelle position dans la musique
  seekTo(event: any) {
    const newPosition = event.detail.value;
    this.currentTime = newPosition;
    NativeAudio.play({
      assetId: 'fire',
      time: this.currentTime
    });
  }

  // Méthode pour démarrer la mise à jour de la progression
  startProgressUpdater() {
    this.intervalId = setInterval(() => {
      NativeAudio.getCurrentTime({
        assetId: 'fire'
      }).then(result => {
        this.currentTime = result.currentTime;
        console.log('Current time: ', this.currentTime);
      }).catch(err => {
        console.log('Erreur lors de la récupération du temps actuel', err);
      });
    }, 1000); // Mettre à jour chaque seconde
  }

  // Méthode pour arrêter la mise à jour de la progression
  stopProgressUpdater() {
    clearInterval(this.intervalId);
  }

  // Méthode pour fermer le lecteur de musique
  close() {
    musicTab.isClose = true;
    musicTab.musicIsPlay = false;
    this.stopMusic();
  }

  // Méthode pour récupérer la durée du morceau
  updateDuration() {
    NativeAudio.getDuration({
      assetId: 'fire'
    }).then(result => {
      this.duration = result.duration; // Mettre à jour la durée de la musique
      console.log('Duration: ', this.duration);
    }).catch(err => {
      console.log('Erreur lors de la récupération de la durée', err);
    });
  }

  // Méthode pour arrêter complètement la musique
  stopMusic() {
    NativeAudio.stop({
      assetId: 'fire'
    }).then(() => {
      this.isPlaying = false;
      this.currentTime = 0;
      this.stopProgressUpdater(); // Arrêter la mise à jour de la progression
    }).catch(err => {
      console.log('Erreur lors de l\'arrêt de la musique', err);
    });
  }

  // Méthode pour aller à la page de lecture
  goToPlay() {
    this.navCtrl.navigateForward('play');
  }

  ngOnInit() {
    const music = localStorage.getItem('music');
    
    if (music) {
      this.dataSon = JSON.parse(music);
      this.updateDuration(); // Mettre à jour la durée de la musique au chargement
    }
  }

  ngOnDestroy() {
    this.stopProgressUpdater(); // Nettoyer l'intervalle lors de la destruction du composant
  }
}
