/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
import { Component, OnInit } from '@angular/core';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { ModalController } from '@ionic/angular';
import { AlbumsService } from 'src/app/services/albums.service';

@Component({
  selector: 'app-createalbum',
  templateUrl: './createalbum.page.html',
  styleUrls: ['./createalbum.page.scss'],
})
export class CreatealbumPage implements OnInit {
  // album = {
  //   title: '',
  //   description: '',
  //   genre: '',
  //   price: '',
  //   image: '',
  // };

  isGetImg = false;
  imgPath: string = '';
  valueGenre = 'Genres';
  valuePrice = 'Prix';
  genreList: any[] = [];
  priceList: any[] = []; // Price list now fetched from API
  avatar: any; // Updated to use avatar for image file
  albumImage: File | undefined;
  selectedSongs: any[] = [];
  price: any;
  genre: any;
  title: any;
  description: any;
  avatarFile: any;

  constructor(
    private modal: ModalController,
    private albumService: AlbumsService
  ) {}

  // Handle file selection
  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.avatar = file; // Assign the file to avatar
      this.imgPath = URL.createObjectURL(file);
      this.isGetImg = true;
    }
    console.log('Selected avatar file:', this.avatar);
  }

  // Initialize component, fetch genres and prices
  ngOnInit() {
    this.fetchGenres();
    this.fetchPrices(); // Fetch prices from the API on initialization
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

  // Fetch prices from the API
  fetchPrices() {
    this.albumService.getPrices().subscribe(
      (response) => {
        this.priceList = response.data.map((item: any) => ({
          id: item.id,
          price: item.price,
        }));
      },
      (error) => {
        console.error('Error fetching prices:', error);
      }
    );
  }

  // Handle genre selection
  selectedGenre(genre: any) {
    this.genre = genre.name;
    this.valueGenre = genre.name;
  }

  // Handle price selection
  selectedPrix(price: any) {
    this.valuePrice = price.price;
    this.price = price.price;
  }

  // Submit form data
  submitForm() {
    console.log(this.title,
      this.description,
      this.genre,
      this.price,
      this.avatarFile, // Vérifie si une image est sélectionnée
      this.selectedSongs.length);
    
    if (
      this.title &&
      this.description &&
      this.genre &&
      this.price &&
      this.avatarFile
    ) {
      // console.log('Form data:', this.album);

      // Envoyer les données au serveur
      this.albumService
        .createAlbum(
          this.title,
          this.description,
          this.avatarFile, // Miniature de l'album
          +this.price, // Assurez-vous que le prix est un nombre
          +this.genre // Assurez-vous que le genre est un nombre
        )
        .subscribe((response) => {
          console.log(response);
        });
    } else {
      console.log('Veuillez remplir tous les champs.');
    }
  }

  dataURLtoFile(dataurl: string, filename: string): File {
    const arr = dataurl.split(',');
    const match = arr[0].match(/:(.*?);/); // Stockez le résultat de match()
    let mime = 'application/octet-stream'; // Valeur par défaut

    if (match) {
      mime = match[1];
    }

    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, { type: mime });
  }

  // Capture an image using the camera
  async camera() {
    try {
      const image = await Camera.getPhoto({
        quality: 100,
        allowEditing: false,
        resultType: CameraResultType.Base64,
        source: CameraSource.Camera, // Spécifiez CameraSource.Camera pour forcer la caméra
      });

      if (image) {
        const base64Image = image.base64String;
        this.imgPath = `data:image/jpeg;base64,${base64Image}`;
        this.isGetImg = true;
        this.avatarFile = this.dataURLtoFile(this.imgPath, 'image.jpg'); // Convertir en File
      }
    } catch (error) {
      console.error('Erreur caméra :', error);
      // Si la caméra échoue, proposer la sélection de fichier
      const input = document.createElement('input');
      input.type = 'file';
      input.accept = 'image/*';
      input.onchange = (event: any) => {
        const file = event.target.files[0];
        if (file) {
          this.avatarFile = file;
          this.imgPath = URL.createObjectURL(file);
          this.isGetImg = true;
        }
      };
      input.click();
    }
  }

  // Convert base64 string to a Blob
  base64ToBlob(base64: string, type: string) {
    const binary = atob(base64.replace(/\s/g, ''));
    const array = [];
    for (let i = 0; i < binary.length; i++) {
      array.push(binary.charCodeAt(i));
    }
    return new Blob([new Uint8Array(array)], { type: type });
  }

  // Open the genre modal
  openGenreModal() {
    this.showGenreModal();
  }

  // Open the price modal
  openPriceModal() {
    this.showPriceModal();
  }

  // Simulate genre modal selection
  async showGenreModal() {
    this.selectedGenre(this.valueGenre);
    // Genre is already set in the album object inside selectedGenre()
  }

  // Simulate price modal selection
  async showPriceModal() {
    this.selectedPrix(this.valuePrice);
    // Price is already set in the album object inside selectedPrix()
  }
}
