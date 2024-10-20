import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  private baseUrl = `${environment.api}/event/get_my_events`;
  private create = `${environment.api}/event/create`;
  private getid = `${environment.api}/event/get_event_by_id`;
  private delete = `${environment.api}/event/delete`;
  private edit = `${environment.api}/event/edit`;
  private download = `${environment.api}/event/download`;
  private join = `${environment.api}/event/join`;
  private accessToken = localStorage.getItem('accessToken');
  private serverKey = environment.server_key;

  constructor(private http: HttpClient) {}
  getMyEvents(id: number, accessToken: string): Observable<any> {
    const params = new HttpParams()
      .set('server_key', this.serverKey)
      .set('access_token', this.accessToken || '')
      .set('user_id', id.toString()); 
    return this.http.get<any>(this.baseUrl, { params });
  } 
  
}
