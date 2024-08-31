import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class TopAlbumsService {

  private baseUrl = 'https://afrozikbox.com/endpoint/common/get-trending?server_key=d012ab7a1e170f66e8ed63176dcc4e7b';

  constructor(private http: HttpClient) { }

  getTopAlbums(albumId?: string | null): Observable<any> {
    return this.http.get<any>(this.baseUrl);
  }
}
