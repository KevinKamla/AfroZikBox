import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LecteurService } from 'src/app/services/lecteur.service';
import { ProductService } from 'src/app/services/product.service';
import { PlaylistService } from 'src/app/services/playlist.service';
import { BehaviorSubject, Subscription } from 'rxjs';
import { musicTab } from '../../play/play.page';

@Component({
  selector: 'app-productdetail',
  templateUrl: './productdetail.page.html',
  styleUrls: ['./productdetail.page.scss'],
})
export class ProductdetailPage implements OnInit {

  product: any;
  canEdit: boolean | undefined;
  canAccessPrivateTab!: boolean;
  isUserLogged: boolean = false;
  musictabOption = musicTab;
  currentSong: any;
  topSongs: any[] = [];
  latest: any[] = [];
  isPlaying = false;
  currentTime = 0;
  duration = 0;
  sonsCategorieActuelle: any[] = [];
  indexSonActuel: number = 0;
  private songSubscription: Subscription | undefined;
  private playSubscription: Subscription | undefined;
  private timeSubscription: Subscription | undefined;
  private durationSubscription: Subscription | undefined;

  accessToken: string = localStorage.getItem('accessToken') || '';
  userId: number = parseInt(localStorage.getItem('userId') || '0', 10);
  audio: HTMLAudioElement = new Audio();
  currentSongIndex: number = 0;
  sourceArray: any;
  topalbums: any[] = [];
  favoris: any[] = [];

  indexCurrentSong: number = 0;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private PlaylistService: PlaylistService,
    private musicPlayerService: LecteurService,
  ) {}

  ngOnInit() {
    // Récupérer l'utilisateur connecté depuis localStorage
    const userData = localStorage.getItem('UserData');
    if (userData) {
      const parsedUserData = JSON.parse(userData);
      this.userId = parsedUserData.id; // Stocker l'ID de l'utilisateur connecté
    }

    // Récupérer l'ID du produit et charger ses détails
    const productId = this.route.snapshot.paramMap.get('id');
    if (productId) {
      this.loadProductDetails(productId);
    }
  }

  loadProductDetails(productId: string) {
    this.productService.getProductById(productId).subscribe(
      (response) => {
        if (response.status === 200) {
          this.product = response.data; // Assigner les données du produit
          
          // Vérifier si l'utilisateur connecté est le créateur du produit
          if (this.userId && this.product.user_data.id === this.userId) {
            this.canEdit = true; // Activer le bouton Modifier
          }
        }
      },
      (error) => {
        console.error('Erreur lors du chargement des détails du produit :', error);
      }
    );
  }

  editProduct() {
    // Naviguer vers la page d'édition du produit en passant l'ID du produit
    //this.route.navigate(['/edit-product', this.product.id]);
    console.log('edit');
    
  }


  playMusic(song: any): void {
    // Appelez la méthode playMusic avec song et index
    this.musicPlayerService.playOne(song);
    musicTab.musicIsPlay = true;
    this.currentSong = song;
    console.log(this.currentSong);
  }

  stopMusic() {
    this.musicPlayerService.stopCurrentMusic();
    musicTab.musicIsPlay = false;
  }

  ngOnDestroy() {
    if (this.songSubscription) this.songSubscription.unsubscribe();
    if (this.playSubscription) this.playSubscription.unsubscribe();
    if (this.timeSubscription) this.timeSubscription.unsubscribe();
    if (this.durationSubscription) this.durationSubscription.unsubscribe();
  }

  closePlayer() {
    this.stopMusic();
    this.currentSong = null;
    musicTab.isClose = true;
  }

  togglePlayPause() {
    if (this.isPlaying) {
      this.musicPlayerService.pauseMusic();
    } else {
      this.musicPlayerService.resumeMusic();
    }
  }

  seekTo(event: any) {
    this.musicPlayerService.seekTo(event.detail.value);
  }

  addToCart(item: any): void {
    console.log('Ajout au panier:', item);
    this.productService.addToCart(item.id).subscribe({
      next: (response) => {
        console.log('Product added to cart:', response);
      },
      error: (error) => {
        console.error('Error adding to cart:', error);
      },
    });
    alert(`"${item.title}" a été ajouté au panier.`);
  }

}
