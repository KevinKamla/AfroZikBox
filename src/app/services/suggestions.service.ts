import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SuggestionsService {

  private baseUrl = 'https://afrozikbox.com/endpoint/common/discover?server_key=d012ab7a1e170f66e8ed63176dcc4e7b';
  private baseUrl2 = `${environment.api}/common/get-trending`
  private serverKey = environment.server_key;
  private accessToken = localStorage.getItem('accessToken');

  constructor(private http: HttpClient) { }

  getSuggestions(): Observable<any> {
    return this.http.get<any>(this.baseUrl);
  }

  getSuggestion(id: number, accessToken: string): Observable<any> {
    // Dynamisation de l'URL avec les paramètres
    const params = new HttpParams()
      .set('ids', id.toString())
      .set('server_key', this.serverKey)
      .set('access_token', this.accessToken || ''); 
    return this.http.get<any>(this.baseUrl2, { params });
  }
}
