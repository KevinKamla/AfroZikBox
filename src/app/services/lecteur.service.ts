import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { musicTab } from '../views/play/play.page';

@Injectable({
  providedIn: 'root',
})
export class LecteurService {
  currentSongIndex: number = 0;
  audio: HTMLAudioElement = new Audio();
  
  // BehaviorSubjects pour stocker les états de la musique
  private currentSongSubject = new BehaviorSubject<any>(null);
  private isPlayingSubject = new BehaviorSubject<boolean>(false);
  private durationSubject = new BehaviorSubject<number>(0);
  private currentTimeSubject = new BehaviorSubject<number>(0);

  // Observables pour que les composants puissent s'abonner
  currentSong$ = this.currentSongSubject.asObservable();
  isPlaying$ = this.isPlayingSubject.asObservable();
  duration$ = this.durationSubject.asObservable();
  currentTime$ = this.currentTimeSubject.asObservable();

  topSongs: any[] = [];

  // Fonction pour jouer une musique
  playMusic(item: any, index: number) {
    const songId = item.id;

    // Enregistrer les informations de la chanson dans le localStorage
    const musicInfo = { ...item, sourceArray: '' };
    localStorage.setItem('music', JSON.stringify(musicInfo));

    // Ouvrir le panneau de lecture et définir l'état de la lecture
    musicTab.isClose = false;
    musicTab.musicIsPlay = true;

    if (this.isPlayingSubject.getValue() && this.currentSongSubject.getValue()?.id !== songId) {
      // Si une autre chanson est déjà en lecture, arrêter la chanson actuelle
      this.stopCurrentMusic();
      this.loadAndPlayMusic(item.audio_location, songId);
    } else if (!this.isPlayingSubject.getValue()) {
      // Si aucune chanson n'est en lecture, démarrer la lecture
      this.loadAndPlayMusic(item.audio_location, songId);
    }

    // Mettre à jour la chanson actuelle
    this.updateCurrentSong(item);
  }

  // Charger et jouer la musique
  loadAndPlayMusic(songUrl: string, songId: any) {
    this.audio.src = songUrl;
    this.audio.load();
    this.audio.play();

    // Mettre à jour l'état de la chanson actuelle
    this.currentSongSubject.next({ id: songId, url: songUrl });
    this.isPlayingSubject.next(true);

    // Mettre à jour la durée
    this.audio.onloadedmetadata = () => {
      this.durationSubject.next(this.audio.duration);
    };

    // Mettre à jour le temps actuel
    this.audio.ontimeupdate = () => {
      this.currentTimeSubject.next(this.audio.currentTime);
    };

    // Gérer la fin de la chanson
    this.audio.onended = () => {
      this.playNextSong();
    };
  }

  // Pause la musique
  pauseMusic() {
    this.audio.pause();
    this.isPlayingSubject.next(false);
  }

  // Reprendre la musique
  resumeMusic() {
    this.audio.play();
    this.isPlayingSubject.next(true);
  }

  // Arrêter la musique
  stopCurrentMusic() {
    this.audio.pause();
    this.audio.currentTime = 0;
    this.isPlayingSubject.next(false);
  }

  // Passer à la musique suivante
  playNextSong() {
    if (this.currentSongIndex + 1 < this.topSongs.length) {
      this.currentSongIndex++;
      this.playMusic(this.topSongs[this.currentSongIndex], this.currentSongIndex);
    } else {
      console.log('Toutes les chansons ont été jouées.');
    }
  }

  // Passer à la musique précédente
  playPreviousSong() {
    if (this.currentSongIndex > 0) {
      this.currentSongIndex--;
      this.playMusic(this.topSongs[this.currentSongIndex], this.currentSongIndex);
    }
  }


  pauseCurrentMusic() {
    this.audio.pause();
  }
  // Fermer le lecteur
  closePlayer() {
    this.stopCurrentMusic();
    this.currentSongSubject.next(null);
    musicTab.isClose = true;
    console.log('Le lecteur de musique est fermé.');
  }

  // Mettre à jour la chanson actuelle
  updateCurrentSong(song: any) {
    this.currentSongSubject.next(song);
    console.log('Chanson actuelle mise à jour :', song);
  }
}
