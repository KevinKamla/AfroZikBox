/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
import { Component, OnInit } from '@angular/core';
import { Camera, CameraResultType } from '@capacitor/camera';
import { ActionSheetController, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-createalbum',
  templateUrl: './createalbum.page.html',
  styleUrls: ['./createalbum.page.scss'],
})
export class CreatealbumPage implements OnInit {

  isGetImg = false;
  imgPath: string = '';
  valueGenre = 'Genres'
  valuePrice = 'Prix'
  genreList = ['Afrozouk', 'Afrobeat', 'Afropop', 'Afrotrap', 'Amapiano', 'Ancestral Soul', 'Assiko',
    'Azonto', ' Batuque', 'Bend-skin', 'Bikutsi', 'Bongo Flava', 'Coupé-décalé', 'Dancehall',
    'Gqom', 'Highlife', 'Kizomba', 'Kwaito', 'Makossa', 'Maloya', 'Mapouka', 'Mbalax', 'Morna',
    'Ndombolo', 'Rumba congolaise', 'Sega', 'Soukous', 'Swede Swede', 'Tribal House', 'Wassoulou',
    'Zaïko', 'Ziglibithy', 'Zoblazo', 'Zouglou', 'Zouk']
  priceList = ['$1.99', '$4.99', '$8.99', '$11.99', '$16.99', '$19.99',]

  constructor(
    private modal: ModalController,
  ) { }


  async camera() {
    const image = await Camera.getPhoto({
      quality: 100,
      allowEditing: false,
      resultType: CameraResultType.Base64
    });

    this.imgPath = 'data:image/png;base64,' + image.base64String
    this.isGetImg = true
  }

  selectedGenre(item: string) {
    this.valueGenre = item
    this.modal.dismiss()
  }
  
  selectedPrix(item: string) {
    this.valuePrice = item
    this.modal.dismiss()
  }

  ngOnInit() {
  }

}
