import { Component, OnInit, OnDestroy } from '@angular/core';
import { AlertController, NavController } from '@ionic/angular';
import { musicTab } from '../views/play/play.page';
import { SongsService } from 'src/app/services/songs.service';
import { Subscription } from 'rxjs';
import { Media, MediaObject } from '@awesome-cordova-plugins/media/ngx';
import { Platform } from '@ionic/angular';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { SuggestionsService } from '../services/suggestions.service';
import { TopSongsService } from '../services/top-songs.service';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage implements OnInit, OnDestroy {
  isUserLoggedIn: boolean = false;
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
  topSongs: any[] = [];
  latest: any[] = [];
  constructor(
    private navCtrl: NavController,
    private songService: SongsService,
    private media: Media,
    private platform: Platform,
    private authService: AuthService,
    private alertController: AlertController,
    private router: Router,
    private topsService: TopSongsService,
    private suggestionsService: SuggestionsService
  ) {}

  async verifierConnexion(onglet: string) {
    const userId = localStorage.getItem('userId'); // Récupérez l'ID de l'utilisateur depuis le localStorage
    if (userId !== null) {
        this.router.navigate([`/tabs/${onglet}`]);
    } else {
        const alert = await this.alertController.create({
            header: 'Accès refusé',
            message: 'Vous devez être connecté pour accéder à cette page.',
            buttons: [{
                text: 'OK',
                handler: () => {
                  this.router.navigate(['/tabs']);
                }
            }]
        });
        await alert.present();
    }
  }
  
  async goToProfile() {
    await this.verifierConnexion('profile');
  }
  
  async goToZikbox() {
    await this.verifierConnexion('zikbox');
  }
  
  async goToZikstore() {
    await this.verifierConnexion('zikstore');
  }

  async goToFavourites(){
    await this.verifierConnexion('favoris')
  }
  ngOnInit() {
    this.songService.currentSong$.subscribe(song => {
      if (song) {
        this.currentSong = song;
        this.sourceArray = song.sourceArray;
        console.log('Source du son dans les onglets:', this.sourceArray);
      }
    });
    this.authService.isAuthenticated().subscribe(
      (authenticated: boolean) => {
        this.isUserLoggedIn = authenticated;
      }
    );
    this.topsService.getTopSongs().subscribe(
      (response) => {
        this.topSongs = response.data;
      },
      (error) => {
        console.error('Erreur lors de la récupération des Meilleur songs :', error);
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
    const music = localStorage.getItem('music');
    if (music) {
      this.dataSon = JSON.parse(music);
    }
    this.songSubscription = this.songService.currentSong$.subscribe(song => {
      this.currentSong = song;
      if (song) {
        this.changeSong(song.url); // Supposons que vous avez une propriété 'url' pour la chanson
        this.updateDuration();
      }
    });
    console.log('leonel',this.songSubscription );
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

  chargerSonsCategorie() {
    let tableauACharger;
    
    if (this.sourceArray && this.latest.some(song => song.id === this.sourceArray)) {
      tableauACharger = this.latest;
    } else {
      tableauACharger = this.topSongs;
    }
    
    this.sonsCategorieActuelle = tableauACharger;
    this.indexSonActuel = this.sonsCategorieActuelle.findIndex(song => song.id === this.currentSong.id);
    
    if (this.indexSonActuel === -1) {
      console.error('La chanson actuelle n\'a pas été trouvée dans le tableau chargé');
      this.indexSonActuel = 0;
    }
  }

  private async stopCurrentSong(): Promise<void> {
    if (this.file) {
      try {
        await this.file.stop();
        await this.file.release();
      } catch (error) {
        alert('Erreur lors de l\'arrêt de la chanson :'+ error);
      }
      this.file = null;
    }
    this.isPlaying = false;
    this.currentTime = 0;
    this.duration = 0;
    this.stopProgressUpdater();
  }

  async next() {
    if (this.sonsCategorieActuelle.length > 0) {
      await this.stopCurrentSong();
      this.indexSonActuel = (this.indexSonActuel + 1) % this.sonsCategorieActuelle.length;
      this.currentSong = this.sonsCategorieActuelle[this.indexSonActuel];
      this.songService.setCurrentSong(this.currentSong); // Ajoutez cette ligne
      await new Promise(resolve => setTimeout(resolve, 100));
      this.play(true);
    }
  }
  sonsCategorieActuelle: any[] = [];
  indexSonActuel: number = 0;
  sourceArray!: string;

  async play(newSong: boolean = false) {
    if (!this.platform.is('cordova')) {
      console.error('Cordova n\'est pas disponible');
      return;
    }
  
    if (newSong) {
      await this.stopCurrentSong();
      this.chargerSonsCategorie();
      if (this.file) {
        await this.file.stop();
        await this.file.release();
      }
      if (this.currentSong && this.currentSong.url) {
        this.file = this.media.create(this.currentSong.url);
        await this.file.play();
        this.currentTime = 0;
        this.isPlaying = true;
        this.startProgressUpdater();
        setTimeout(() => this.updateDuration(), 1000);
      } else {
        console.error('URL de la chanson actuelle non définie');
        return;
      }
    } else {
      if (!this.file && this.currentSong && this.currentSong.url) {
        this.file = this.media.create(this.currentSong.url);
      }
  
      if (this.file) {
        if (this.isPlaying) {
          await this.pause();
        } else {
          await this.file.play();
          this.isPlaying = true;
          this.startProgressUpdater();
        }
      } else {
        console.error('Aucun fichier audio disponible pour jouer');
        return;
      }
    }
  
    musicTab.musicIsPlay = this.isPlaying;
  
    // Gestion des erreurs
    this.file.onStatusUpdate.subscribe(status => {
      if (status === 2) { // MEDIA_ERROR
        console.error('Erreur de lecture du média');
        this.isPlaying = false;
        musicTab.musicIsPlay = false;
      }
    });
  
    this.file.onSuccess.subscribe(() => {
      console.log('Lecture terminée avec succès');
      this.isPlaying = false;
      musicTab.musicIsPlay = false;
      this.stopProgressUpdater(); 
    });
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
    // Ajout de ces lignes
    if (this.file) {
      this.file.stop();
      this.file.release();
      this.file = null;
    }
    this.isPlaying = false;
    this.currentTime = 0;
    this.stopProgressUpdater();
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
      this.file.release();
      this.file = null;
      this.isPlaying = false;
      this.currentTime = 0;
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
