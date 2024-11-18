import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { musicTab } from '../views/play/play.page';
// import { MusicControls } from '@ionic-native/music-controls/ngx';
import { CapacitorMusicControls } from 'capacitor-music-controls-plugin';

@Injectable({
  providedIn: 'root',
})
export class LecteurService {
  private audio: HTMLAudioElement = new Audio();

  // Méthode pour accéder à l'instance de l'audio
  public getAudioElement(): HTMLAudioElement {
    return this.audio;
  }

  private isPlayingSubject = new BehaviorSubject<boolean>(false);
  private currentSongSubject = new BehaviorSubject<any>(null);
  private durationSubject = new BehaviorSubject<number>(0);
  private currentTimeSubject = new BehaviorSubject<number>(0);
  private audioErrorSubject = new BehaviorSubject<string | null>(null);
  private isRepeatOneSubject = new BehaviorSubject<boolean>(false);
  private isShuffleSubject = new BehaviorSubject<boolean>(false);

  public isPlaying$ = this.isPlayingSubject.asObservable();
  public currentSong$ = this.currentSongSubject.asObservable();
  public duration$ = this.durationSubject.asObservable();
  public currentTime$ = this.currentTimeSubject.asObservable();
  public audioError$ = this.audioErrorSubject.asObservable();
  public isRepeatOne$ = this.isRepeatOneSubject.asObservable();
  public isShuffle$ = this.isShuffleSubject.asObservable();

  public waitingList: any[] = [];
  private currentSongIndex: number = 0;
  public topSongs: any[] = [];
  private songList: any[] = [];

  public getIsRepeatOne(): boolean {
    return this.isRepeatOneSubject.value;
  }
  constructor() {
    // Charger l'état initial de la chanson
    this.loadFromLocalStorage();

    // Gestion des événements audio
    // this.audio.ontimeupdate = () =>
    //   this.currentTimeSubject.next(this.audio.currentTime);
    // this.audio.onloadedmetadata = () =>
    //   this.durationSubject.next(this.audio.duration);
    // this.audio.onerror = () => {
    //   this.audioErrorSubject.next('Erreur lors de la lecture de la musique');
    //   this.isPlayingSubject.next(false);
    // };
    // this.audio.onended = () => {
    //   console.log('La chanson est terminée', this.isRepeatOneSubject.value);
    //   if (this.isRepeatOneSubject.value) {
    //     this.audio.currentTime = 0;
    //     this.audio.play();
    //   } else {
    //     if (this.waitingList.length > 0) {
    //       this.playFromWaitingList();
    //     } else {
    //       this.playNext(this.topSongs);
    //     }
    //   }
    // };

    // Initialiser les contrôles
    // this.loadFromLocalStorage();

    // Initialiser les événements audio
    this.initializeAudioEvents();

    // Initialiser les contrôles
    this.initializeMusicControls(this.currentSong$);
  }

  private initializeAudioEvents() {
    // Mise à jour du temps actuel de la musique
    this.audio.ontimeupdate = () =>
      this.currentTimeSubject.next(this.audio.currentTime);
    // Mise à jour de la durée de la musique
    this.audio.onloadedmetadata = () =>
      this.durationSubject.next(this.audio.duration);
    // Gestion des erreurs de lecture
    this.audio.onerror = () =>
      this.handleError('Erreur lors de la lecture de la musique');
    // Gestion de la fin de la musique
    this.audio.onended = () => this.handleSongEnd();
  }

  private handleError(message: string) {
    this.audioErrorSubject.next(message);
    this.isPlayingSubject.next(false);
  }

  private handleSongEnd() {
    // Si la chanson est en mode répétition
    if (this.isRepeatOneSubject.value) {
      this.audio.currentTime = 0;
      this.audio.play();
    } else if (this.waitingList.length > 0) {
      this.playFromWaitingList();
    } else {
      this.playNext(this.topSongs);
    }
  }

  addTowaitingList(song: any) {
    this.waitingList.push(song);
  }

