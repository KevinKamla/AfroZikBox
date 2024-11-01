import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-changepassword',
  templateUrl: './changepassword.page.html',
  styleUrls: ['./changepassword.page.scss'],
})
export class ChangepasswordPage implements OnInit {
  currentPassword: string = '';
  newPassword: string = '';
  confirmPassword: string = '';

  constructor(
    private userService: UserService,
    private alertController: AlertController
  ) {}
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  // Méthode pour modifier le mot de passe
  async updatePassword() {
    if (!this.currentPassword || !this.newPassword || !this.confirmPassword) {
      await this.showAlert('Erreur', 'Veuillez remplir tous les champs.');
      return;
    }

    this.userService
      .updateUserPassword(this.currentPassword, this.newPassword, this.confirmPassword)
      .subscribe({
        next: async () => {
          await this.showAlert('Succès', 'Votre mot de passe a été mis à jour.');
        },
        error: async (error) => {
          await this.showAlert('Erreur', error);
        },
      });
  }

  // Méthode pour afficher une alerte
  async showAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['OK']
    });
    await alert.present();
  }
}
