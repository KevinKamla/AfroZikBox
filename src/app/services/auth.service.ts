import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'https://afrozikbox.com/endpoint/auth/login';

  private apiUrl1 = 'https://afrozikbox.com/endpoint/auth/signup';


  constructor(private http: HttpClient) {}

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
