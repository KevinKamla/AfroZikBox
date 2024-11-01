import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { AlertController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-usercover',
  templateUrl: './usercover.page.html',
  styleUrls: ['./usercover.page.scss'],
})
export class UsercoverPage implements OnInit {
  coverFile: File | null = null;
  
  constructor(
    private userService: UserService,
    private alertController: AlertController,
    private navCtrl: NavController
  ) {}

  ngOnInit(): void {}

  // Méthode pour gérer la sélection du fichier
  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.coverFile = file;
    }
  }

  // Méthode pour envoyer la nouvelle photo de couverture
  updateCover() {
    if (this.coverFile) {
      this.userService.updateProfileCover(this.coverFile, 'cover')
        .subscribe({
          next: async (response) => {
            console.log('Photo de couverture mise à jour avec succès', response);
            await this.showSuccessAlert(); // Afficher l'alerte de succès
          },
          error: (error) => {
            console.error('Erreur lors de la mise à jour de la photo de couverture', error);
          }
        });
    }
  }

  // Méthode pour afficher une boîte de dialogue et rediriger
  async showSuccessAlert() {
    const alert = await this.alertController.create({
      header: 'Succès',
      message: 'Votre photo de couverture a été mise à jour.',
      buttons: [
        {
          text: 'OK',
          handler: () => {
            this.navCtrl.navigateBack('/profil'); // Rediriger vers la page de profil
          }
        }
      ]
    });

    await alert.present();
  }
}
