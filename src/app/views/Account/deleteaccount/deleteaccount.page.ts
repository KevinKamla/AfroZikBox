import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-deleteaccount',
  templateUrl: './deleteaccount.page.html',
  styleUrls: ['./deleteaccount.page.scss'],
})
export class DeleteaccountPage implements OnInit {

  currentPassword: string = '';

  constructor(private userService: UserService, private alertCtrl: AlertController) {}
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  // Méthode pour confirmer la suppression du compte
  async confirmDeleteAccount() {
    const alert = await this.alertCtrl.create({
      header: 'Confirmation',
      message: 'Voulez-vous vraiment supprimer votre compte ? Cette action est irréversible.',
      buttons: [
        {
          text: 'Annuler',
          role: 'cancel'
        },
        {
          text: 'Supprimer',
          handler: () => {
            this.deleteAccount();
          }
        }
      ]
    });

    await alert.present();
  }

  // Méthode pour supprimer le compte
  deleteAccount() {
    this.userService.deleteUserAccount(this.currentPassword)
      .subscribe({
        next: (response) => {
          console.log('Compte supprimé avec succès', response);
          // Redirigez ou nettoyez les données utilisateur après la suppression du compte
        },
        error: (error) => {
          console.error('Erreur lors de la suppression du compte', error);
          // Gérer l'erreur si le mot de passe est incorrect ou s'il y a un problème
        }
      });
  }

}
