import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
})
export class CartPage implements OnInit {

  isChecked: boolean = false;
  ionToast: boolean = false;
  alertOpen: boolean = false;

  constructor(
    private navCtrl: NavController
  ) { }

  walletButtons = [
    {
      text: 'Annuler',
      handler: () => { this.alertOpen = false },
    },
    {
      text: 'Ajouter un porte monnaie',
      handler: () => {this.navCtrl.navigateForward('/wallet'); this.alertOpen = false},
    },
  ]

  Buy(){
    this.isChecked ? this.alertOpen = true : this.showToast();
    console.log('this.ionToast : ' , this.ionToast);
  }

  checked(){
    this.isChecked = !this.isChecked;
  }

  showToast() {
    this.ionToast = true;
    setTimeout(() => {
      this.ionToast = false;
    }, 3000);
  }

  closeToast(){
    this.ionToast = false;
  }
  
  ngOnInit() {
    console.log();
  }

}
