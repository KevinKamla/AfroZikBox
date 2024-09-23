import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class TendanceService {
  private url =`${environment.api}/get-album-songs`
  private serverKey = environment.server_key;
  constructor() { }
}
