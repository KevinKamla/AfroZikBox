import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { AlbumsService } from 'src/app/services/albums.service';
import { FavoriteService } from 'src/app/services/favorite.service';
import { ProductService } from 'src/app/services/product.service';
import { SuggestionsService } from 'src/app/services/suggestions.service';
import { TopAlbumsService } from 'src/app/services/top-albums.service';

@Component({
  selector: 'app-afrozikstore',
  templateUrl: './afrozikstore.page.html',
  styleUrls: ['./afrozikstore.page.scss'],
})
export class AfrozikstorePage implements OnInit {
  selectedSegment = 'chansons';
  genreList: any[] = [];
  displayBtn = 'none';
  priceRange = { min: 500, max: 10000 };
  categories: string[] = ['Vêtements', 'Electronique', 'Autre'];
  selectedCategories: string[] = [];
  filteredProducts: any[] = [];
  topalbums: any[] = [];
  topSongs: any[] = [];
  albumSongs: { [key: string]: any[] } = {};
  filteredAlbums: any[] = [];
  selectedGenres: string[] = [];
  valueRangeMin: number = 0;
  valueRangeMax: number = 100;
  albumsToShow: number = 7; // Nombre d'albums affichés par défaut
  step: number = 7;
  latest: any;
  love: boolean = false;
  currentSong: any;
  favoris: any[] = [];
  isLoading: boolean = true;
  cartItemCount: number = 0;
  constructor(
    private albumService: AlbumsService,
    private productService: ProductService,
    private topAlbumsService: TopAlbumsService,
    private route: Router,
    private favoriteService: FavoriteService,
    private loadingCtrl: LoadingController
  ) {}

  ngOnInit() {
    this.fetchGenres();
    this.loadProducts();
    this.loadAlbums();
    this.topsheller();
    // this.isFavorite();
    this.updateCartItemCount();
    this.productService.cartItemCount$.subscribe((count) => {
      this.cartItemCount = count;
      console.log(this.cartItemCount);
      
    });
  }

  updateCartItemCount() {
    this.productService.getCartItems().subscribe({
      next: (response) => {
        console.log(response.array);
        
        this.cartItemCount = response?.array.length || 0;
        console.log( 'ici',this.cartItemCount);
        
      },
      error: (error) => {
        console.error('Error fetching cart items:', error);
        this.cartItemCount = 0;
      },
    });
  }

