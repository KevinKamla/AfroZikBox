import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FollowService {
  private remove = `${environment.api}/follow-user/remove`;
  private add = `${environment.api}/follow-user/add`;
  private accessToken = localStorage.getItem('accessToken');
  private serverKey = environment.server_key;
  private baseUrl2 = `${environment.api}user/get-follower`;
  

  constructor(private http: HttpClient) {}

  // Ajouter un abonnement (follow)
  followUser(userId: number): Observable<any> {
    console.log(userId);
    
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + localStorage.getItem('accessToken') 
    });
    const params = new HttpParams()
      .set('server_key', this.serverKey)
      .set('access_token', this.accessToken || '')
      .set('id', userId.toString());
   

    return this.http.post<any>(this.add, params, { headers })
      .pipe(
        catchError(error => {
          console.error('Erreur lors de l\'ajout du follow', error);
          return throwError(error);
        })
      );
  }

  // Retirer un abonnement (unfollow)
  unfollowUser(userId: number): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + localStorage.getItem('accessToken')
    });

    const params = new HttpParams()
      .set('server_key', this.serverKey)
      .set('access_token', this.accessToken || '')
      .set('id', userId.toString());

    return this.http.post<any>(this.remove, params, { headers })
      .pipe(
        catchError(error => {
          console.error('Erreur lors de la suppression du follow', error);
          return throwError(error);
        })
      );
  }

  getFollowers(id: number) {
    const params = new HttpParams()
      .set('server_key', this.serverKey)
      .set('access_token', this.accessToken || '')
      .set('id', id.toString());
    return this.http.get<any>(this.baseUrl2, { params });
  }
}
