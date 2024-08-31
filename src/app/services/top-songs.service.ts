import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class TopSongsService {

  private baseUrl = 'https://afrozikbox.com/endpoint/common/get-top-songs?server_key=d012ab7a1e170f66e8ed63176dcc4e7b';

  constructor(private http: HttpClient) { }

  getTopSongs(): Observable<any> {
    return this.http.get<any>(this.baseUrl);
  }
}