  // Méthode pour initialiser et gérer les MusicControls
  initializeMusicControls(song: any) {
    console.log('Muse', song);

    const currentSong = this.currentSongSubject.value;
    // console.log(currentSong);

    if (!currentSong) {
      console.error('Aucune chanson sélectionnée pour le contrôle musical');
      return;
    }

    try {
      CapacitorMusicControls.create({
        track: song.title || 'Unknown Title', // Le titre de la chanson
        artist: song.artist || 'Unknown Artist', // L'artiste
        // album: song.album || 'Unknown Album',
        cover:
          song.thumbnail ||
          'https://afrozikbox.com/themes/default/img/logo-white.png', // L'image de couverture
        // cover can be a local path (use fullpath 'file:///storage/emulated/...',
        // or only 'my_image.jpg' if my_image.jpg is in the www folder of your app)
        // or a remote url ('http://...', 'https://...', 'ftp://...')

        // hide previous/next/close buttons:
        hasPrev: false, // show previous button, optional, default: true
        hasNext: false, // show next button, optional, default: true
        hasClose: false, // show close button, optional, default: false

        // iOS only, all optional
        duration: this.audio.duration, // Durée de la chanson
        elapsed: this.audio.currentTime,
        hasSkipForward: true, // default: false. true value overrides hasNext.
        hasSkipBackward: true, // default: false. true value overrides hasPrev.
        skipForwardInterval: 15, // default: 15.
        skipBackwardInterval: 15, // default: 15.
        hasScrubbing: true, // default: false. Enable scrubbing from control center progress bar

        // Android only, all optional
        isPlaying: true, // default : true
        dismissable: true, // default : false
        // text displayed in the status bar when the notification (and the ticker) are updated
        ticker: `Now playing "${song.title}"`,
        // All icons default to their built-in android equivalents
        // The supplied drawable name, e.g. 'media_play', is the name of a drawable found under android/res/drawable* folders
        playIcon: 'media_play',
        pauseIcon: 'media_pause',
        prevIcon: 'media_prev',
        nextIcon: 'media_next',
        closeIcon: 'media_close',
        notificationIcon: 'notification',
      })
        .then(() => {
          // Création des contrôles réussie
        })
        .catch((e) => {
          console.log(e);
        });

      // S'abonner aux événements MusicControls
      CapacitorMusicControls.addListener('controlsNotification', (action) => {
        const message = action.message;

        switch (message) {
          case 'music-controls-next':
            console.log('Next song command received');
            // this.playNext(this.topSongs);
            break;
          case 'music-controls-previous':
            console.log('Next song command received');
            // this.playPrevious(this.topSongs);
            break;
          case 'music-controls-pause':
            // this.pauseMusic();
            break;
          case 'music-controls-play':
            // this.resumeMusic();
            break;
          case 'music-controls-destroy':
            this.stopCurrentMusic();
            break;
          default:
            break;
        }
      });
    } catch (error) {
      console.error(
        'Erreur lors de la création des contrôles musicaux:',
        error
      );
    }
  }

  playFromWaitingList() {
    try {
      const song = this.waitingList.shift();
      if (this.audio.src !== song.audio_location) {
        this.stopCurrentMusic();
        this.audio.src = song.audio_location;
        this.audio.load();
      }
      this.audio
        .play()
        .then(() => {
          this.isPlayingSubject.next(true);
          this.currentSongSubject.next(song);
          this.initializeMusicControls(song);
        })
        .catch((error) => {
          this.audioErrorSubject.next('Impossible de lire la musique');
        });
    } catch (error) {
      this.audioErrorSubject.next("Une erreur s'est produite");
    }
  }

  // Méthodes pour jouer, mettre en pause, arrêter, etc.
  playMusic(song: any, index: number): void {
    try {
      if (this.audio.src !== song.audio_location) {
        this.stopCurrentMusic();
        this.audio.src = song.audio_location;
        this.audio.load();
      }
      this.audio
        .play()
        .then(() => {
          this.isPlayingSubject.next(true);
          this.currentSongSubject.next(song);
          this.currentSongIndex = index;

          this.initializeMusicControls(song);
          this.saveToLocalStorage(song, index, this.audio.currentTime);
        })
        .catch((error) => {
          this.audioErrorSubject.next('Impossible de lire la musique');
        });

      musicTab.isClose = false;
      musicTab.musicIsPlay = true;
    } catch (error) {
      this.audioErrorSubject.next("Une erreur s'est produite");
    }
  }

  playMusicAleatoire(song: any): void {
    try {
      if (this.audio.src !== song.audio_location) {
        this.stopCurrentMusic();
        this.audio.src = song.audio_location;
        this.audio.load();
      }
      this.audio
        .play()
        .then(() => {
          this.isPlayingSubject.next(true);
          this.currentSongSubject.next(song);
          // this.currentSongIndex = index;

          this.initializeMusicControls(song);
          this.saveToLocalStorageAleatoire(song, this.audio.currentTime);
        })
        .catch((error) => {
          this.audioErrorSubject.next('Impossible de lire la musique');
        });

      musicTab.isClose = false;
      musicTab.musicIsPlay = true;
    } catch (error) {
      this.audioErrorSubject.next("Une erreur s'est produite");
    }
  }
  // Charger une nouvelle liste de chansons
  loadNewPlaylist(songs: any[], startIndex: number = 0): void {
    if (songs.length > 0) {
      this.stopCurrentMusic(); // Arrêter la musique actuelle
      this.songList = songs; // Définir la nouvelle liste
      this.currentSongIndex = startIndex; // Commencer à l'index spécifié
      this.playMusic(songs[startIndex], startIndex); // Jouer la première musique de la nouvelle liste
    } else {
      console.error('La liste de chansons est vide.');
    }
  }
  // Charger une nouvelle liste de chansons aléatoire
  // Déclarer un tableau pour stocker les indices des chansons déjà jouées
  private playedSongsIndices: number[] = [];

