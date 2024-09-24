import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
  HttpParams,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import {
  LoginSuccessModel,
  TwoFactorLoginSuccessModel,
  SessionErrorModel,
  RegisterSuccessModel,
} from '../models/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = `${environment.api}auth/login`;
  private apiUrl2 = `${environment.api}auth/forgot-password`;
  // https://afrozikbox.com/endpoint/auth/forgot-password?
  private url = `${environment.api}auth/signup?server_key=d012ab7a1e170f66e8ed63176dcc4e7b&id`;
  private serverKey = environment.server_key;
  private accessToken = localStorage.getItem('access_token');

  constructor(private http: HttpClient) {}

  forgotPassword(email: string): Observable<any> {
    const params = new HttpParams()
      .set('server_key', this.serverKey)
      .set('email', email);

    return this.http.get(this.apiUrl2, { params }).pipe(
      map(response => {
        console.log('Réponse de réinitialisation du mot de passe:', response);
        return response;
      }),
      catchError(error => this.handleError(error))
    );
  }
  registerUser(
    name: string,
    email: string,
    username: string,
    password: string,
    confirmPassword: string,
    // server_key: string,
    deviceId: string
  ): Observable<{
    [x: string]: any; success?: RegisterSuccessModel; error?: SessionErrorModel 
}> {

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    const body = {
      username: username,
      password: password,
      email: email,
      name: name,
      c_password: confirmPassword,
      // deviceId: deviceId,
      // server_key: server_key,
    };

    console.log('Request body:', JSON.stringify(body)); // Afficher le contenu du corps de la requête
    console.log(headers);
    
    return this.http
      .post<RegisterSuccessModel>(this.url, body, { headers: headers })
      .pipe(
        map((response) => {
          return { success: response };
        }),
        catchError((error: HttpErrorResponse) => this.handleError(error))
      );
  }

  private handleError(
    error: HttpErrorResponse
  ): Observable<{ success?: RegisterSuccessModel; error?: SessionErrorModel }> {
    console.error('Une erreur est survenue:', error);
    const sessionError: SessionErrorModel = {
      status: error.status,
      error: error.error?.error || error.message,
      errors: error.error?.errors || {},
    };
    return throwError(() => ({ error: sessionError }));
  }

  login(
    username: string,
    password: string,
    server_key: string
  ): Observable<{
    loginSuccess?: LoginSuccessModel;
    twoFactorSuccess?: TwoFactorLoginSuccessModel;
    sessionError?: SessionErrorModel;
    error?: any;
  }> {
    const params = new HttpParams()
      .set('username', username)
      .set('password', password)
      .set('server_key', server_key);

    return this.http.post<any>(this.apiUrl, params).pipe(
      map((response) => {
        console.log(response);
        const apiStatus = response.status;
        if (apiStatus === 200) {
          const data = response.data;
          if (typeof data === 'string') {
            return {
              twoFactorSuccess: {
                status: apiStatus,
                data: data,
                userID: response.id,
              },
            };
          } else {
            const loginSuccess: LoginSuccessModel = {
              status: apiStatus,
              accessToken: response.access_token,
              data: response.data,
            };
            const userSession = {
              Access_token: loginSuccess.accessToken ?? '',
              User_id: loginSuccess.data?.id ?? 0,
            };
            localStorage.setItem('User_Session', JSON.stringify(userSession));

            return {
              loginSuccess,
            };
          }
        } else {
          return {
            sessionError: response as SessionErrorModel,
          };
        }
      }),
      catchError((error) => {
        console.error('Erreur lors de la requête:', error);
        return throwError(() => error);
      })
    );
  }
  isLoggedIn(): boolean {
    const userData = localStorage.getItem('UserData');
    const username = localStorage.getItem('username');
    const password = localStorage.getItem('password');
    return !!userData && !!username && !!password;
  }
}
