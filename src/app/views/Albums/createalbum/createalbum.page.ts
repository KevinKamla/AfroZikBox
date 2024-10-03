/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
import { Component, OnInit } from '@angular/core';
import { Camera, CameraResultType } from '@capacitor/camera';
import { ActionSheetController, ModalController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlbumsService } from 'src/app/services/albums.service'

@Component({
  selector: 'app-createalbum',
  templateUrl: './createalbum.page.html',
  styleUrls: ['./createalbum.page.scss'],
})
export class CreatealbumPage implements OnInit {

  album = {
    title: '',
    description: '',
    genre: '',
    price: '',
    image: ''
  };

  isGetImg = false;
  imgPath: string = '';
  valueGenre = 'Genres'
  valuePrice = 'Prix'
  genreList = ['Afrozouk', 'Afrobeat', 'Afropop', 'Afrotrap', 'Amapiano', 'Ancestral Soul', 'Assiko',
    'Azonto', ' Batuque', 'Bend-skin', 'Bikutsi', 'Bongo Flava', 'Coupé-décalé', 'Dancehall',
    'Gqom', 'Highlife', 'Kizomba', 'Kwaito', 'Makossa', 'Maloya', 'Mapouka', 'Mbalax', 'Morna',
    'Ndombolo', 'Rumba congolaise', 'Sega', 'Soukous', 'Swede Swede', 'Tribal House', 'Wassoulou',
    'Zaïko', 'Ziglibithy', 'Zoblazo', 'Zouglou', 'Zouk']
  priceList = ['1.99', '4.99', '8.99', '11.99', '16.99', '19.99',]

  constructor(private modal: ModalController,private albumService:AlbumsService) {
  }

// Fonction pour soumettre le formulaire
submitForm() {
  if (this.album.title && this.album.description && this.album.genre && this.album.price) {
    console.log('Données du formulaire :', this.album);
    // Envoyer les données au serveur ou les traiter comme nécessaire
  } else {
    console.log('Données du formulaire :', this.album);
    console.log('Veuillez remplir tous les champs.');
  }
  this.albumService.getSubmitAlbum('', {
    title: this.album.title,
    description: this.album.description,
    category_id: this.album.genre,
    'album-price': this.album.price,
    'album-thumbnail': this.album.image
  }).subscribe((response) =>{
    console.log(response);
  })
}
  async camera() {
    const image = await Camera.getPhoto({
      quality: 100,
      allowEditing: false,
      resultType: CameraResultType.Base64
    });

    this.imgPath = 'data:image/png;base64,' + image.base64String
    this.isGetImg = true
    // console.log(this.imgPath)
    this.album.image=this.imgPath
    // console.log(this.album.image)
  }

  selectedGenre(item: string) {
    this.valueGenre = item
    // this.modal.dismiss()
    return this.valueGenre
  }
  
  selectedPrix(item: string) {
    this.valuePrice = item
    // this.modal.dismiss()
    return this.valuePrice
  }

   // Fonction pour ouvrir la modale du genre
   openGenreModal() {
    this.showGenreModal();
  }

  // Fonction pour ouvrir la modale du prix
  openPriceModal() {
    this.showPriceModal();
  }

  // Simule la modale pour sélectionner le genre
  async showGenreModal() {
    const genre = await this.selectedGenre(this.valueGenre);
    if (genre) {
      this.album.genre = genre;
    }
  }

  // Simule la modale pour sélectionner le prix
  async showPriceModal() {
    const price = await this.selectedPrix(this.valuePrice);
    if (price) {
      this.album.price = price;
    }
  }

  ngOnInit() {
  }

}