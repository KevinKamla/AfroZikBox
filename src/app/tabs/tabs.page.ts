import { Component, OnInit, OnDestroy } from '@angular/core';
import { AlertController, NavController } from '@ionic/angular';
import { musicTab } from '../views/play/play.page';
import { SongsService } from 'src/app/services/songs.service';
import { BehaviorSubject, Subscription } from 'rxjs';
import { Media, MediaObject } from '@awesome-cordova-plugins/media/ngx';
import { Platform } from '@ionic/angular';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { SuggestionsService } from '../services/suggestions.service';
import { TopSongsService } from '../services/top-songs.service';
import { LecteurService } from '../services/lecteur.service';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss'],
})
export class TabsPage implements OnInit, OnDestroy {
  isUserLoggedIn: boolean = false;
  musictabOption = musicTab;
  dataSon: any;
  file: MediaObject | null = null;
  isPlaying = false;
  currentTime = 0; // Position actuelle du morceau
  duration = 0; // Durée du morceau, sera récupérée dynamiquement
  intervalId: any; // ID pour stocker l'intervalle qui met à jour la position actuelle
  newSongUrl: string = 'https://example.com/new-song.mp3'; // Assurez-vous que l'URL est correcte
  private songSubscription: Subscription | undefined;
  currentSong: any; // Ajoutez cette propriété si ce n'est pas déjà fait
  topSongs: any[] = [];
  latest: any[] = [];
  private currentTimeSubject = new BehaviorSubject<number>(0);
  constructor(
    private navCtrl: NavController,
    private songService: SongsService,
    private media: Media,
    private platform: Platform,
    private authService: AuthService,
    private alertController: AlertController,
    private router: Router,
    private topsService: TopSongsService,
    private suggestionsService: SuggestionsService,
    private musicPlayerService: LecteurService
  ) {}


  
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
    this.songService.currentSong$.subscribe((song) => {
      if (song) {
        this.currentSong = song;
        this.sourceArray = song.sourceArray;
        // console.log('Source du son dans les onglets:', this.currentSong);
      }
    });
    this.authService.isAuthenticated().subscribe((authenticated: boolean) => {
      this.isUserLoggedIn = authenticated;
    });
    this.topsService.getTopSongs().subscribe(
      (response) => {
        this.topSongs = response.data;
      },
      (error) => {
        console.error(
          'Erreur lors de la récupération des Meilleur songs :',
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
      this.dataSon = JSON.parse(music);
    }
    this.songSubscription = this.songService.currentSong$.subscribe((song) => {
      this.currentSong = song;
      if (song) {
        // this.changeSong(song.url); // Supposons que vous avez une propriété 'url' pour la chanson
        // this.updateDuration();
      }
    });
    console.log('leonel', this.currentSong);
  }

    goToPlay() {
    if (this.currentSong) {
      localStorage.setItem('music', JSON.stringify(this.currentSong));
      this.navCtrl.navigateForward('play');
    } else {
      console.error('Aucune chanson actuelle à sauvegarder');
    }
  }

    async verifierConnexion(onglet: string) {
    if (this.authService.isAuthenticated()) {
      this.router.navigate([`/tabs/${onglet}`]);
    } else {
      const alert = await this.alertController.create({
        header: 'Accès refusé',
        message: 'Vous devez être connecté pour accéder à cette page.',
        buttons: [
          {
            text: 'OK',
            handler: () => {
              this.router.navigate(['/tabs/home']);
            },
          },
        ],
      });
      await alert.present();
    }
  }

  ngOnDestroy() {
    // this.stopProgressUpdater(); // Nettoyer l'intervalle lors de la destruction du composant
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

    if (
      this.sourceArray &&
      this.latest.some((song) => song.id === this.sourceArray)
    ) {
      tableauACharger = this.latest;
    } else {
      tableauACharger = this.topSongs;
    }

    this.sonsCategorieActuelle = tableauACharger;
    this.indexSonActuel = this.sonsCategorieActuelle.findIndex(
      (song) => song.id === this.currentSong.id
    );

    if (this.indexSonActuel === -1) {
      console.error(
        "La chanson actuelle n'a pas été trouvée dans le tableau chargé"
      );
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
    // this.stopProgressUpdater();
  }

  async next() {
    if (this.sonsCategorieActuelle.length > 0) {
      await this.stopCurrentSong();
      this.indexSonActuel = (this.indexSonActuel + 1) % this.sonsCategorieActuelle.length;
      this.currentSong = this.sonsCategorieActuelle[this.indexSonActuel];
      this.songService.setCurrentSong(this.currentSong); // Ajoutez cette ligne
      await new Promise(resolve => setTimeout(resolve, 100));
      // this.play(true);
    }
  }
  sonsCategorieActuelle: any[] = [];
  indexSonActuel: number = 0;
  sourceArray!: string;



  

  currentSongIndex: number = 0;
  audio: HTMLAudioElement = new Audio();

  playMusics(song: any, index: number) {
    this.musicPlayerService.playMusic(song, index);
    musicTab.musicIsPlay = true;
  }

  stopMusic() {
    console.log('elle s\'errete');

    this.musicPlayerService.stopCurrentMusic();
    musicTab.musicIsPlay = false;
  }

  playMusic(item: any, index: number) {
    const songId = item.id;
    let sourceArray = '';
  
    // Identifier si la chanson vient de la liste "latest" ou "songs"
    // if (this.latest.some((song) => song.id === item.id)) {
    //   sourceArray = 'latest';
    // } else if (this.songs.some((song) => song.id === item.id)) {
    //   sourceArray = 'songs';
    // }
  
    // Enregistrer les informations de la chanson dans le localStorage
    const musicInfo = {
      ...item,
      sourceArray,
    };
    localStorage.setItem('music', JSON.stringify(musicInfo));
  
    // Ouvrir le panneau de lecture et définir l'état de la lecture
    musicTab.isClose = false;
    musicTab.musicIsPlay = true;
  
    if (this.isPlaying && this.currentSong !== songId) {
      // Si une autre chanson est déjà en lecture, arrêtez la chanson actuelle
      this.stopCurrentMusic();
      this.loadAndPlayMusic(item.audio_location, songId);
    } else if (!this.isPlaying) {
      // Si aucune chanson n'est en lecture, démarrez la lecture
      this.loadAndPlayMusic(item.audio_location, songId);
    }
  
    // Récupérer la durée de la musique et mettre à jour le service de chanson
    this.getAudioDuration(item.audio_location);
  
    this.songService.updateCurrentSong(item);
  }
  
  // Méthode pour récupérer la durée de la musique
  getAudioDuration(audioUrl: string) {
    const audio = new Audio(audioUrl);
  
    // L'événement "loadedmetadata" est déclenché lorsque les métadonnées audio sont chargées
    audio.addEventListener('loadedmetadata', () => {
      const duration = audio.duration;
      console.log('Durée de l\'audio en secondes:', duration);
  
      // Optionnel : convertir la durée en minutes et secondes
      const minutes = Math.floor(duration / 60);
      const seconds = Math.floor(duration % 60);
      console.log(`Durée : ${minutes}:${seconds < 10 ? '0' : ''}${seconds}`);
  
      this.seekTo(duration);
    });
  }
  

  loadAndPlayMusic(songUrl: string, songId: any) {
    this.audio.src = songUrl;
    this.audio.load();
    this.audio.play();

    // Mettre à jour l'ID de la chanson actuelle
    this.currentSong = songId;
    this.isPlaying = true;

    // Gérer la fin de la chanson pour passer à la suivante
    this.audio.onended = () => {
      this.playNextSong();
    };
  }

  stopCurrentMusic() {
    this.audio.pause();
    this.isPlaying = false;
  }

  playNextSong() {
    // Ajouter une logique pour vider le localStorage
    console.log(localStorage);

    // localStorage.clear();

    if (this.currentSongIndex + 1 < this.topSongs.length) {
      console.log(localStorage);
      this.currentSongIndex++;
      this.playMusic(
        this.topSongs[this.currentSongIndex],
        this.currentSongIndex
      );
    } else {
      console.log('Toutes les chansons ont été jouées.');
    }
  }

  playPreviousSong() {
    if (this.currentSongIndex > 0) {
      this.currentSongIndex--;
      this.playMusic(
        this.topSongs[this.currentSongIndex],
        this.currentSongIndex
      );
    }
  }

  closePlayer() {
    this.stopCurrentMusic();
    this.currentSong = null;
    musicTab.isClose = true; // Vous pouvez ajuster cette variable pour gérer l'état de fermeture
    console.log('Le lecteur de musique est fermé.');
  }
  seekTo(event: any) {
    const value = event.detail.value;
  
    // Vérifie que la valeur est un nombre fini
    if (typeof value === 'number' && isFinite(value)) {
      this.audio.currentTime = value;
      this.currentTimeSubject.next(value);
      console.log('Seek to:', value);
    } else {
      console.error('Valeur non valide pour currentTime:', value);
    }
  }
  
}


// import { Component, OnInit, OnDestroy } from '@angular/core';
// import { AlertController, NavController } from '@ionic/angular';
// import { musicTab } from '../views/play/play.page';
// import { SongsService } from 'src/app/services/songs.service';
// import { Subscription } from 'rxjs';
// import { Platform } from '@ionic/angular';
// import { AuthService } from '../services/auth.service';
// import { Router } from '@angular/router';
// import { SuggestionsService } from '../services/suggestions.service';
// import { TopSongsService } from '../services/top-songs.service';
// import { LecteurService } from '../services/lecteur.service';

// @Component({
//   selector: 'app-tabs',
//   templateUrl: 'tabs.page.html',
//   styleUrls: ['tabs.page.scss'],
// })
// export class TabsPage implements OnInit, OnDestroy {
//   isUserLoggedIn: boolean = false;
//   musictabOption = musicTab;
//   topSongs: any[] = [];
//   latest: any[] = [];
//   currentSong: any;
//   currentSongIndex: number = 0;
//   isPlaying = false;
//   audio: HTMLAudioElement = new Audio();
//   private songSubscription: Subscription | undefined;
//   dataSon: any;
//   currentTime = 0; // Position actuelle du morceau
//   duration = 0; // Durée du morceau, sera récupérée dynamiquement
//   intervalId: any; // ID pour stocker l'intervalle qui met à jour la position actuelle
//   newSongUrl: string = 'https://example.com/new-song.mp3'; // Assurez-vous que l'URL est correcte
//   sonsCategorieActuelle: any[] = [];
//   indexSonActuel: number = 0;
//   sourceArray!: string;


//   constructor(
//     private navCtrl: NavController,
//     private songService: SongsService,
//     private platform: Platform,
//     private authService: AuthService,
//     private alertController: AlertController,
//     private router: Router,
//     private topsService: TopSongsService,
//     private suggestionsService: SuggestionsService,
//     public musicPlayerService: LecteurService
//   ) {}

//   async verifierConnexion(onglet: string) {
//     if (this.authService.isAuthenticated()) {
//       this.router.navigate([`/tabs/${onglet}`]);
//     } else {
//       const alert = await this.alertController.create({
//         header: 'Accès refusé',
//         message: 'Vous devez être connecté pour accéder à cette page.',
//         buttons: [
//           {
//             text: 'OK',
//             handler: () => {
//               this.router.navigate(['/tabs/home']);
//             },
//           },
//         ],
//       });
//       await alert.present();
//     }
//   }

//   ngOnInit() {
//     this.authService.isAuthenticated().subscribe((authenticated: boolean) => {
//       this.isUserLoggedIn = authenticated;
//     });

//     this.songSubscription = this.songService.currentSong$.subscribe((song) => {
//       this.currentSong = song;
//     });

//     this.topsService.getTopSongs().subscribe(
//       (response) => {
//         this.topSongs = response.data;
//       },
//       (error) => {
//         console.error(
//           'Erreur lors de la récupération des Meilleurs songs:',
//           error
//         );
//       }
//     );

//     this.suggestionsService.getSuggestions().subscribe(
//       (response) => {
//         this.latest = response.new_releases.data;
//       },
//       (error) => {
//         console.error('Erreur lors de la récupération des suggestions:', error);
//       }
//     );
//   }

//   goToPlay() {
//     if (this.currentSong) {
//       localStorage.setItem('music', JSON.stringify(this.currentSong));
//       this.navCtrl.navigateForward('play');
//     } else {
//       console.error('Aucune chanson actuelle à sauvegarder');
//     }
//   }

//   ngOnDestroy() {
//     if (this.songSubscription) {
//       this.songSubscription.unsubscribe();
//     }
//     this.stopMusic();
//   }

//   playMusic(song: any, index: number) {
//     this.musicPlayerService.playMusic(song, index);
//     musicTab.musicIsPlay = true;
//   }

//   stopMusic() {
//     this.musicPlayerService.stopCurrentMusic();
//     musicTab.musicIsPlay = false;
//   }

//   playNextSong() {
//     if (this.currentSongIndex + 1 < this.topSongs.length) {
//       this.currentSongIndex++;
//       this.playMusic(
//         this.topSongs[this.currentSongIndex],
//         this.currentSongIndex
//       );
//     } else {
//       console.log('Toutes les chansons ont été jouées.');
//     }
//   }

//   chargerSonsCategorie() {
//     let tableauACharger;

//     if (
//       this.sourceArray &&
//       this.latest.some((song) => song.id === this.sourceArray)
//     ) {
//       tableauACharger = this.latest;
//     } else {
//       tableauACharger = this.topSongs;
//     }

//     this.sonsCategorieActuelle = tableauACharger;
//     this.indexSonActuel = this.sonsCategorieActuelle.findIndex(
//       (song) => song.id === this.currentSong.id
//     );

//     if (this.indexSonActuel === -1) {
//       console.error(
//         "La chanson actuelle n'a pas été trouvée dans le tableau chargé"
//       );
//       this.indexSonActuel = 0;
//     }
//   }

//   playPreviousSong() {
//     if (this.currentSongIndex > 0) {
//       this.currentSongIndex--;
//       this.playMusic(
//         this.topSongs[this.currentSongIndex],
//         this.currentSongIndex
//       );
//     }
//   }

//   closePlayer() {
//     this.stopMusic();
//     musicTab.isClose = true;
//   }

//   seekTo(event: any) {
//     this.musicPlayerService.seekTo(event.detail.value);
//   }
// }
