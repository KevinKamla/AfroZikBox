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
  private update = `${environment.api}/update-album`;
  private purchase = `${environment.api}/user/purchase_album`;
  private submit = `${environment.api}/submit-album?server_key=d012ab7a1e170f66e8ed63176dcc4e7b?access_token=${this.accessToken}`;
  private accesstoken = localStorage.getItem('accessToken') || '';
  private apiUrl = 'https://afrozikbox.com/endpoint/user/get-genres?server_key=d012ab7a1e170f66e8ed63176dcc4e7b';
  constructor(private http: HttpClient) {}

  getUpdateAlbum(
    accessToken: string,
    albumId: string,
    albumData: AlbumData,
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
    console.log("teguee servicesssssss")

    return this.http.post(this.update, body, { headers });
  }
  getSubmitAlbum(accessToken: string,albumData: AlbumData): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    });

    const body = {
      ...albumData,
      server_key: this.serverKey,
    };

    return this.http.post(this.submit, body, { headers });
  }
 getpurchaseAlbum(
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
  
    return this.http.post(this.purchase, body, {
      headers,
    });
  }

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


  createAlbum(title: string, description: string, albumThumbnail: File, albumPrice: number, categoryId?: number): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.accessToken}`,
    });
    // Création de l'objet FormData pour envoyer les fichiers et les autres données du formulaire
    console.log(albumThumbnail);
    
    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('album-thumbnail', albumThumbnail, albumThumbnail.name);
    formData.append('album-price', albumPrice.toString());
    formData.append('server_key', this.serverKey);
    formData.append('access_token', this.accesstoken);

    if (categoryId) {
      formData.append('category_id', categoryId.toString());
    }
    
    
    // Ajout des chansons sélectionnées
    // songs.forEach((songId, index) => {
    //   formData.append(`songs[${index}]`, songId.toString());
    // });
    formData.forEach((value, key) => {
      console.log(`${key}: ${value}`);
    });
    return this.http.post(this.submit, formData, { headers });
  }
 

  getGenres(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

  getPrices() {
    return this.http.get<any>('https://afrozikbox.com/endpoint/common/get-prices?server_key=d012ab7a1e170f66e8ed63176dcc4e7b');
  }
  
}
