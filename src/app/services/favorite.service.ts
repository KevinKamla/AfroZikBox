import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { catchError, map, Observable, throwError } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FavoriteService {
  constructor(private http: HttpClient) { }
  private baseUrl2 = `${environment.api}/user/get-favourites`
  private serverKey = environment.server_key;
  private accessToken = localStorage.getItem('accessToken');
 
  getFavorites(id: number, accessToken: string): Observable<any> {
    const params = new HttpParams()
      .set('server_key', this.serverKey)
      .set('access_token', this.accessToken || '')      
      .set('id', id.toString()); 
    return this.http.get<any>(this.baseUrl2, { params });
  }
}
