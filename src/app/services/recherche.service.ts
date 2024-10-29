import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class RechercheService {
  private apiUrl = 'https://afrozikbox.com/endpoint/common/search';
  private accessToken = localStorage.getItem('accessToken');
  private serverKey = environment.server_key;
  constructor(private http: HttpClient) {}

  search(
    keyword: string,
    genres: string,
    price: string,
    fetch: string[],
    limit = 20,
    offset = 0
  ): Observable<any> {
    const body = new URLSearchParams();
    body.set('keyword', keyword);
    body.set('genres', genres);
    body.set('price', price);
    body.set('fetch', fetch.join(','));
    body.set('limit', limit.toString());
    body.set('offset', offset.toString());
    body.set('server_key', this.serverKey);
    body.set('access_token', this.accessToken || '');

    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
    });

    return this.http.post(this.apiUrl, body.toString(), { headers });
  }
}
