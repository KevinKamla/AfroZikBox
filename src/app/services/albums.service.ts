import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
import { GetAlbumSongsModel, DeleteAlbumModel } from '../models/album';
import { environment } from '../../environments/environment';

interface AlbumData {
  title: string;
  description: string;
  category_id: string;
  'album-price': string;
  'album-thumbnail': string;
}

interface PurchaseData {
  user_id: number;
  'album-id': string;
  via: string;
}

interface TrendingData {
  album_limit: number;
  album_ids: number;
  album_views: string;
}
@Injectable({
  providedIn: 'root',
})
export class AlbumsService {
  private baseUrl = `${environment.api}/user/get-artists`;
  private url = `${environment.api}/get-album-songs`;
  private serverKey = environment.server_key;
  private urlGetAlbumSongs = `${environment.api}/get-album-songs`;
  private urlDeleteAlbum = `${environment.api}/delete-album`;
  private accessToken = localStorage.getItem('accessToken');
  constructor(private http: HttpClient) {}

  // getAlbums(): Observable<any> {
  //   return this.http.get<any>(this.url);
  // }
  getAlbumsr(id: number, accessToken: string): Observable<any> {
    // Dynamisation de l'URL avec les paramètres
    const params = new HttpParams()
      .set('id', id.toString())
      .set('server_key', this.serverKey)
      .set('access_token', this.accessToken || ''); 
    return this.http.get<any>(this.url, { params });
  }
  
  getAlbumSongs(
  albumId: number,
  accessToken: string
): Observable<GetAlbumSongsModel['GetAlbumSongsSuccessModel']> {
  const params = {
    id: albumId,
    server_key: this.serverKey,
    access_token: accessToken,
  };

  const headers = new HttpHeaders({
    'Content-Type': 'application/json',
  });

  console.log('URL:', this.urlGetAlbumSongs);
  console.log('Params:', params);

  return this.http.post(this.urlGetAlbumSongs, params, { headers }).pipe(
    map((response: any) => {
      console.log('Response:', response);
      if (response.status === 200) {
        return response as GetAlbumSongsModel['GetAlbumSongsSuccessModel'];
      } else {
        throw new Error(
          "Erreur lors de la récupération des chansons de l'album"
        );
      }
    }),
    catchError((error) => {
      console.error('Erreur:', error);
      return throwError(() => new Error('Erreur de la requête HTTP'));
    })
  );
}

  deleteAlbum(
    albumId: number,
    accessToken: string,
    type: string
  ): Observable<DeleteAlbumModel['DeleteAlbumSuccessModel']> {
    const params = {
      access_token: accessToken,
      id: albumId,
      type: type,
      server_key: this.serverKey,
    };

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    return this.http.post(this.urlDeleteAlbum, params, { headers }).pipe(
      map((response: any) => {
        if (response.status === 200) {
          return response as DeleteAlbumModel['DeleteAlbumSuccessModel'];
        } else {
          throw new Error("Erreur lors de la suppression de l'album");
        }
      }),
      catchError((error) => {
        console.error('Erreur:', error);
        return throwError(() => new Error('Erreur de la requête HTTP'));
      })
    );
  }

  submitAlbum(accessToken: string, albumData: AlbumData): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    });

    const body = {
      ...albumData,
      server_key: this.serverKey,
    };

    return this.http.post(`${environment.api}/submit-album`, body, { headers });
  }

  updateAlbum(
    accessToken: string,
    albumId: string,
    albumData: AlbumData
  ): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    });

    const body = {
      'album-id': albumId,
      ...albumData,
      server_key: this.serverKey,
    };

    return this.http.post(`${environment.api}/update-album`, body, { headers });
  }

  purchaseAlbum(
    accessToken: string,
    purchaseData: PurchaseData
  ): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    });

    const body = {
      ...purchaseData,
      server_key: this.serverKey,
    };

    return this.http.post(`${environment.api}/user/purchase_album`, body, {
      headers,
    });
  }

  getTrending(
    accessToken: string,
    trendingData: TrendingData
  ): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    });

    const body = {
      ...trendingData,
      server_key: this.serverKey,
    };

    return this.http.post(`${environment.api}/common/get-trending`, body, {
      headers,
    });
  }

  getArtists(): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
    });

    return this.http.get(this.baseUrl, { headers });
  }
}
