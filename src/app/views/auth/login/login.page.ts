import { LoginSuccessModel } from './../../../models/auth';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { AuthService } from '../../../services/auth.service';
// import { ConnectivityService } from 'src/app/services/connectivity.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  username: string = '';
  password: string = '';
  server_key: string ='d012ab7a1e170f66e8ed63176dcc4e7b';
  DeviceId: string = '';
  rememberMe: boolean = false;
  errorMessage: string = ''; 

  constructor(
    private router: Router,
    private authService: AuthService,
    private toastController: ToastController
  ) // private connectivityService: ConnectivityService
  {}

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      position: 'bottom',
    });
    await toast.present();
  }

  async loginPressed() {
    if (!this.username.trim()) {
      this.presentToast('Veuillez entrer un nom d’utilisateur.');
      return;
    }

    if (!this.password.trim()) {
      this.presentToast('Veuillez entrer un mot de passe.');
      return;
    }

    try {
      const response = await this.authService
        .login(this.username, this.password, this.server_key)
        .toPromise();
      console.log(response);
      
      if (response && response.loginSuccess ) {
        localStorage.setItem("UserData", JSON.stringify(response.loginSuccess.data))
        if (this.rememberMe) {
          localStorage.setItem('username', this.username);
          localStorage.setItem('password', this.password);
        }
        this.presentToast('Connexion réussie!');
        this.router.navigate(['/tabs']);
      } else if (response && response.twoFactorSuccess) {
        this.router.navigate([
          '/two-factor-verification',
          response.twoFactorSuccess.userID,
        ]);
      } else if (response && response.sessionError) {
        this.presentToast(`Erreur de session : ${response.sessionError.error}`);
      } else if (response && response.error) {
        this.presentToast(`Erreur : ${response.error.message}`);
        this.errorMessage = response.error.message;
      } else {
        this.errorMessage = 'Une erreur est survenue lors de la connexion.'; 
      }
    } catch (error) {
      console.error('Erreur lors de la connexion:', error);
      this.presentToast('Une erreur est survenue lors de la connexion.');
      this.errorMessage = 'Une erreur est survenue lors de la connexion.'; 
    }
  }
  async ngOnInit() {
    const username = localStorage.getItem("username")
    const password = localStorage.getItem("password")
    if (typeof username === 'string' && typeof password === 'string') {
      this.username = username
      this.password = password
      this.loginPressed()
    }
  }
}