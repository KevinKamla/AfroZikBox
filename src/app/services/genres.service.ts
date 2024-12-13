import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class GenresService {

  private baseUrl = ' https://afrozikbox.com/endpoint/user/get-genres?server_key=d012ab7a1e170f66e8ed63176dcc4e7b';

  constructor(private http: HttpClient) { }

  getGenre(genreId?: string | null): Observable<any> {
    return this.http.get<any>(this.baseUrl);
  }
}
