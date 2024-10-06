import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { musicTab } from '../views/play/play.page';

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

  public isPlaying$ = this.isPlayingSubject.asObservable();
  public currentSong$ = this.currentSongSubject.asObservable();
  public duration$ = this.durationSubject.asObservable();
  public currentTime$ = this.currentTimeSubject.asObservable();
  public audioError$ = this.audioErrorSubject.asObservable();

  private currentSongIndex: number = 0;
  public topSongs: any[] = [];
  private songList: any[] = [];

  constructor() {
    // Charger la dernière chanson jouée à partir de localStorage au démarrage
    this.loadFromLocalStorage();

    // Mise à jour du temps actuel et de la durée pendant la lecture
    this.audio.ontimeupdate = () => {
      this.currentTimeSubject.next(this.audio.currentTime);
    };

    this.audio.onloadedmetadata = () => {
      this.durationSubject.next(this.audio.duration);
    };

    // Gestion des erreurs
    this.audio.onerror = () => {
      this.audioErrorSubject.next('Erreur lors de la lecture de la musique');
      console.error('Erreur de lecture : ', this.audio.error);
      this.isPlayingSubject.next(false);
    };

    // Déclencher la lecture de la chanson suivante lorsque la chanson actuelle se termine
    console.log(this.topSongs);
    this.audio.onended = () => {
      this.playNext(this.topSongs); // Assurez-vous que la liste des chansons est passée ici
    };
  }

  // Méthode pour charger une nouvelle liste de chansons
  loadNewPlaylist(songs: any[], startIndex: number = 0): void {
    if (songs.length > 0) {
      this.stopCurrentMusic();  // Arrêter la musique actuelle
      this.songList = songs;  // Définir la nouvelle liste
      this.currentSongIndex = startIndex;  // Commencer à l'index spécifié
      this.playMusic(songs[startIndex], startIndex);  // Jouer la première musique de la nouvelle liste
    } else {
      console.error('La liste de chansons est vide.');
    }
  }
  // Jouer une chanson
  playMusic(song: any, index: number): void {
    try {
      if (this.audio.src !== song.audio_location) {
        this.stopCurrentMusic(); // Arrêter la chanson précédente
        this.audio.src = song.audio_location;
        this.audio.load();
      }
      this.audio
        .play()
        .then(() => {
          this.isPlayingSubject.next(true);
          this.currentSongSubject.next(song);
          this.currentSongIndex = index;

          // Sauvegarder l'état dans localStorage
          this.saveToLocalStorage(song, index, this.audio.currentTime);
        })
        .catch((error) => {
          this.audioErrorSubject.next('Impossible de lire la musique');
          console.error('Erreur lors du démarrage de la lecture : ', error);
        });

      // Ouvrir le panneau de lecture
      musicTab.isClose = false;
      musicTab.musicIsPlay = true;
    } catch (error) {
      this.audioErrorSubject.next("Une erreur s'est produite");
      console.error('Erreur générale : ', error);
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

  // Reprendre la chanson
  resumeMusic(): void {
    try {
      this.audio.play();
      this.isPlayingSubject.next(true);

      // Mettre à jour l'état dans localStorage
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

  // Jouer la chanson suivante
  // Jouer la chanson suivante
  playNext(songs: any[]): void {
    try {
      if (songs.length === 0) {
        console.error('Aucune chanson disponible dans la liste');
        this.audioErrorSubject.next('Aucune chanson disponible');
        return;
      }

      // Calculer l'index de la prochaine chanson
      const nextIndex = this.currentSongIndex + 1;

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
    localStorage.setItem('musicState', JSON.stringify(songState));
  }

  // Charger l'état de lecture à partir de localStorage
  private loadFromLocalStorage(): void {
    const savedState = localStorage.getItem('musicState');
    if (savedState) {
      const { song, index, currentTime, isPlaying } = JSON.parse(savedState);
      this.currentSongSubject.next(song);
      this.currentSongIndex = index;
      this.audio.src = song.audio_location;
      this.audio.currentTime = currentTime;

      // Si l'état était en lecture, reprendre la chanson
      if (isPlaying) {
        this.resumeMusic();
      } else {
        this.isPlayingSubject.next(false);
      }
    }
  }

  // Effacer les données de lecture dans localStorage
  private clearLocalStorage(): void {
    localStorage.removeItem('musicState');
  }

  public setSongList(songs: any[]) {
    this.songList = songs;
  }
}
