import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ArtistService {

  private baseUrl = 'https://afrozikbox.com/endpoint/user/get-artists?server_key=d012ab7a1e170f66e8ed63176dcc4e7b';
  private baseUrl2 = `${environment.api}/user/get-artists`
  private serverKey = environment.server_key;
  private accessToken = localStorage.getItem('accessToken');

  constructor(private http: HttpClient) { }

  getArtists(): Observable<any> {
    return this.http.get<any>(this.baseUrl);
  }
  getArtist( accessToken: string): Observable<any> {
    // Dynamisation de l'URL avec les paramètres
    const params = new HttpParams()
      .set('server_key', this.serverKey)
      .set('access_token', this.accessToken || ''); 
    return this.http.get<any>(this.baseUrl2, { params });
  }
}
