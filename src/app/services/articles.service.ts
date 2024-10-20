import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment'; 
@Injectable({
  providedIn: 'root'
})
export class ArticlesService {


  private baseUrl = 'https://afrozikbox.com//endpoint/blog/get?server_key=d012ab7a1e170f66e8ed63176dcc4e7b';
  private baseUrl2 = `${environment.api}/event/get_events`;
  private accessToken = localStorage.getItem('accessToken');
  private serverKey = environment.server_key;
  constructor(private http: HttpClient) { }

  getArticles(): Observable<any> {
    return this.http.get<any>(this.baseUrl);
  }

  getEvents(): Observable<any> {
    const params = new HttpParams()
      .set('server_key', this.serverKey)
      .set('access_token', this.accessToken || '')
      .set('offset',5)
      .set('limit',3)
    return this.http.get<any>(this.baseUrl2, { params });
  }
}
