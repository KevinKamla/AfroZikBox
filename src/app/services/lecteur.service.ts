import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { musicTab } from '../views/play/play.page';
import { MusicControls } from '@awesome-cordova-plugins/music-controls/ngx';

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

  private currentSongIndex: number = 0;
  public topSongs: any[] = [];
  private songList: any[] = [];

  constructor(private musicControls: MusicControls) {
    // Charger l'état initial de la chanson
    this.loadFromLocalStorage();

    // Gestion des événements audio
    this.audio.ontimeupdate = () =>
      this.currentTimeSubject.next(this.audio.currentTime);
    this.audio.onloadedmetadata = () =>
      this.durationSubject.next(this.audio.duration);
    this.audio.onerror = () => {
      this.audioErrorSubject.next('Erreur lors de la lecture de la musique');
      this.isPlayingSubject.next(false);
    };
    this.audio.onended = () => {
      if (this.isRepeatOneSubject.value) {
        this.audio.currentTime = 0;
        this.audio.play();
      } else {
        this.playNext(this.topSongs);
      }
    };

    // Initialiser les contrôles
    this.initializeMusicControls();
  }

  // Méthode pour initialiser et gérer les MusicControls
  initializeMusicControls() {
    const currentSong = this.currentSongSubject.value;
    if (!currentSong) return;

    this.musicControls.create({
      track: currentSong?.title,
      artist: currentSong?.artist,
      cover: currentSong?.thumbnail,
      isPlaying: true,
      dismissable: true,
      hasPrev: true,
      hasNext: true,
      hasClose: true,
    });

    // S'abonner aux événements de MusicControls
    this.musicControls.subscribe().subscribe((action) => {
      const message = action.message;

      switch (message) {
        case 'music-controls-next':
          this.playNext(this.topSongs);
          break;
        case 'music-controls-previous':
          this.playPrevious(this.topSongs);
          break;
        case 'music-controls-pause':
          this.pauseMusic();
          break;
        case 'music-controls-play':
          this.resumeMusic();
          break;
        case 'music-controls-destroy':
          this.stopCurrentMusic();
          break;
        default:
          break;
      }
    });
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

          this.initializeMusicControls();
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

      this.initializeMusicControls(); // Appel pour initialiser les contrôles de musique
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

  // Jouer la chanson suivante
  playNext(songs: any[]): void {
    try {
      if (songs.length === 0) {
        console.error('Aucune chanson disponible dans la liste');
        this.audioErrorSubject.next('Aucune chanson disponible');
        return;
      }

      let nextIndex;
      if (this.isShuffleSubject.value) {
        // Sélection aléatoire de l'index suivant
        nextIndex = Math.floor(Math.random() * songs.length);
      } else {
        // Calculer l'index de la prochaine chanson
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
    this.isRepeatOneSubject.next(!this.isRepeatOneSubject.value);
  }

  // Activer/désactiver le mode aléatoire
  toggleShuffle(): void {
    this.isShuffleSubject.next(!this.isShuffleSubject.value);
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
