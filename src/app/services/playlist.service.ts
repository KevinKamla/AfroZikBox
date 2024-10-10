import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import {
  BehaviorSubject,
  catchError,
  map,
  Observable,
  shareReplay,
  throwError,
} from 'rxjs';

import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root',
})
export class PlaylistService {
  private url = `${environment.api}/playlist/get-public-playlists?server_key=d012ab7a1e170f66e8ed63176dcc4e7b`;
  private serverKey = environment.server_key;
  private plurl = `${environment.api}/playlist/get-playlist-songs?server_key=d012ab7a1e170f66e8ed63176dcc4e7b`;
  private apiUrl = `${environment.api}/playlist/add-to-playlist`;
  private apiUrldel = `${environment.api}/playlist/delete-playlist`;
  private accessToken = localStorage.getItem('accessToken') || '';
  private playlistsSubject = new BehaviorSubject<any[]>([]);
  playlists$ = this.playlistsSubject.asObservable().pipe(shareReplay(1));

  constructor(private http: HttpClient) {}

  // getPlaylists(): Observable<any> {
  //   return this.http.get<any>(this.baseUrl);
  // }
  getPlaylists(playlistid?: string | null): Observable<any> {
    return this.http.get<any>(this.plurl);
  }

  // getPlaylists(): Observable<any[]> {
  //   return this.http.get<any[]>(this.plurl).pipe(
  //     map(playlists => {
  //       this.playlistsSubject.next(playlists); // Mettre à jour le sujet avec la nouvelle liste
  //       return playlists;
  //     }),
  //     catchError(error => {
  //       console.error("Erreur lors de la récupération des playlists :", error);
  //       return throwError(() => error);
  //     })
  //   );
  // }

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

  getMyPlayList(): Observable<{
    success?: any;
    sessionError?: any;
    error?: any;
    playlists?: any[]; // Ajout d'une propriété playlists pour une meilleure lisibilité
  }> {
    const u = localStorage.getItem('UserData');
    let userId: number | undefined;
    if (u) {
      try {
        const UserData = JSON.parse(u);
        userId = UserData.id;
      } catch (error) {
        console.error('Erreur lors du parsing de UserData:', error);
        return throwError(
          () =>
            new Error('Erreur lors de la récupération des données utilisateur.')
        );
      }
    }

    if (!userId) {
      return throwError(() => new Error('Utilisateur non connecté'));
    }

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    return this.http
      .post(
        this.url,
        { headers },
        { params: new HttpParams().set('server_key', this.serverKey) }
      )
      .pipe(
        map((response: any) => {
          const apiStatus = response.status;

          if (apiStatus === 200) {
            // Gestion robuste des données
            const playlists = response.success?.playlists || []; // Gestion des données manquantes
            const filteredPlaylists = playlists.filter(
              (playlist: any) => playlist.publisher?.id === userId
            ); // Gestion des données manquantes
            return { success: true, playlists: filteredPlaylists };
          } else {
            return { sessionError: response };
          }
        }),
        catchError((error: any) => {
          console.error('Erreur HTTP:', error); // Log pour le débogage
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

    return this.http
      .post(
        `https://afrozikbox.com/endpoint/playlist/get-playlist-songs?id=${playlistId}&server_key=d012ab7a1e170f66e8ed63176dcc4e7b`,
        params
      )
      .pipe(
        map((response: any) => {
          console.log(response);

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

  // addToPlaylist(
  //   trackId: number,
  //   accessToken: string,
  //   playlistIdString: number
  // ): Observable<any> {
  //   const headers = new HttpHeaders({
  //     'Content-Type': 'application/json',
  //   });

  //   const params = {
  //     access_token: accessToken,
  //     id: trackId,
  //     playlists: playlistIdString,
  //     server_key: this.serverKey,
  //   };

  //   return this.http.post(this.apiUrl, params, { headers });
  // }

  addToPlaylist(playlists: any, songId: any): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.accessToken}`,
      'Content-Type': 'application/json',
    });
    console.log(1223);
    
    // Si playlists est une chaîne, la convertir en tableau
    // if (typeof playlists === 'string') {
    //   playlists = [playlists];
    // }

    const params = new HttpParams()
      .set('playlists', playlists.toString())
      .set('id', songId.toString())
      .set('server_key', this.serverKey)
      .set('access_token', this.accessToken);

    return this.http.post(this.apiUrl, params);
  }

  createPlaylist(name: string, privacy: number, avatar: File): Observable<any> {
    let accessToken = localStorage.getItem('accessToken') || '';

    const formData = new FormData();
    formData.append('name', name);
    formData.append('privacy', privacy.toString());
    formData.append('avatar', avatar);
    formData.append('server_key', this.serverKey);
    formData.append('access_token', accessToken);

    const headers = new HttpHeaders({
      Authorization: `Bearer ${accessToken}`,
    });

    return this.http
      .post(`${environment.api}/playlist/create`, formData, { headers })
      .pipe(
        map((response) => {
          // Assurez-vous que la réponse contient les données de la nouvelle playlist
          const newPlaylist = response;
          this.playlistsSubject.next([
            ...this.playlistsSubject.value,
            newPlaylist,
          ]);
          return response;
        }),
        catchError((error) => {
          console.error('Erreur lors de la création de la playlist :', error);
          return throwError(() => error);
        })
      );
  }

  deletePlaylist(
    playlistId: number
  ): Observable<{ success?: any; sessionError?: any; error?: any }> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    let accessToken = localStorage.getItem('accessToken') || '';
    const params = new HttpParams()
      .set('access_token', accessToken)
      .set('id', playlistId.toString())
      .set('server_key', this.serverKey);
    console.log(params);

    return this.http.post(this.apiUrldel, params).pipe(
      map((response: any) => {
        const apiStatus = response.status;

        if (apiStatus === 200) {
          // Mapping de la réponse vers DeletePlaylistSuccessModel
          return { success: response };
        } else {
          // Mapping de la réponse vers SessionErrorModel
          return { sessionError: response };
        }
      }),
      catchError((error: any) => {
        console.error('Erreur lors de la suppression de la playlist:', error);
        return throwError(() => error);
      })
    );
  }
}