  // Méthode pour afficher le loader
  async presentLoading(message: string = 'Chargement...') {
    const loading = await this.loadingCtrl.create({
      message,
      spinner: 'crescent',
      duration: 10000, // Durée maximale (peut être annulée manuellement)
    });
    await loading.present();
    return loading;
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

  accessToken: string = localStorage.getItem('accessToken') || '';
  userId: number = parseInt(localStorage.getItem('userId') || '0', 10);
  // isFavorite(song:any) {
  //   this.favoriteService
  //     .getFavorites(this.userId, this.accessToken)
  //     .subscribe((res) => {
  //       this.favoris = res.data.data;
  //       console.log(this.favoris);

  //       const isFavorite = this.favoris.find(
  //         (favorite) => favorite.id === song.id
  //       );
  //       this.love = isFavorite;
  //     });
  // }
  loadAlbums() {
    this.presentLoading('Chargement des albums...').then((loader) => {
      this.topAlbumsService.getTopAlbums().subscribe(
        (response) => {
          loader.dismiss();
          this.topalbums = response.top_albums.filter(
            (album: any) => album.price > 0
          );
          this.filteredAlbums = [...this.topalbums]; // Initialement, tous les albums sont affichés
          this.loadSongsForTopAlbums();
        },
        (error) => {
          loader.dismiss();
          console.error(
            'Erreur lors de la récupération des meilleurs albums :',
            error
          );
        }
      );
    });
  }

  loadMoreAlbums() {
    if (this.albumsToShow < this.topalbums.length) {
      this.albumsToShow += this.step;
    }
  }

  // Vérifie s'il reste des albums à afficher
  hasMoreAlbums(): boolean {
    return this.albumsToShow < this.topalbums.length;
  }
  // Charger les produits sans filtres
  async loadProducts() {
    const loader = await this.presentLoading('Chargement des produits...');
    this.productService.getProducts().subscribe(
      (response) => {
        loader.dismiss();
        if (response.status === 200) {
          this.filteredProducts = this.processProducts(response.data);
        }
      },
      (error) => {
        loader.dismiss();
        console.error('Erreur lors du chargement des produits:', error);
      }
    );
  }

  // Méthode pour traiter les produits et extraire les miniatures
  processProducts(products: any[]): any[] {
    return products.map((product) => ({
      ...product,
      thumbnail:
        product.images && product.images.length > 0
          ? product.images[0].image
          : 'assets/placeholder.png',
    }));
  }

  goToProductDetail(productId: string) {
    this.route.navigate(['/productdetail', productId]);
  }

  loadSongsForTopAlbums() {
    this.topalbums.forEach((album) => {
      this.albumService.getAlbumsr(album.id, '').subscribe(
        (response) => {
          this.albumSongs[album.id] = response.songs;
        },
        (error) => {
          console.error(
            `Erreur lors de la récupération des chansons pour l'album ${album.id} :`,
            error
          );
        }
      );
    });
  }

  toggleFavorite(trackId: number) {
    this.favoriteService.toggleFavorite(trackId).subscribe({
      next: (response) => {
        if (response.status === 200) {
          this.love = !this.love; // Toggle the liked status
          console.log('Successfully toggled favorite:', response.mode);
        } else {
          console.error('Error toggling favorite:', response.error);
        }
      },
    });
    this.favoriteService.toggleFavorite(trackId).subscribe({
      next: (response) => {
        if (response.status === 200) {
          this.love = !this.love; // Toggle the liked status
          console.log('Successfully toggled favorite:', response.mode);
          console.log('successs', response);
        } else {
          console.error('Error toggling favorite:', response.error);
        }
      },
      error: (err) => {
        console.error('Error toggling favorite:', err);
      },
    });
  }

  async topsheller() {
    const loader = await this.presentLoading(
      'Chargement des meilleures ventes...'
    );
    this.topAlbumsService.getTopAlbums().subscribe(
      (response) => {
        loader.dismiss();
        this.latest = response.top_seller_songs;
        console.log(this.latest);
      },
      (error) => {
        loader.dismiss();
        console.error(
          'Erreur lors de la récupération des meilleures ventes :',
          error
        );
      }
    );
  }
  selectAlbum(album: any) {
    localStorage.setItem('selectedAlbum', JSON.stringify(album));
    this.route.navigate(['albumdetail', album.id]);
  }

  // Capture le changement dans la plage de prix
  onPriceRangeChange() {
    console.log('Plage de prix mise à jour:', this.priceRange);
  }

  // Gère la sélection/désélection des catégories
  onCategoryChange(event: any, category: string) {
    if (event.detail.checked) {
      this.selectedCategories.push(category);
    } else {
      const index = this.selectedCategories.indexOf(category);
      if (index > -1) this.selectedCategories.splice(index, 1);
    }
    console.log('Catégories sélectionnées:', this.selectedCategories);
  }

  // Appliquer les filtres pour recharger les produits
  applyFilters() {
    this.filteredAlbums = this.topalbums.filter((album: any) => {
      const withinPriceRange =
        album.price >= this.valueRangeMin && album.price <= this.valueRangeMax;

      const matchesGenre =
        this.selectedGenres.length === 0 ||
        this.selectedGenres.includes(album.category_name);

      return withinPriceRange && matchesGenre;
    });
  }

  // Fetch genres from the API
  fetchGenres() {
    this.albumService.getGenres().subscribe(
      (response) => {
        this.genreList = response.data.map((item: any) => ({
          id: item.id,
          name: item.cateogry_name,
        }));
      },
      (error) => {
        console.error('Error fetching genres:', error);
      }
    );
  }

  toggleGenre(genre: string, isChecked: boolean) {
    if (isChecked) {
      this.selectedGenres.push(genre);
    } else {
      this.selectedGenres = this.selectedGenres.filter((g) => g !== genre);
    }
    this.applyFilters();
  }

  rangeChange(event: any) {
    const { lower, upper } = event.detail.value;
    this.valueRangeMin = lower;
    this.valueRangeMax = upper;
    this.applyFilters();
  }
}
