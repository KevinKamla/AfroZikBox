import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GenresService {

  private baseUrl = ' https://afrozikbox.com/endpoint/user/get-genres?server_key=d012ab7a1e170f66e8ed63176dcc4e7b';
  private serverKey = environment.server_key;
  private accessToken = localStorage.getItem('accessToken');
  private track = `${environment.api}/get-tracks-by-genres`;

  constructor(private http: HttpClient) { }

  getGenre(genreId?: string | null): Observable<any> {
    return this.http.get<any>(this.baseUrl);
  }
  getTrackGenre(id: number, accessToken: string): Observable<any> {
    // Dynamisation de l'URL avec les paramètres
    const params = new HttpParams()
      .set('id', id.toString())
      .set('server_key', this.serverKey)
      .set('access_token', this.accessToken || ''); 
    return this.http.get<any>(this.track, { params });
  }
}
