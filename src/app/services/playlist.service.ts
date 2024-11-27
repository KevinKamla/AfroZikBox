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
import { Song } from '../models/song';
import { LecteurService } from './lecteur.service';
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
  avatarFile: any;

  constructor(
    private http: HttpClient,
    private musicPlayerService: LecteurService
  ) {}

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
    playlists?: any[];
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
    const params = new HttpParams()
      .set('playlists', playlists.toString())
      .set('id', songId.toString())
      .set('server_key', this.serverKey)
      .set('access_token', this.accessToken);

    return this.http.post<any>(this.apiUrl, params).pipe(
      catchError((error) => {
        console.error('Error adding to playlist:', error);
        // Handle the error appropriately (e.g., display a message to the user)
        return throwError(() => new Error('Failed to add to playlist'));
      })
    );
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
          return { success: response };
        } else {
          return { sessionError: response };
        }
      }),
      catchError((error: any) => {
        console.error('Erreur lors de la suppression de la playlist:', error);
        return throwError(() => error);
      })
    );
  }

  updatePlaylist(
    playlistId: number,
    name: string,
    privacy: number,
    avatar: any
  ): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.accessToken}`,
    });
    let accessToken = localStorage.getItem('accessToken') || '';
    const formData = new FormData();
    formData.append('id', playlistId.toString());
    formData.append('name', name);
    formData.append('privacy', privacy.toString());
    formData.append('server_key', this.serverKey);
    formData.append('access_token', accessToken);
    if (avatar) {
      formData.append('avatar', avatar, avatar.name);
    }

    return this.http.post(this.apiUrl, formData, { headers });
  }

  // gestion de la playlist
  loadplaylist(playlist: any, index: number) {
    // console.log('load playlist' + index)
    localStorage.setItem('playlist', JSON.stringify(playlist));
    localStorage.setItem('indexsong', JSON.stringify(index));
  }
  loadplaylistAleatoire(playlist: any) {
    // console.log('load playlist' + index)
    localStorage.setItem('playlist', JSON.stringify(playlist));
  }

  updateindex(index: number) {
    localStorage.setItem('indexsong', JSON.stringify(index));
  }

  // getnextsong(): any {
  //   let a = localStorage.getItem('indexsong');
  //   let data = localStorage.getItem('playlist');
  //   if (data && a) {
  //     let playlist = JSON.parse(data);
  //     let index = parseInt(a);
  //     // console.log('play index :' + index +' sur ' + playlist.length)
  //     if (index + 1 < playlist.length) {
  //       // console.log('next song ' + playlist[index + 1])
  //       this.updateindex(index + 1); // Mise à jour de l'index ici
  //       return playlist[index + 1];
  //     } else {
  //       // Il n'y a pas de chanson suivante
  //       // tu peux aussi ajouter une verification sur l'etat du mode de lecture et retourner le meme song ou la 1ere chanson de la playlist
  //       this.updateindex(0);
  //       return playlist[0]; // j'ai decider de recommencer la playlist
  //     }
  //   }
  //   // Si la playlist n'est pas chargée ou n'existe pas, renvoyer null
  //   return null;
  // }

  getnextsong(): any {
    const isShuffleEnabled = this.musicPlayerService.getIsshuffle();
    const savedIndex = localStorage.getItem('indexsong');
    const savedPlaylist = localStorage.getItem('playlist');

    if (savedPlaylist && savedIndex) {
      const playlist = JSON.parse(savedPlaylist);
      const currentIndex = parseInt(savedIndex, 10);

      if (isShuffleEnabled) {
        // Mode aléatoire activé, choisir une chanson aléatoire
        let randomIndex;
        do {
          randomIndex = Math.floor(Math.random() * playlist.length);
        } while (randomIndex === currentIndex && playlist.length > 1); // Assurez-vous qu'une autre chanson est choisie, si possible

        this.updateindex(randomIndex); // Mise à jour de l'index
        return playlist[randomIndex];
      } else {
        // Mode séquentiel
        if (currentIndex + 1 < playlist.length) {
          // Passer à la chanson suivante
          this.updateindex(currentIndex + 1);
          return playlist[currentIndex + 1];
        } else {
          // Redémarrer la playlist depuis le début
          this.updateindex(0);
          return playlist[0];
        }
      }
    }

    // Si la playlist n'est pas chargée ou n'existe pas, renvoyer null
    return null;
  }

  // getprevsong(): any {
  //   let a = localStorage.getItem('indexsong');
  //   let data = localStorage.getItem('playlist');
  //   if (data && a) {
  //     let playlist = JSON.parse(data);
  //     let index = parseInt(a);
  //     // console.log('play index :' + index +' sur ' + playlist.length)
  //     if (index - 1 >= 0) {
  //       // console.log('next song ' + playlist[index - 1])
  //       this.updateindex(index - 1); // Mise à jour de l'index ici
  //       return playlist[index - 1];
  //     } else {
  //       // Il n'y a pas de chanson suivante
  //       // tu peux aussi ajouter une verification sur l'etat du mode de lecture et retourner le meme song ou la 1ere chanson de la playlist
  //       this.updateindex(playlist.length);
  //       return playlist[playlist.length - 1]; // j'ai decider de passer le dernier song de la playlist
  //     }
  //   }
  //   // Si la playlist n'est pas chargée ou n'existe pas, renvoyer null
  //   return null;
  // }

  getprevsong(): any {
    const isShuffleEnabled = this.musicPlayerService.getIsshuffle();
    const savedIndex = localStorage.getItem('indexsong');
    const savedPlaylist = localStorage.getItem('playlist');

    if (savedPlaylist && savedIndex) {
      const playlist = JSON.parse(savedPlaylist);
      const currentIndex = parseInt(savedIndex, 10);

      if (isShuffleEnabled) {
        // Mode aléatoire activé, choisir une chanson aléatoire
        let randomIndex;
        do {
          randomIndex = Math.floor(Math.random() * playlist.length);
        } while (randomIndex === currentIndex && playlist.length > 1); // Évite de sélectionner la même chanson si possible

        this.updateindex(randomIndex); // Mise à jour de l'index
        return playlist[randomIndex];
      } else {
        // Mode séquentiel
        if (currentIndex - 1 >= 0) {
          // Passer à la chanson précédente
          this.updateindex(currentIndex - 1);
          return playlist[currentIndex - 1];
        } else {
          // Passer à la dernière chanson si on est au début de la playlist
          this.updateindex(playlist.length - 1);
          return playlist[playlist.length - 1];
        }
      }
    }

    // Si la playlist n'est pas chargée ou n'existe pas, renvoyer null
    return null;
  }
}
