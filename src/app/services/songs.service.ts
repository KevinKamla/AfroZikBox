import { Injectable } from '@angular/core';
import { Media, MediaObject } from '@awesome-cordova-plugins/media/ngx';
import { Platform } from '@ionic/angular';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SongsService {
  
  songFile!: MediaObject;

  constructor(private media: Media, private platform: Platform, private http:HttpClient) {}

  private currentSongSubject = new BehaviorSubject<any>(null);
  currentSong$ = this.currentSongSubject.asObservable();
  private isPlayingSource = new BehaviorSubject<boolean>(false);
  isPlaying$ = this.isPlayingSource.asObservable();

  setPlaying(playing: boolean) {
    this.isPlayingSource.next(playing);
  }

  updateCurrentSong(song: any) {
    this.currentSongSubject.next(song);
  }
  setCurrentSong(song: any) {
    this.currentSongSubject.next(song);
  }
}