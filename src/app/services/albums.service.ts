import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AlbumsService {

  private baseUrl = `${environment.api}/user/get-artists`;
  private url =`${environment.api}/get-album-songs`
  private serverKey = environment.server_key;

  constructor(private http: HttpClient) { }

  // getAlbums(): Observable<any> {
  //   return this.http.get<any>(this.url);
  // }
  getAlbum(id: number, accessToken: string): Observable<any> {
    // Dynamisation de l'URL avec les paramètres
    const params = new HttpParams()
      .set('id', id.toString())
      .set('server_key', this.serverKey)
      .set('access_token', accessToken);

    return this.http.get<any>(this.baseUrl, { params });
  }
}
