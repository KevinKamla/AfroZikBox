import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-abonnement',
  templateUrl: './abonnement.page.html',
  styleUrls: ['./abonnement.page.scss'],
})
export class AbonnementPage implements OnInit {
  

  constructor(
    private navCtrl: NavController,
  ) { }

  walletButtons = [
    {
      text: 'Annuler',
      handler: () => {  },
    },
    {
      text: 'Ajouter un porte monnaie',
      handler: () => {this.navCtrl.navigateForward('/wallet'); },
    },
  ]

  ngOnInit() {
    this
  }

}
