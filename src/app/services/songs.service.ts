import { Injectable } from '@angular/core';
import { Media, MediaObject } from '@awesome-cordova-plugins/media/ngx';
import { Platform } from '@ionic/angular';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SongsService {
  
  songFile!: MediaObject;

  constructor(private media: Media, private platform: Platform, private http:HttpClient) {}

  playSong(songUrl: string) {
    this.platform.ready().then(() => {
      this.songFile = this.media.create(songUrl);
      this.songFile.play();  
    });
  }

  stopSong() {
    if (this.songFile) {
      this.songFile.stop(); 
    }
  }

  fetchTopSongs() {
    const apiUrl = 'https://afrozikbox.com/endpoint/common/discover?server_key=d012ab7a1e170f66e8ed63176dcc4e7b';
    this.http.post(apiUrl, {
      access_token: 'your-access-token',
      server_key: 'your-server-key',
      limit: 1,
      offset: 0
    }).subscribe((data: any) => {
      const songUrl = data.new_releases.data[0].audio_location;
      console.log("url audio", songUrl);
      this.playSong(songUrl);
    });
  }
  
}
