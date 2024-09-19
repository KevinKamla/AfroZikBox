import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'https://www.afrozikbox.com/endpoint/auth/login?username=PGES&password=Faruja@&server_key=d012ab7a1e170f66e8ed63176dcc4e7b&ios_device_id=,vjjkblnkghdgfdwxfjgki_yhkn';

  private apiUrl1 = 'https://afrozikbox.com/endpoint/auth/signup';

  private apiUrl2 = 'https://www.afrozikbox.com/endpoint/auth/login';


  constructor(private http: HttpClient) {}

  login(username: string, password: string, server_key: string, ios_device_id: string): Observable<any> {
    // Ajout des paramètres à l'URL
    const params = new HttpParams()
      .set('username', username)
      .set('password', password)
      .set('server_key', server_key)
      .set('ios_device_id', ios_device_id);
      console.log("Information de la requete ",params)
    // Requête GET avec les paramètres
    return this.http.get(this.apiUrl2, { params });
  }

  authenticateUser(username: string, password: string, deviceId: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    const body = {
      username: username,
      password: password,
      server_key: 'd012ab7a1e170f66e8ed63176dcc4e7b',
      ios_device_id: deviceId
    };

    return this.http.post(this.apiUrl, body, { headers: headers })
      .pipe(
        catchError(this.handleError)
      );
  }

  private handleError(error: any): Observable<never> {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Erreur côté client
      errorMessage = `Erreur: ${error.error.message}`;
    } else {
      // Erreur côté serveur
      errorMessage = `Erreur du serveur: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
  }

  registerUser(name: string, email: string, username: string, password: string, confirmPassword: string): Observable<any> {
    const url = `${this.apiUrl1}/signup`;

    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    const body = {
      name: name,
      email: email,
      username: username,
      password: password,
      c_password: confirmPassword,
      server_key: 'd012ab7a1e170f66e8ed63176dcc4e7b'
    };

    return this.http.post(url, body, { headers: headers }).pipe(
      catchError(this.handleErrorr)
    );
  }

  // Gestion des erreurs de requête HTTP
  private handleErrorr(error: any): Observable<never> {
    console.error('Une erreur est survenue:', error);
    throw error;
  }
}