  // Charger une nouvelle liste de chansons avec lecture aléatoire continue
  loadNewPlaylistAleatoire(songs: any[]): void {
    if (songs.length > 0) {
      this.stopCurrentMusic(); // Arrêter la musique actuelle
      this.songList = songs; // Définir la nouvelle liste
      this.playedSongsIndices = []; // Réinitialiser la liste des indices joués

      // Jouer la première chanson de manière aléatoire
      this.playRandomSong();
    } else {
      console.error('La liste de chansons est vide.');
    }
  }

  // Fonction pour jouer une chanson aléatoire
  playRandomSong(): void {
    if (this.playedSongsIndices.length === this.songList.length) {
      this.playedSongsIndices = []; // Réinitialiser lorsque toutes les chansons ont été jouées
    }

    let randomIndex;
    do {
      randomIndex = Math.floor(Math.random() * this.songList.length);
    } while (this.playedSongsIndices.includes(randomIndex));

    this.playedSongsIndices.push(randomIndex); // Ajouter l'index à la liste des chansons jouées
    this.currentSongIndex = randomIndex;
    this.playMusicAleatoire(this.songList[randomIndex]); // Jouer la chanson
  }

  // Mettre la chanson en pause
  pauseMusic(): void {
    try {
      this.audio.pause();
      this.isPlayingSubject.next(false);

      // Mettre à jour l'état dans localStorage
      this.saveToLocalStorage(
        this.currentSongSubject.value,
        this.currentSongIndex,
        this.audio.currentTime
      );
    } catch (error) {
      this.audioErrorSubject.next('Impossible de mettre en pause la musique');
      console.error('Erreur lors de la pause : ', error);
    }
  }

  // Ajoute la méthode resumeMusic pour les contrôles multimédias
  resumeMusic(): void {
    try {
      this.audio.play();
      this.isPlayingSubject.next(true);

      this.initializeMusicControls(this.currentSongSubject.value); // Appel pour initialiser les contrôles de musique
      this.saveToLocalStorage(
        this.currentSongSubject.value,
        this.currentSongIndex,
        this.audio.currentTime
      );
    } catch (error) {
      this.audioErrorSubject.next('Erreur lors de la reprise de la musique');
      console.error('Erreur lors de la reprise : ', error);
    }
  }

  // Arrêter la musique
  stopCurrentMusic(): void {
    try {
      if (!this.audio.paused) {
        this.audio.pause();
        this.audio.currentTime = 0;
        this.isPlayingSubject.next(false);

        // Mettre à jour localStorage pour indiquer que la lecture est arrêtée
        this.clearLocalStorage();
      }
    } catch (error) {
      this.audioErrorSubject.next("Impossible d'arrêter la musique");
      console.error("Erreur lors de l'arrêt de la musique : ", error);
    }
  }

  // Chercher un point spécifique dans la chanson
  seekTo(seconds: number): void {
    this.audio.currentTime = seconds;

    // Mettre à jour localStorage avec le temps actuel
    this.saveToLocalStorage(
      this.currentSongSubject.value,
      this.currentSongIndex,
      seconds
    );
  }

  // Avancer de 30 secondes
  skipForward(): void {
    this.seekTo(this.audio.currentTime + 30);
  }

  // Reculer de 10 secondes
  rewind(): void {
    this.seekTo(this.audio.currentTime - 10);
  }

  playNext(songs: any[]): void {
    try {
      if (songs.length === 0) {
        console.error('Aucune chanson disponible dans la liste');
        this.audioErrorSubject.next('Aucune chanson disponible');
        return;
      }

      let nextIndex;
      if (this.isShuffleSubject.value) {
        console.log('lecture aleatoire suivant');
        // Si le mode aléatoire est activé, sélectionner une chanson aléatoire différente de l'actuelle
        do {
          nextIndex = Math.floor(Math.random() * songs.length);
        } while (nextIndex === this.currentSongIndex && songs.length > 1); // Évite de sélectionner la même chanson si plus d'une chanson est disponible
      } else {
        // Sinon, passer à la prochaine chanson dans l'ordre
        nextIndex = this.currentSongIndex + 1;
      }

      // Si l'index dépasse le nombre de chansons disponibles, arrêter la lecture (pas de boucle)
      if (nextIndex >= songs.length) {
        console.log('Fin de la playlist');
        this.stopCurrentMusic();
        return;
      }

      const nextSong = songs[nextIndex];

      // Vérifier si la prochaine chanson a une localisation audio valide
      if (nextSong && nextSong.audio_location) {
        // Mettre à jour l'index actuel et jouer la chanson suivante
        this.playMusic(nextSong, nextIndex);
      } else {
        console.error(
          "La chanson suivante ne contient pas de 'audio_location'",
          nextSong
        );
        this.audioErrorSubject.next('La chanson suivante ne peut pas être lue');
      }
    } catch (error) {
      this.audioErrorSubject.next(
        'Erreur lors de la lecture de la chanson suivante'
      );
      console.error('Erreur lors de la lecture suivante : ', error);
    }
  }

