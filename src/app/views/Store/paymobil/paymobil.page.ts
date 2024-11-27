import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular'; // Importation de AlertController
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-paymobil',
  templateUrl: './paymobil.page.html',
  styleUrls: ['./paymobil.page.scss'],
})
export class PaymobilPage implements OnInit {
  phoneNumber: string = ''; // Numéro de téléphone
  cartItems: any[] = []; // Liste des produits du panier
  totalAmount: number = 0; // Montant total à payer
  isLoading: boolean = false; // Indicateur de chargement
  paymentReference: string | null = null; // Référence du paiement
  isPaymentInProgress: boolean = false; // Flag pour vérifier si le paiement est en cours

  constructor(
    private cartService: ProductService,
    private alertController: AlertController // Injection de AlertController
  ) {}

  ngOnInit() {
    this.loadCart();
  }

  loadCart() {
    this.cartService.getCartItems().subscribe({
      next: (response) => {
        this.cartItems =
          response.array.map((item: any) => ({
            ...item,
            description: item.product.desc || 'Produit sans description',
            quantity: item.quantity || 1,
          })) || [];
        this.totalAmount = this.getTotalPrice(); // Calculer le montant total
      },
      error: (error) => {
        console.error('Erreur lors de la récupération du panier:', error);
        this.cartItems = [];
      },
    });
  }

  async validatePayment() {
    if (this.isPaymentInProgress) { // Si un paiement est déjà en cours, ne pas permettre un autre paiement
      await this.showAlert('Erreur', 'Un paiement est déjà en cours. Veuillez patienter.');
      return;
    }

    if (!this.phoneNumber || this.phoneNumber.length !== 9) {
      await this.showAlert('Erreur', 'Veuillez entrer un numéro de téléphone valide.');
      return;
    }

    if (this.cartItems.length === 0) {
      await this.showAlert('Erreur', 'Votre panier est vide.');
      return;
    }

    if (this.totalAmount < 5) {
      await this.showAlert('Erreur', 'Le montant total doit être supérieur ou égal à 5 F.CFA.');
      return;
    }

    const validCartItems = this.cartItems.filter(
      (item) => item.product.price > 0 && item.quantity > 0
    );

    if (validCartItems.length === 0) {
      await this.showAlert('Erreur', 'Aucun article valide dans le panier.');
      return;
    }

    this.isPaymentInProgress = true; // Marquer le paiement comme étant en cours
    this.isLoading = true;

    const options = {
      method: 'POST',
      headers: {
        Authorization:
          'pk.gBKcZduPfvF3nbROusUrL3cGNovYKLj8izSxv3WOV9TaoGaePoZkCVRN7dcBcK1bQHmeZ9q0kLfGG4K05kxNQnPrAMmtoPI1ZZh89af3EGKGO6MTlKNa64ccizm06', // Remplacez par votre clé Notchpay
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        amount: this.totalAmount,
        currency: 'XAF',
        description: `Paiement pour ${validCartItems.length} produit(s)`,
        items: validCartItems.map((item) => ({
          name: item.name,
          quantity: item.quantity,
          price: item.product.price,
          description: item.product.desc || 'Aucun détail fourni',
        })),
        customer: {
          phone: this.phoneNumber,
        },
      }),
    };

    try {
      const response = await fetch('https://api.notchpay.co/payments', options);
      const data = await response.json();

      if (response.ok && data.status === 'Accepted') {
        this.paymentReference = data.transaction.reference; // Sauvegarder la référence du paiement
        await this.showAlert('Succès', 'Paiement initialisé. Veuillez finaliser sur votre téléphone.');
        this.checkPaymentStatus(); // Vérifier l'état du paiement
      } else {
        await this.showAlert('Erreur', `Échec de l'initiation du paiement : ${data.message}`);
      }
    } catch (error) {
      console.error('Erreur lors de la requête :', error);
      await this.showAlert('Erreur', 'Une erreur est survenue. Veuillez réessayer.');
    } finally {
      this.isLoading = false;
    }
  }

  async checkPaymentStatus() {
    const checkInterval = setInterval(async () => {
      if (!this.paymentReference) return;

      const options = {
        method: 'GET',
        headers: {
          Authorization:
            'pk.gBKcZduPfvF3nbROusUrL3cGNovYKLj8izSxv3WOV9TaoGaePoZkCVRN7dcBcK1bQHmeZ9q0kLfGG4K05kxNQnPrAMmtoPI1ZZh89af3EGKGO6MTlKNa64ccizm06', // Remplacez par votre clé Notchpay
        },
      };

      try {
        const response = await fetch(
          `https://api.notchpay.co/payments/${this.paymentReference}`,
          options
        );
        const data = await response.json();

        if (data.transaction.status === 'complete') {
          clearInterval(checkInterval);
          this.cartService.clearCart(); // Vider le panier après un paiement réussi
          await this.showAlert('Succès', 'Paiement validé avec succès. Merci pour votre achat.');
        }
      } catch (error) {
        console.error('Erreur lors de la vérification du paiement:', error);
      }
    }, 3000); // Vérifier toutes les 3 secondes

    // Arrêter après 5 minutes
    setTimeout(() => {
      clearInterval(checkInterval);
      this.showAlert('Erreur', 'Le paiement a expiré. Veuillez réessayer.');
      this.isPaymentInProgress = false; // Remettre le flag à false lorsque le paiement expire
    }, 100000); // 5 minutes en millisecondes
  }

  // Méthode pour afficher une alerte
  async showAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['OK'],
    });
    await alert.present();
  }

  getTotalPrice(): number {
    return this.cartItems.reduce((total, item) => {
      const productPrice = item.product?.price || 0;
      const quantity = item.quantity || 0;
      return total + productPrice * quantity;
    }, 0);
  }
}
