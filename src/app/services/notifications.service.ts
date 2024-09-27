import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class NotificationsService {
  private baseUrl2 = `${environment.api}/notifications/get-follower`;
  private countunseen = `${environment.api}/notifications/count_unseen?`;
  private accessToken = localStorage.getItem('accessToken');
  private serverKey = environment.server_key;

  constructor(private http: HttpClient) { }

  getNotifications() {
    const params = new HttpParams()
      .set('server_key', this.serverKey)
      .set('access_token', this.accessToken || '')
    return this.http.get<any>(this.baseUrl2, { params });
  }
  countUnseen() {
    const params = new HttpParams()
      .set('server_key', this.serverKey)
      .set('access_token', this.accessToken || '')
    return this.http.get<any>(this.countunseen, { params });
  }

}
