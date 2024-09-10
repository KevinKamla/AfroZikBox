import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChansonsService {

  private baseUrl = 'https://afrozikbox.com/endpoint/common/get-top-songs?server_key=d012ab7a1e170f66e8ed63176dcc4e7b&access_token=f3a1bfda3445abce1047b9850837f3611c606e6417259932833937dbfda401692f8255ce99dcaaa806';

  constructor(private http: HttpClient) { }

  getChansons(): Observable<any> {
    return this.http.get<any>(this.baseUrl);
  }
}
