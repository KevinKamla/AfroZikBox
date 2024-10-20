import { CanActivate, CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { AlertController } from '@ionic/angular';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LoginGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router,
    private alertCtrl: AlertController
  ) {}

  async canActivate(): Promise<boolean> {
    if (this.authService.isLoggedIn()) {
      return true; // L'utilisateur est connecté, accès autorisé
    } else {
      // L'utilisateur n'est pas connecté, montrer une alerte et rediriger
      const alert = await this.alertCtrl.create({
        header: 'Connexion requise',
        message: 'Vous devez vous connecter pour accéder à cette page.',
        backdropDismiss: false,
        buttons: [
          {
            text: 'se connecter',
            handler: () => {
              this.router.navigate(['/login']); // Rediriger vers la page de login
            },
          },
          {
            text: 'annuler',
            role: 'cancel',
          },
        ],
      });
      await alert.present();
      return false; // Bloquer l'accès à la page protégée
    }
  }
}
