import { Component, OnInit, OnDestroy } from '@angular/core';
import { NavController } from '@ionic/angular';
import { musicTab } from '../views/play/play.page';
import { SongsService } from 'src/app/services/songs.service';
import { Subscription } from 'rxjs';
import { Media, MediaObject } from '@awesome-cordova-plugins/media/ngx';
import { Platform } from '@ionic/angular';

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
  newSongUrl: string = 'https://example.com/new-song.mp3'; // Assurez-vous que l'URL est correcte
  private songSubscription: Subscription | undefined;
  currentSong: any; // Ajoutez cette propriété si ce n'est pas déjà fait

  constructor(
    private navCtrl: NavController,
    private songService: SongsService,
    private media: Media,
    private platform: Platform
  ) {}

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
        this.changeSong(song.url); // Supposons que vous avez une propriété 'url' pour la chanson
        this.updateDuration();
      }
    });
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

  close() {
    musicTab.isClose = true;
    musicTab.musicIsPlay = false;
    this.stopMusic();
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

  goToPlay() {
    if (this.currentSong) {
      localStorage.setItem('music', JSON.stringify(this.currentSong));
      this.navCtrl.navigateForward('play');
    } else {
      console.error('Aucune chanson actuelle à sauvegarder');
    }
  }
  

}
