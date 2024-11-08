import { Component } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { StorageService } from '../../../services/user-defaults.service';
import {
  AlertController,
  LoadingController,
  ToastController,
} from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage {
  username: string = '';
  name: string = '';
  email: string = '';
  password: string = '';
  confirmPassword: string = '';
  server_key: string = 'd012ab7a1e170f66e8ed63176dcc4e7b';
  passwordVisible: boolean = false; // Ajout de la propriété pour la visibilité du mot de passe
  passwordInputType: string = 'password'; // Ajout du type d'entrée pour le mot de passe
  confirmPasswordVisible: boolean = false; // Ajout de la propriété pour la visibilité de la confirmation du mot de passe
  confirmPasswordInputType: string = 'password'; // Ajout du type d'entrée pour la confirmation du mot de passe

  constructor(
    private router: Router,
    private authService: AuthService,
    private storageService: StorageService,
    private alertController: AlertController,
    private toastController: ToastController,
    private loadingController: LoadingController
  ) {}

  togglePasswordVisibility() {
    this.passwordVisible = !this.passwordVisible;
    this.passwordInputType = this.passwordVisible ? 'text' : 'password';
  }
  
  toggleConfirmPasswordVisibility() {
    this.confirmPasswordVisible = !this.confirmPasswordVisible;
    this.confirmPasswordInputType = this.confirmPasswordVisible ? 'text' : 'password';
  }
  
  async registerPressed() {
    const loading = await this.loadingController.create({
      message: 'Chargement...',
    });
    await loading.present();

    try {
      const deviceId = await this.storageService.getDeviceId('DeviceId');
      console.log(deviceId);

      this.authService
        .registerUser(
          this.name,
          this.email,
          this.username,
          this.password,
          this.confirmPassword,
          deviceId
        )
        .subscribe({
          next: async (response) => {
            await loading.dismiss();
            if (response.success?.status === 400) {
              const alert = await this.alertController.create({
                header: 'Erreur',
                message: 'Veuillez vérifier vos informations',
                buttons: ['OK'],
              });
              await alert.present();
            } else if (
              response.success?.status === 200 &&
              response.success?.waitValidation === 1
            ) {
              const alert = await this.alertController.create({
                header: 'Succès',
                message: 'Veuillez vérifier votre e-mail.',
                buttons: ['OK'],
              });
              await alert.present();
              // await alert.onDidDismiss();
              this.router.navigate(['/tabs']);
            }
          },
          error: async (sessionError) => {
            await loading.dismiss();
            const errorMessage =
              typeof sessionError.error?.error === 'string'
                ? sessionError.error?.error
                : 'Erreur inconnue';

            const alert = await this.alertController.create({
              header: 'Erreur de sécurité',
              message: errorMessage,
              buttons: ['OK'],
            });
            await alert.present();
          },
        });
    } catch (error) {
      await loading.dismiss();
      console.error('Erreur lors de la récupération du deviceId:', error);
      const alert = await this.alertController.create({
        header: 'Erreur',
        message: 'Impossible de récupérer l’identifiant de l’appareil.',
        buttons: ['OK'],
      });
      await alert.present();
    }
  }
}
