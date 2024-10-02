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

  playMusic(item: any, index: number) {
    const songId = item.id;
    let sourceArray = '';

    // Enregistrer les informations de la chanson dans le localStorage
    const musicInfo = { ...item, sourceArray };
    localStorage.setItem('music', JSON.stringify(musicInfo));

    // Ouvrir le panneau de lecture et définir l'état de la lecture
    musicTab.isClose = false;
    musicTab.musicIsPlay = true;

    if (this.isPlayingSubject.getValue() && this.currentSongSubject.getValue()?.id !== songId) {
      // Si une autre chanson est déjà en lecture, arrêtez la chanson actuelle
      this.stopCurrentMusic();
      this.loadAndPlayMusic(item.audio_location, songId);
    } else if (!this.isPlayingSubject.getValue()) {
      // Si aucune chanson n'est en lecture, démarrez la lecture
      this.loadAndPlayMusic(item.audio_location, songId);
    }

    this.updateCurrentSong(item);
  }

  loadAndPlayMusic(songUrl: string, songId: any) {
    this.audio.src = songUrl;
    this.audio.load();
    this.audio.play();

    // Mettre à jour l'ID de la chanson actuelle via BehaviorSubject
    this.currentSongSubject.next({ id: songId, url: songUrl });
    this.isPlayingSubject.next(true);

    // Mettre à jour la durée de la chanson via BehaviorSubject
    this.audio.onloadedmetadata = () => {
      this.durationSubject.next(this.audio.duration);
    };

    // Mettre à jour le temps actuel via BehaviorSubject
    this.audio.ontimeupdate = () => {
      this.currentTimeSubject.next(this.audio.currentTime);
    };

    // Gérer la fin de la chanson pour passer à la suivante
    this.audio.onended = () => {
      this.playNextSong();
    };
  }

  pauseMusic() {
    this.audio.pause();
    this.isPlayingSubject.next(false);
  }

  resumeMusic() {
    this.audio.play();
    this.isPlayingSubject.next(true);
  }

  stopCurrentMusic() {
    this.audio.pause();
    this.audio.currentTime = 0;
    this.isPlayingSubject.next(false);
  }

  seekTo(time: number) {
    this.audio.currentTime = time;
    this.currentTimeSubject.next(time);
  }

  playNextSong() {
    if (this.currentSongIndex + 1 < this.topSongs.length) {
      this.currentSongIndex++;
      this.playMusic(this.topSongs[this.currentSongIndex], this.currentSongIndex);
    } else {
      console.log('Toutes les chansons ont été jouées.');
    }
  }

  playPreviousSong() {
    if (this.currentSongIndex > 0) {
      this.currentSongIndex--;
      this.playMusic(this.topSongs[this.currentSongIndex], this.currentSongIndex);
    }
  }

  closePlayer() {
    this.stopCurrentMusic();
    this.currentSongSubject.next(null);
    musicTab.isClose = true;
    console.log('Le lecteur de musique est fermé.');
  }

  updateCurrentSong(song: any) {
    this.currentSongSubject.next(song);
    console.log('Chanson actuelle mise à jour :', song);
  }
}
