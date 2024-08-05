/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-auth2fa',
  templateUrl: './auth2fa.page.html',
  styleUrls: ['./auth2fa.page.scss'],
})
export class Auth2faPage implements OnInit {
  isActive: string = "Désactiver";
  isCodeSend: boolean = false;
  optionList = ["Activer", "Désactiver"]
  constructor(
    private modal: ModalController
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

}
