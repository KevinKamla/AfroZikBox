import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root',
})
export class UserService {
  private baseUrl2 = `${environment.api}user/get-follower`;
  private baseUrl4 = `${environment.api}user/get-following`;
  private recent = `${environment.api}user/get-recently-played`;
  private baseUrl3 = `${environment.api}user/get-liked`;
  private userBlock = `${environment.api}user/get-blocks`;
  private recommanded = `${environment.api}user/get-recommended`;
  private membership = `${environment.api}user/upgrade-membership`;
  private purchases1 = `${environment.api}user/my-purchases`;
  private purchases = `${environment.api}event/get_my_events`;
  private accessToken = localStorage.getItem('accessToken');
  private profile = `https://afrozikbox.com/endpoint/user/get-profile`;
  private block = `${environment.api}block-user/block`;
  private unblock = `${environment.api}block-user/unblock`;
  private serverKey = environment.server_key;
  constructor(private http: HttpClient) {}

  getRecentPlayed(id: number) {
    const params = new HttpParams()
      .set('server_key', this.serverKey)
      .set('access_token', this.accessToken || '')
      .set('id', id.toString())
      .set('offset', 5)
      .set('limit', 3);
    return this.http.get<any>(this.recent, { params });
  }
  getFollowers(id: number) {
    const params = new HttpParams()
      .set('server_key', this.serverKey)
      .set('access_token', this.accessToken || '')
      .set('id', id.toString());
    return this.http.get<any>(this.baseUrl2, { params });
  }
  getLikeds(id: number): Observable<any> {
    const params = new HttpParams()
      .set('server_key', this.serverKey)
      .set('access_token', this.accessToken || '')
      .set('id', id.toString())
      .set('offset', 5)
      .set('limit', 3);
    return this.http.get<any>(this.baseUrl3, { params });
  }
  getFollowing(id: number) {
    const params = new HttpParams()
      .set('server_key', this.serverKey)
      .set('access_token', this.accessToken || '')
      .set('id', id.toString());
    return this.http.get<any>(this.baseUrl4, { params });
  }
  getProfile(id: number) {
    const params = new HttpParams()
      .set('server_key', this.serverKey)
      .set('access_token', this.accessToken || '')
      .set('user_id', id.toString())
      .set('fetch', 'all')
      .set('limit', 3);
    return this.http.get<any>(this.profile, { params });
  }
  getBlocks(id: number) {
    const params = new HttpParams()
      .set('server_key', this.serverKey)
      .set('access_token', this.accessToken || '')
      .set('user_id', id.toString())
      .set('offset', 5)
      .set('limit', 3);
    return this.http.get<any>(this.userBlock, { params });
  }
  getRecommanded(id: number) {
    const params = new HttpParams()
      .set('server_key', this.serverKey)
      .set('access_token', this.accessToken || '')
      .set('user_id', id.toString())
      .set('offset', 5)
      .set('limit', 3);
    return this.http.get<any>(this.recommanded, { params });
  }
  getMembership(id: number) {
    const params = new HttpParams()
      .set('server_key', this.serverKey)
      .set('access_token', this.accessToken || '')
      .set('user_id', id.toString())
      .set('offset', 5)
      .set('limit', 3);
    return this.http.get<any>(this.membership, { params });
  }
  getPurchases(id: number) {
    const params = new HttpParams()
      .set('server_key', this.serverKey)
      .set('access_token', this.accessToken || '')
      .set('id', id.toString())
      .set('limit', 3);
    return this.http.get<any>(this.purchases1, { params });
  }
  getPurchases1(id: number) {
    const params = new HttpParams()
      .set('server_key', this.serverKey)
      .set('access_token', this.accessToken || '')
      .set('user_id', id.toString());
    return this.http.get<any>(this.purchases, { params });
  }
  blockUser(id: number): Observable<any> {
    console.log(id);

    const params = new HttpParams()
      .set('access_token', this.accessToken || '')
      .set('server_key', this.serverKey)
      .set('id', id.toString());

    return this.http
      .post(this.block, params)
      .pipe(catchError(this.handleError));
  }

  unBlockUser(id: number): Observable<any> {
    console.log(id);

    const params = new HttpParams()
      .set('server_key', this.serverKey)
      .set('access_token', this.accessToken || '')
      .set('id', id.toString());

    return this.http
      .post(this.unblock, params)
      .pipe(catchError(this.handleError));
  }

