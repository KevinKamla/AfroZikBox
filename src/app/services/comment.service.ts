import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  private getcomment = `${environment.api}/get-comment`;
  private registercomment = `${environment.api}/register-comment`;
  private unlikecomment = `${environment.api}/unlike-comment`;

  private accessToken = localStorage.getItem('accessToken');
  private serverKey = environment.server_key;
  constructor(private http: HttpClient) { }

  getComments(TrackId: number): Observable<any> {
    const params = new HttpParams()
      .set('server_key', this.serverKey)
      .set('access_token', this.accessToken || '')
      .set('id',TrackId)
      .set('offset',5)
      .set('limit',3)
    return this.http.get<any>(this.getcomment, { params });
  }
  getRegisterComments(TrackId: number,TimePercentage:number,Value:number): Observable<any> {
    const params = new HttpParams()
      .set('server_key', this.serverKey)
      .set('access_token', this.accessToken || '')
      .set('id',TrackId)
      .set('timePercentage',TimePercentage)
      .set('value',Value)
    return this.http.get<any>(this.registercomment, { params });
  }
  getUnlikeComments(id: number,text:number): Observable<any> {
    const params = new HttpParams()
      .set('server_key', this.serverKey)
      .set('access_token', this.accessToken || '')
      .set('id',id)
      .set('comment_description',text)
    return this.http.get<any>(this.registercomment, { params });
  }

  toggleComment(trackId: number): Observable<any> {
    if (!this.accessToken) {
      return new Observable((observer) => {
        observer.error({ status: 400, error: 'You ain\'t logged in!' });
      });
    }
    const params = new HttpParams()
      .set('access_token', this.accessToken || '')
      .set('id', trackId)
      .set('limit',3)
      .set('offset',5)
      .set('server_key', this.serverKey);
   

    return this.http.post(`${environment.api}/getcomment`, params);
  }
}
