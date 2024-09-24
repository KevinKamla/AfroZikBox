import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { catchError, map, Observable, throwError } from 'rxjs';

import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root',
})
export class PlaylistService {
  private url = `${environment.api}/playlist/get-public-playlists?server_key=d012ab7a1e170f66e8ed63176dcc4e7b`;
  private serverKey = environment.server_key;
  private plurl = `${environment.api}/playlist/get-playlist-songs?server_key=d012ab7a1e170f66e8ed63176dcc4e7b`;

  constructor(private http: HttpClient) {}

  // getPlaylists(): Observable<any> {
  //   return this.http.get<any>(this.baseUrl);
  // }
  getPlaylists(playlistid?: string | null): Observable<any> {
    return this.http.get<any>(this.plurl);
  }

  getPublicPlayList(): Observable<{
    success?: any;
    sessionError?: any;
    error?: any;
  }> {
    // if (!accessToken) {
    //   return throwError(() => new Error('Token d\'accès est null'));
    // }

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    const params = new HttpParams().set('server_key', this.serverKey);
    console.log(params);

    return this.http.post(this.url, { headers: headers }).pipe(
      map((response: any) => {
        const apiStatus = response.status;

        if (apiStatus === 200) {
          const result = response;
          return { success: result };
        } else {
          const result = response;
          return { sessionError: result };
        }
      }),
      catchError((error: any) => {
        return throwError(() => error);
      })
    );
  }

  getPlayListSongs(
    playlistId: number,
    accessToken: string
  ): Observable<{
    success?: any;
    sessionError?: any;
    error?: any;
  }> {
    const params = {
      access_token: accessToken,
      id: playlistId,
    };

    return this.http.post(`https://afrozikbox.com/endpoint/playlist/get-playlist-songs?id=${playlistId}&server_key=d012ab7a1e170f66e8ed63176dcc4e7b`, params).pipe(
      map((response: any) => {
        console.log(response);
        
        const apiStatus = response.status;

        if (apiStatus === 200) {
          const result =
            response ;
          return { success: result };
        } else {
          const result = response;
          return { sessionError: result };
        }
      }),
      catchError((error: any) => {
        return throwError(() => error);
      })
    );
  }
}
