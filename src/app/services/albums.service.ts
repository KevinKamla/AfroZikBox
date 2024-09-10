import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AlbumsService {

  private baseUrl = 'https://afrozikbox.com/endpoint/user/get-artists?server_key=d012ab7a1e170f66e8ed63176dcc4e7b';

  constructor(private http: HttpClient) { }

  getAlbums(): Observable<any> {
    return this.http.get<any>(this.baseUrl);
  }
}
