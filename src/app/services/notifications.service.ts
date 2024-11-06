import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ToastController } from '@ionic/angular';
import { OneSignal } from '@awesome-cordova-plugins/onesignal/ngx';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root',
})
export class NotificationsService {
  private baseUrl2 = `${environment.api}/notifications/get-follower`;
  private countunseen = `${environment.api}/notifications/count_unseen?`;
  private accessToken = localStorage.getItem('accessToken');
  private serverKey = environment.server_key;
  platform: any;

  constructor(
    private http: HttpClient,
    private toastController: ToastController,
    private oneSignal: OneSignal
  ) {}

  // Fetch notifications from API
  getNotifications() {
    const params = new HttpParams()
      .set('server_key', this.serverKey)
      .set('access_token', this.accessToken || '');

    return this.http.get(this.baseUrl2, { params }).pipe(
      map((response: any) => response.notifications),
      catchError(async (error) => {
        const toast = await this.toastController.create({
          message: 'Failed to load notifications.',
          duration: 3000,
          position: 'bottom',
        });
        toast.present();
        throw error;
      })
    );
  }

  // Display a toast message
  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 3000,
      position: 'bottom',
    });
    toast.present();
  }

  // Initialize OneSignal for push notifications
  initOneSignal() {
    this.oneSignal.startInit(
      '69bc0a81-71c3-409f-921d-01c01a44c278',
      '497109148599-u0g40f3e5uh53286hdrpsj10v505tral.apps.googleusercontent.com'
    );

    this.oneSignal.inFocusDisplaying(
      this.oneSignal.OSInFocusDisplayOption.Notification
    );

    this.oneSignal.handleNotificationReceived().subscribe((data) => {
      console.log('Notification received:', data);
    });

    this.oneSignal.handleNotificationOpened().subscribe((data) => {
      console.log('Notification opened:', data);
    });

    this.oneSignal.endInit();
  }

  registerDeviceId() {
    this.oneSignal.getIds().then((ids) => {
      const deviceId = ids.userId;
      const platform = this.getPlatform();

      if (platform === 'android') {
        this.http
          .post(`${environment.api}notifications/register_device`, {
            android_device_id: deviceId,
          })
          .subscribe();
      } else if (platform === 'ios') {
        this.http
          .post(`${environment.api}notifications/register_device`, {
            ios_device_id: deviceId,
          })
          .subscribe();
      }
    });
  }

  private getPlatform() {
    // Logic to determine platform (android or ios)
    if (this.platform.is('android')) {
      return 'android';
    } else if (this.platform.is('ios')) {
      return 'ios';
    }
    return null;
  }

  // getNotifications() {
  //   const params = new HttpParams()
  //     .set('server_key', this.serverKey)
  //     .set('access_token', this.accessToken || '')
  //   return this.http.get<any>(this.baseUrl2, { params });
  // }
  countUnseen() {
    const params = new HttpParams()
      .set('server_key', this.serverKey)
      .set('access_token', this.accessToken || '');
    return this.http.get<any>(this.countunseen, { params });
  }
}
