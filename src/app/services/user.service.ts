import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl2 = `${environment.api}/user/get-follower`;
  private baseUrl4 = `${environment.api}/user/get-following`;
  private recent = `${environment.api}/user/get-recently-played`;
  private baseUrl3 = `${environment.api}/user/get-liked`;
  private userBlock = `${environment.api}/user/get-blocks`;
  private recommanded = `${environment.api}/user/get-recommended`;
  private membership = `${environment.api}/user/upgrade-membership`;
  private purchases = `${environment.api}/user/my-purchases`;
  private accessToken = localStorage.getItem('accessToken');
  private profile = `${environment.api}/user/get-profile`;
  private serverKey = environment.server_key;
  constructor(private http: HttpClient) { }

  getRecentPlayed(id:number){
    const params = new HttpParams()
      .set('server_key', this.serverKey)
      .set('access_token', this.accessToken || '')
      .set('id', id.toString())
      .set('offset',5)
      .set('limit',3);
    return this.http.get<any>(this.recent, { params });
  }
  getFollowers(id: number) {
    const params = new HttpParams()
      .set('server_key', this.serverKey)
      .set('access_token', this.accessToken || '')
      .set('id', id.toString())
    return this.http.get<any>(this.baseUrl2, { params });
  }
  getLikeds(id : number): Observable<any> {
    const params = new HttpParams()
      .set('server_key', this.serverKey)
      .set('access_token', this.accessToken || '')
      .set('id', id.toString())
      .set('offset',5)
      .set('limit',3);
    return this.http.get<any>(this.baseUrl3, { params });
  }
  getFollowing(id: number) {
    const params = new HttpParams()
      .set('server_key', this.serverKey)
      .set('access_token', this.accessToken || '')
      .set('id', id.toString())
    return this.http.get<any>(this.baseUrl4, { params });
  }
  getProfile(id:number) {
    const params = new HttpParams()
      .set('server_key', this.serverKey)
      .set('access_token', this.accessToken || '')
      .set('user_id', id.toString())
      .set('fetch','all')
      .set('limit',3);
    return this.http.get<any>(this.profile, { params });
  }
  getBlocks(id:number) {
    const params = new HttpParams()
      .set('server_key', this.serverKey)
      .set('access_token', this.accessToken || '')
      .set('user_id', id.toString())
      .set('offset',5)
      .set('limit',3);
    return this.http.get<any>(this.userBlock, { params });
  }
  getRecommanded(id:number) {
    const params = new HttpParams()
      .set('server_key', this.serverKey)
      .set('access_token', this.accessToken || '')
      .set('user_id', id.toString())
      .set('offset',5)
      .set('limit',3);
    return this.http.get<any>(this.recommanded, { params });
  }
  getMembership(id:number) {
    const params = new HttpParams()
      .set('server_key', this.serverKey)
      .set('access_token', this.accessToken || '')
      .set('user_id', id.toString())
      .set('offset',5)
      .set('limit',3);
    return this.http.get<any>(this.membership, { params });
  }
  getPurchases(id:number) {
    const params = new HttpParams()
      .set('server_key', this.serverKey)
      .set('access_token', this.accessToken || '')
      .set('id', id.toString())
      .set('limit',3);
    return this.http.get<any>(this.purchases, { params });
  }
}
