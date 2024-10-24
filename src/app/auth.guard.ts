import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AlertController } from '@ionic/angular'; // Importation de l'AlertController

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private alertController: AlertController) {}

  async canActivate(): Promise<boolean> {
   
    const user = localStorage.getItem('UserData'); 

    if (user) {
      
      return true;
    } else {
      
      const alert = await this.alertController.create({
        header: 'Accès refusé',
        message: 'Vous devez être connecté pour accéder à cette page.',
        buttons: [
          {
            text: 'Se connecter',
            handler: () => {
              this.router.navigate(['/login']); 
            },
          },
        ],
      });

      await alert.present();

      return false; 
    }
  }
}
