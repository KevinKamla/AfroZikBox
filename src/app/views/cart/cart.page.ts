import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
})
export class CartPage implements OnInit {
  cartItems: any[] = [];
  addresses: any[] = [];
  selectedAddress: any = null;
  alertOpen: boolean = false;
  ionToast: boolean = false;
  isChecked: boolean = false;

  constructor(
    private navCtrl: NavController,
    private productService: ProductService,
    private route: Router,
  ) {}

  walletButtons = [
    {
      text: 'Annuler',
      handler: () => {
        this.alertOpen = false;
      },
    },
    {
      text: 'Ajouter un porte-monnaie',
      handler: () => {
        this.navCtrl.navigateForward('/wallet');
        this.alertOpen = false;
      },
    },
  ];

  checked() {
    this.isChecked = !this.isChecked;
  }

  ngOnInit() {
    this.getCart();
    this.getAddresses();
  }

  getCart() {
    this.productService.getCartItems().subscribe({
      next: (response) => {
        this.cartItems = response.array || []; // Assurez-vous d'utiliser "array"
      },
      error: (error) => {
        console.error('Erreur lors de la récupération du panier:', error);
        this.cartItems = [];
      },
    });
  }

  getAddresses() {
    // this.productService.getAddresses().subscribe({
    //   next: (response) => {
    //     this.addresses = response.data || [];
    //   },
    //   error: (error) => {
    //     console.error('Error fetching addresses:', error);
    //   },
    // });
    console.log('adress');
  }

  selectAddress(address: any) {
    this.selectedAddress = address;
    console.log('Adresse sélectionnée :', this.selectedAddress);
  }

  getTotalPrice(): number {
    if (!Array.isArray(this.cartItems)) {
      return 0; // Retournez 0 si cartItems n'est pas un tableau
    }

    return this.cartItems.reduce((total, item) => {
      const productPrice = item.product?.price || 0; // Assurez-vous que le prix existe
      const units = item.units || 0; // Utilisez "units" pour la quantité
      return total + productPrice * units;
    }, 0);
  }

  removeFromCart(item: any) {
    this.productService.removeFromCart(item.product_id).subscribe({
      next: () => {
        this.cartItems = this.cartItems.filter(
          (cartItem) => cartItem.product_id !== item.product_id
        );
      },
      error: (error) => {
        console.error('Error removing item:', error);
      },
    });
  }

  Buy() {
    // if (!this.selectedAddress) {
    //   this.showToast('Veuillez sélectionner une adresse.');
    //   return;
    // }
    this.route.navigate(['/paymobil']);
    this.alertOpen = true;
  }

  showToast(message: string) {
    this.ionToast = true;
    console.log(message);
    setTimeout(() => {
      this.ionToast = false;
    }, 3000);
  }
}
