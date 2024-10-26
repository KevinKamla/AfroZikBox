import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RadioService {

  
  private accessToken = localStorage.getItem('accessToken');
  private serverKey = environment.server_key;
  private search_stations = `${environment.api}/station/search_stations`;
  private add_stations = `${environment.api}/station/add_stations`;
  

  constructor(private http: HttpClient) { }

  /**
   * Recherche de stations de radio.
   * @param keyword Mot-clé de la recherche
   * @param country (facultatif) Pays
   * @param genre (facultatif) Genre
   * @returns Observable avec les résultats de la recherche
   */
  searchStations(keyword: string, country: string = 'ALL', genre: string = 'ALL'): Observable<any> {
    const body = new URLSearchParams();
    body.set('keyword', keyword);
    body.set('country', country);
    body.set('genre', genre);
    body.set('server_key', this.serverKey);
    body.set('access_token', this.accessToken || '');

    const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');

    return this.http.post(this.search_stations, body.toString(), { headers });
  }

  /**
   * Ajout d'une station de radio.
   * @param id ID de la station
   * @param station Nom de la station
   * @param url URL du flux de la station
   * @param logo URL du logo de la station
   * @param genre Genre de la station
   * @param country Pays de la station
   * @returns Observable avec le statut de l'ajout
   */
  addStation(id: number, station: string, url: string, logo: string, genre: string, country: string): Observable<any> {
    const body = new URLSearchParams();
    body.set('id', id.toString());
    body.set('station', station);
    body.set('url', url);
    body.set('logo', logo);
    body.set('genre', genre);
    body.set('country', country);
    body.set('server_key', this.serverKey);
    body.set('access_token', this.accessToken || '');

    const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');

    return this.http.post(this.add_stations, body.toString(), { headers });
  }
}