  private handleError(error: any) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(() => errorMessage);
  }

  getBlockedUsers(id: number) {
    const params = new HttpParams()
      .set('server_key', this.serverKey)
      .set('access_token', this.accessToken || '')
      .set('id', id.toString());

    return this.http.post(
      'https://afrozikbox.com/endpoint/user/get-blocks',
      params
    );
  }
  // Obtenir les chansons recommandées
  getRecommendedSongs(id: number): Observable<any> {
    if (!id || id <= 0) {
      return throwError(() => new Error('ID invalide'));
    }
    const params = new HttpParams()
      .set('server_key', this.serverKey)
      .set('access_token', this.accessToken || '')
      .set('id', id.toString());

    const url = `https://afrozikbox.com/endpoint/user/get-recommended`;
    return this.http.get(url, { params });
  }

  // Mettre à jour les paramètres généraux de l'utilisateur
  updateGeneralSettings(user: any): Observable<any> {
    const body = {
      username: user.username,
      email: user.email,
      gender: user.gender,
      age: user.age,
      country_id: user.country_id,
      is_pro: user.is_pro,
      verified: user.verified,
      category: user.category,
      server_key: this.serverKey,
      access_token: this.accessToken || '',
    };

    return this.http.post(
      `https://afrozikbox.com/endpoint/user/update-general`,
      body
    );
  }

  // Mettre à jour la couverture de profil
  updateProfileCover(coverFile: File, type: string = ''): Observable<any> {
    const formData = new FormData();
    formData.append('cover', coverFile);
    formData.append('type', type);
    formData.append('server_key', this.serverKey);
    formData.append('access_token', this.accessToken || '');

    return this.http.post(
      `https://afrozikbox.com/endpoint/user/update-profile-cover`,
      formData
    );
  }

  // Mettre à jour la photo de profil
  updateProfilePicture(avatarFile: File): Observable<any> {
    const formData = new FormData();
    formData.append('avatar', avatarFile);
    formData.append('server_key', this.serverKey);
    formData.append('access_token', this.accessToken || '');

    return this.http.post(
      `https://afrozikbox.com/endpoint/user/update-profile-picture`,
      formData
    );
  }

  // Améliorer l'adhésion d'un utilisateur
  upgradeMembership(userId: number): Observable<any> {
    if (!userId || userId <= 0) {
      throw new Error('Invalid id');
    }
    const params = new HttpParams()
      .set('server_key', this.serverKey)
      .set('access_token', this.accessToken || '')
      .set('id', userId.toString());
    const url = `https://afrozikbox.com/endpoint/user/upgrade-membership`;
    return this.http.get(url, { params });
  }

  // Activer ou désactiver l'authentification à deux facteurs
  updateTwoFactor(twoFactorData: any): Observable<any> {
    const body = {
      phone_number: twoFactorData.phone_number,
      two_factor: twoFactorData.two_factor,
      server_key: this.serverKey,
      access_token: this.accessToken || '',
    };

    return this.http.post(
      `https://afrozikbox.com/endpoint/user/update-two-factor`,
      body
    );
  }

  updateUserProfile(user: any): Observable<any> {
    if (!user || !user.name) {
      return throwError('Veuillez vérifier vos informations');
    }

    const body = {
      name: user.name,
      about_me: user.about_me,
      facebook: user.facebook,
      website: user.website,
      server_key: this.serverKey,
      access_token: this.accessToken,
    };

    // Validation de l'URL du site Web
    if (!this.isValidUrl(user.website)) {
      return throwError(
        'URL du site invalide, format autorisé : http(s)://*.*/*'
      );
    }

    // Vérification que facebook n'est pas une URL (ce doit être un nom d'utilisateur)
    if (this.isValidUrl(user.facebook)) {
      return throwError(
        "Le nom d'utilisateur Facebook est invalide, les URLs ne sont pas autorisées"
      );
    }

    return this.http
      .post(`https://afrozikbox.com/endpoint/user/update-profile`, body)
      .pipe(
        catchError((error) => throwError(error)) // Gérer les erreurs
      );
  }

  // Méthode pour supprimer le compte utilisateur
  deleteUserAccount(currentPassword: string): Observable<any> {
    if (!currentPassword) {
      return throwError('Veuillez vérifier vos informations');
    }

    // const body = {
    //   c_pass: currentPassword,
    //   server_key: this.serverKey,
    //   access_token: this.accessToken,
    // };
    const params = new HttpParams()
      .set('access_token', this.accessToken || '')
      .set('c_pass', currentPassword)
      .set('server_key', this.serverKey);

    return this.http
      .post(`https://afrozikbox.com/endpoint/user/delete-account`, params)
      .pipe(
        catchError((error) =>
          throwError(
            'Mot de passe incorrect ou erreur lors de la suppression du compte'
          )
        )
      );
  }

  // Méthode pour changer le mot de passe utilisateur
  updateUserPassword(
    currentPassword: string,
    newPassword: string,
    confirmPassword: string
  ): Observable<any> {
    if (!currentPassword || !newPassword || !confirmPassword) {
      return throwError('Veuillez vérifier vos informations');
    }

    if (newPassword !== confirmPassword) {
      return throwError('Les mots de passe ne correspondent pas');
    }

    if (newPassword.length < 4 || newPassword.length > 32) {
      return throwError('Le nouveau mot de passe est trop court');
    }

    const body = {
      c_pass: currentPassword,
      n_pass: newPassword,
      rn_pass: confirmPassword,
      server_key: this.serverKey,
      access_token: this.accessToken,
    };

    return this.http
      .post(`https://afrozikbox.com/endpoint/user/update-password`, body)
      .pipe(
        catchError((error) =>
          throwError('Erreur lors de la mise à jour du mot de passe')
        )
      );
  }

  // Valider si une URL est correcte (utilisé pour valider le site Web de l'utilisateur)
  private isValidUrl(url: string): boolean {
    const regex =
      /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;
    return regex.test(url);
  }
}
