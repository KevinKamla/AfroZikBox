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

  private apiUrl = `${environment.api}/favorite-track`;


  favoriteSong(audioId: string): Observable<any> {
    const params = {
      access_token: this.accessToken,
      id: audioId,
      server_key: 'd012ab7a1e170f66e8ed63176dcc4e7b'
    };

    return this.http.post<any>(this.apiUrl, params).pipe(
      map(response => {
        const apiStatus = response.status;
        if (apiStatus === 200) {
          return response; 
        } else {
          throw new Error(response.error || 'Unknown error'); 
        }
      }),
      catchError(err => {
        console.error('Error:', err);
        return throwError(err); 
      })
    );
  }



  likeDislikeSong(audioId: string): Observable<any> {
    const params = new HttpParams()
      .set('access_token', this.accessToken || '')
      .set('id', audioId)
      .set('server_key', this.serverKey);

    return this.http.post<any>(
      `${environment.api}/like-track`,
      params
    ).pipe(
      catchError(this.handleError)
    );
  }

  dislikeTrack(audioId: string): Observable<any> {
    const params = new HttpParams()
      .set('access_token', this.accessToken || '')
      .set('id', audioId)
      .set('server_key', this.serverKey);

    return this.http.post<any>(
      `${environment.api}/dislike-track`,
      params
    ).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: any): Observable<never> {
    console.error('An error occurred:', error); // Log the error
    throw new Error(error.message || 'Server Error');
  }


  toggleFavorite(trackId: number): Observable<any> {
    if (!this.accessToken) {
      return new Observable((observer) => {
        observer.error({ status: 400, error: 'You ain\'t logged in!' });
      });
    }
    const params = new HttpParams()
      .set('access_token', this.accessToken || '')
      .set('id', trackId)
      .set('server_key', this.serverKey);
   

    return this.http.post(`${environment.api}/favorite-track`, params);
  }
}
