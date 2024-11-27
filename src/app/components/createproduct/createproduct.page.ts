import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IonModal, ModalController } from '@ionic/angular';
import { ProductService } from 'src/app/services/product.service';
import { TopSongsService } from 'src/app/services/top-songs.service';

@Component({
  selector: 'app-createproduct',
  templateUrl: './createproduct.page.html',
  styleUrls: ['./createproduct.page.scss'],
})
export class CreateproductPage implements OnInit {
  productData = {
    id: '',
    title: '',
    desc: '',
    tags: '',
    price: null,
    units: null,
    category: null,
    related: '',
    images: null as File[] | null, // Array of files
    imagePreview: [] as string[], // Array of image preview URLs
  };
  showAlert = false;
  isSuccess = false;
  alertMessage = '';
  topSongs: any[] = [];
  filteredSongs: any[] = [];
  searchQuery: string = '';
  selectedSong: any = null;
  selectedCategory: string | null = null;
  showSongList: boolean = true;

  categories = [
    { id: 1, name: 's_other' },
    { id: 2, name: 's_clothes' },
    { id: 3, name: 's_electronic' },
  ];

  constructor(
    private modalController: ModalController,
    private productService: ProductService,
    private router: Router,
    private topsService: TopSongsService
  ) {}

  onSubmit() {
    if (this.productData.id) {
      // Modifier le produit existant
      this.productService.editProduct(this.productData).subscribe(
        async (response) => {
          if (response.status === 200) {
            this.showFeedback(true, 'Product updated successfully!');
            setTimeout(async () => {
              await this.closeModal(); // Fermer le modal
            }, 3000);
          }
            
          
        },
        (error) => {
          this.showFeedback(false, 'Error updating product.');
        }
      );
    } else {
      // Créer un nouveau produit
      this.productService.createProduct(this.productData).subscribe(
        async (response) => {
          if (response.status === 200) {
            this.showFeedback(true, 'Product created successfully!');
            await this.closeModal(); // Fermer le modal
          }
        },
        (error) => {
          if (error.status === 400) {
            this.showFeedback(false, error.error.error || 'Validation error.');
          } else {
            this.showFeedback(false, 'Unexpected error occurred.');
          }
        }
      );
    }
  }

  showFeedback(success: boolean, message: string) {
    this.isSuccess = success;
    this.alertMessage = message;
    this.showAlert = true;

    // Masquer l'alerte après 3 secondes
    setTimeout(() => {
      this.showAlert = false;
    }, 3000);
  }

  // onFileSelect(event: any) {
  //   const files = event.target.files;
  //   this.productData.images = Array.from(files);
  // }

  onFileSelect(event: Event): void {
    const input = event.target as HTMLInputElement;

    if (input.files?.length) {
      const files = Array.from(input.files); // Convert FileList to array
      this.productData.images = files; // Store all files

      // Clear the previous previews
      this.productData.imagePreview = []; // Ensure it's an array

      files.forEach((file) => {
        const reader = new FileReader();
        reader.onload = (e) => {
          if (!this.productData.imagePreview) {
            this.productData.imagePreview = []; // Initialize as array if null
          }
          this.productData.imagePreview.push(e.target?.result as string); // Push preview into array
        };
        reader.readAsDataURL(file);
      });
    }
  }

  async selectCategory(category: any): Promise<void> {
    this.selectedCategory = category.name;
    this.productData.category = category.id;

    // Dismiss the modal
    const modal = await this.modalController.getTop();
    if (modal) {
      await modal.dismiss();
    }
  }

  async closeModal(): Promise<void> {
    const modal = await this.modalController.getTop();
    if (modal) {
      await modal.dismiss();
    }
  }
  // selectCategory(category: any): void {
  //   this.selectedCategory = category.name;
  //   this.productData.category = category.id;
  //   this.closeModal();
  // }

  cancel(): void {
    console.log('Form Cancelled');
  }

  ngOnInit(): void {
    // Charger toutes les chansons à l'initialisation
    this.topsService.getTopSongs().subscribe(
      (response) => {
        this.topSongs = response.data;
        this.filteredSongs = [...this.topSongs]; // Initialiser la liste filtrée
      },
      (error) => {
        console.error(
          'Erreur lors de la récupération des Meilleur songs :',
          error
        );
      }
    );
  }

  // Mettre à jour la liste filtrée selon la recherche
  filterSongs() {
    const query = this.searchQuery.toLowerCase();
    if (query.trim() === '') {
      // Si la recherche est vide, afficher toutes les chansons
      this.filteredSongs = [...this.topSongs];
    } else {
      // Filtrer selon le titre
      this.filteredSongs = this.topSongs.filter((song) =>
        song.title.toLowerCase().includes(query)
      );
    }
    this.showSongList = true; // Réafficher la liste lors de la recherche
  }

  // Sélectionner une chanson
  selectSong(song: any) {
    this.selectedSong = song;
    this.productData.related = song.id; // Stocker l'ID de la chanson sélectionnée
    this.searchQuery = ''; // Réinitialiser la recherche
    this.showSongList = false; // Cacher la liste
  }

  // Effacer la chanson sélectionnée
  clearSelectedSong() {
    this.selectedSong = null;
    this.productData.related = ''; // Réinitialiser le champ
    this.showSongList = true; // Réafficher la liste
  }
}
