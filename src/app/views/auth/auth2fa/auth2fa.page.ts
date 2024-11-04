/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-auth2fa',
  templateUrl: './auth2fa.page.html',
  styleUrls: ['./auth2fa.page.scss'],
})
export class Auth2faPage implements OnInit {
  isActive: string = "Désactiver";
  isCodeSend: boolean = false;
  optionList = ["Activer", "Désactiver"];
  twoFactorData = {
    phone_number: '',
    two_factor: false, // Défini comme false par défaut
  };
  constructor(
    private modal: ModalController,
    private userService: UserService
  ) { }

  selectedOption = (item: string) => {
    if (item === "Desactiver") {
      this.isCodeSend = false;

    }
    this.isActive = item;
    this.modal.dismiss();
  }

  sendCode() {
    this.isCodeSend = true;
  }

  ngOnInit() {
  }
  updateTwoFactor() {
    this.userService.updateTwoFactor(this.twoFactorData).subscribe({
      next: (response) => {
        console.log('Authentification à deux facteurs mise à jour avec succès', response);
        alert('Authentification à deux facteurs mise à jour avec succès');
      },
      error: (error) => {
        console.error('Erreur lors de la mise à jour de l\'authentification à deux facteurs', error);
        alert('Erreur lors de la mise à jour de l\'authentification à deux facteurs');
      }
    });
  }

}