  // // Jouer la chanson suivante
  // playNext(songs: any[]): void {
  //   try {
  //     if (songs.length === 0) {
  //       console.error('Aucune chanson disponible dans la liste');
  //       this.audioErrorSubject.next('Aucune chanson disponible');
  //       return;
  //     }

  //     let nextIndex;
  //     if (this.isShuffleSubject.value) {
  //       // Sélection aléatoire de l'index suivant
  //       nextIndex = Math.floor(Math.random() * songs.length);
  //     } else {
  //       // Calculer l'index de la prochaine chanson
  //       nextIndex = this.currentSongIndex + 1;
  //     }

  //     // Si l'index dépasse le nombre de chansons disponibles, arrêter la lecture (pas de boucle)
  //     if (nextIndex >= songs.length) {
  //       console.log('Fin de la playlist');
  //       this.stopCurrentMusic();
  //       return;
  //     }

  //     const nextSong = songs[nextIndex];

  //     // Vérifier si la prochaine chanson a une localisation audio valide
  //     if (nextSong && nextSong.audio_location) {
  //       // Mettre à jour l'index actuel et jouer la chanson suivante
  //       this.playMusic(nextSong, nextIndex);
  //     } else {
  //       console.error(
  //         "La chanson suivante ne contient pas de 'audio_location'",
  //         nextSong
  //       );
  //       this.audioErrorSubject.next('La chanson suivante ne peut pas être lue');
  //     }
  //   } catch (error) {
  //     this.audioErrorSubject.next(
  //       'Erreur lors de la lecture de la chanson suivante'
  //     );
  //     console.error('Erreur lors de la lecture suivante : ', error);
  //   }
  // }

  // Jouer la chanson précédente
  playPrevious(songs: any[]): void {
    try {
      const prevIndex =
        (this.currentSongIndex - 1 + songs.length) % songs.length;
      const prevSong = songs[prevIndex];
      this.playMusic(prevSong, prevIndex);
    } catch (error) {
      this.audioErrorSubject.next(
        'Erreur lors de la lecture de la chanson précédente'
      );
      console.error('Erreur lors de la lecture précédente : ', error);
    }
  }

  // Activer/désactiver la répétition de la chanson actuelle
  toggleRepeatOne(): void {
    console.log('toggleRepeatOne ', this.isRepeatOneSubject.value);
    this.isRepeatOneSubject.next(!this.isRepeatOneSubject.value);
  }

  // Activer/désactiver le mode aléatoire
  toggleShuffle(): void {
    this.isShuffleSubject.next(!this.isShuffleSubject.value);
  }

  getIsshuffle(): boolean {
    return this.isShuffleSubject.value;
  }

  // Fermer le lecteur de musique
  closePlayer(): void {
    this.stopCurrentMusic();
    this.currentSongSubject.next(null);
    musicTab.isClose = true;
  }

  // Sauvegarder l'état de la lecture dans localStorage
  private saveToLocalStorage(
    song: any,
    index: number,
    currentTime: number
  ): void {
    const songState = {
      song,
      index,
      currentTime,
      isPlaying: this.isPlayingSubject.value,
    };
    localStorage.setItem('currentSongState', JSON.stringify(songState));
  }

  private saveToLocalStorageAleatoire(song: any, currentTime: number): void {
    const songState = {
      song,
      currentTime,
      isPlaying: this.isPlayingSubject.value,
    };
    localStorage.setItem('currentSongState', JSON.stringify(songState));
  }
  // Charger l'état de lecture à partir de localStorage
  private loadFromLocalStorage(): void {
    const savedState = localStorage.getItem('currentSongState');
    if (savedState) {
      const { song, index, currentTime, isPlaying } = JSON.parse(savedState);
      this.playMusic(song, index);
      this.seekTo(currentTime);
      if (isPlaying) {
        this.resumeMusic();
      } else {
        this.pauseMusic();
      }
    }
  }

  // Effacer les données de localStorage
  private clearLocalStorage(): void {
    localStorage.removeItem('currentSongState');
  }
}
