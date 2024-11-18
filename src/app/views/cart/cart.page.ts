import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
})
export class CartPage implements OnInit {
  isChecked: boolean = false;
  ionToast: boolean = false;
  alertOpen: boolean = false;
  cartItems: any[] = [];

  constructor(
    private navCtrl: NavController,
    private productService: ProductService
  ) {}

  walletButtons = [
    {
      text: 'Annuler',
      handler: () => {
        this.alertOpen = false;
      },
    },
    {
      text: 'Ajouter un porte monnaie',
      handler: () => {
        this.navCtrl.navigateForward('/wallet');
        this.alertOpen = false;
      },
    },
  ];

  Buy() {
    if (!this.isChecked) {
      this.showToast();
      return;
    }
    this.alertOpen = true;
  }

  checked() {
    this.isChecked = !this.isChecked;
  }

  showToast(message: string = 'Veuillez accepter les conditions.') {
    this.ionToast = true;
    console.log(message);
    setTimeout(() => {
      this.ionToast = false;
    }, 3000);
  }

  removeFromCart(item: any) {
    this.productService.removeFromCart(item.id).subscribe({
      next: (response) => {
        console.log('Product removed from cart:', response);
        this.cartItems = this.cartItems.filter((cartItem) => cartItem.id !== item.id);
      },
      error: (error) => {
        console.error('Error removing from cart:', error);
        alert('Une erreur est survenue lors de la suppression de l\'article.');
      },
    });
  }

  getCart() {
    this.productService.getCartItems().subscribe({
      next: (response) => {
        if (response.data && response.data.length > 0) {
          this.cartItems = response.data;
          console.log('Cart items:', this.cartItems);
        } else {
          console.log('Le panier est vide.');
        }
      },
      error: (error) => {
        console.error('Error fetching cart:', error);
        alert('Impossible de charger le panier.');
      },
    });
  }

  ngOnInit() {
    this.getCart();
  }
}
