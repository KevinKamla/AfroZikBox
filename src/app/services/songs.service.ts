import { Injectable } from '@angular/core';
import { Media, MediaObject } from '@awesome-cordova-plugins/media/ngx';
import { Platform } from '@ionic/angular';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, catchError, Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SongsService {
  songFile!: MediaObject;
  private serverKey = environment.server_key;
  private apiUrl= 'https://afrozikbox.com/endpoint/submit-song';
  private accessToken = localStorage.getItem('accessToken');
  private submitsong = `${environment.api}/submit-song`;

  constructor(
    private media: Media,
    private platform: Platform,
    private http: HttpClient
  ) {}

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

  /**
   * Upload a new song
   * @param formData Form data containing song details
   * @returns Observable with API response
   */
  uploadSong(formData: FormData): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    formData.append('server_key', this.serverKey);
    formData.append('access_token', this.accessToken || '');

    return this.http.post(this.submitsong, formData,).pipe(
      catchError((error) => {
        console.error('Error uploading song:', error);
        return throwError(error);
      })
    );
  }
}
