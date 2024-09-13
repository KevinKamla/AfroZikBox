import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class PlaylistService {

  private baseUrl = 'https://afrozikbox.com/endpoint/playlist/get-public-playlists?server_key=d012ab7a1e170f66e8ed63176dcc4e7b&id=319&access_token=f3a1bfda3445abce1047b9850837f3611c606e6417259932833937dbfda401692f8255ce99dcaaa806';

  constructor(private http: HttpClient) { }

  // getPlaylists(): Observable<any> {
  //   return this.http.get<any>(this.baseUrl);
  // }
  getPlaylists(playlistid?: string | null): Observable<any> {
    return this.http.get<any>(this.baseUrl);
  }
}
