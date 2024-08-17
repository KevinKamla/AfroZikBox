/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IonLabel, ModalController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.page.html',
  styleUrls: ['./wallet.page.scss'],
})
export class WalletPage implements OnInit {
  alertPayStackIsOpen: Boolean = false
  alertCashfreeIsOpen: Boolean = false

  constructor(
    private route: Router,
    private modal: ModalController,
    private navCtrl: NavController,
  ) { }


  public alertPayStackButtons = [
    {
      text: 'Annuler',
      role: 'cancel',
      handler: () => { },
    },
    {
      text: 'Payer',
      role: 'confirm',
      handler: () => { },
    },
  ];

  public alertPayStackInputs = [
    {
      placeholder: 'E-mail',
      type: 'mail',
    },
  ];


  public alertCashfreeButtons = [
    {
      text: 'Annuler',
      role: 'cancel',
      handler: () => { },
    },
    {
      text: 'Payer',
      role: 'confirm',
      handler: () => { },
    },
  ];


  public alertCashfreeInputs = [
    {
      placeholder: 'Username',
      type: 'text',
      icon: 'person'
    }, {
      placeholder: 'E-mail',
      type: 'mail',
      icon: 'plan-outline'
    }, {
      placeholder: 'Téléphone',
      type: 'number',
      icon: 'call'
    },
  ];
  paiementList = ['Virement', 'Paystack', 'Cashfree', 'PayUmoney', 'AuthorizeNet', 'Paypal', 'Carte bancaire', 'RazorPay', 'SecurionPay',
    'LiziPay', 'AamerPay', 'FluttezWave'];


  selectedPaiement(item: string) {
    switch (item) {
      case 'Virement':
        this.route.navigate(['virement', 'Virement']);
        break;
      case 'Paystack':
        this.alertPayStackIsOpen = true;
        break;
      case 'Cashfree':
        this.alertCashfreeIsOpen = true;
        break;
      case 'PayUmoney':
        this.route.navigate(['virement', 'PayUmoney']);
        break;
      case 'AuthorizeNet':
        this.route.navigate(['virement', 'AuthorizeNet']);
        break;
      case 'FlutterWave':
        this.route.navigate(['virement', 'FlutterWave']);
        break;
      case 'Paypal':
        // this.navCtrl.navigateForward('');
        break;
      case 'Carte bancaire':
        // this.navCtrl.navigateForward('');
        break;
      case 'RazorPay':
        // this.navCtrl.navigateForward('play');
        break;
      case 'SecurionPay':
        // this.navCtrl.navigateForward('');
        break;
      case 'LiziPay':
        this.navCtrl.navigateForward('play');
        break;
      case 'AamerPay':
        this.navCtrl.navigateForward('play');
        break;

      default:
        break;
    }
    this.modal.dismiss();
  }
  ngOnInit() {
  }

}
