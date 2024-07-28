/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
import { Component, OnInit } from '@angular/core';
import { Camera, CameraResultType } from '@capacitor/camera';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-devenirartiste',
  templateUrl: './devenirartiste.page.html',
  styleUrls: ['./devenirartiste.page.scss'],
})
export class DevenirartistePage implements OnInit {

  isGetImg = false;
  isGetImgCNI = false;
  imgPath: string = '';
  imgCNIPath: string = '';
  valueGenre = 'Genres'
  genreList = ['Afrozouk', 'Afrobeat', 'Afropop', 'Afrotrap', 'Amapiano', 'Ancestral Soul', 'Assiko',
    'Azonto', ' Batuque', 'Bend-skin', 'Bikutsi', 'Bongo Flava', 'Coupé-décalé', 'Dancehall',
    'Gqom', 'Highlife', 'Kizomba', 'Kwaito', 'Makossa', 'Maloya', 'Mapouka', 'Mbalax', 'Morna',
    'Ndombolo', 'Rumba congolaise', 'Sega', 'Soukous', 'Swede Swede', 'Tribal House', 'Wassoulou',
    'Zaïko', 'Ziglibithy', 'Zoblazo', 'Zouglou', 'Zouk'];


  constructor(
    private modal: ModalController,
  ) { }


  async camera(nb: number) {
    const image = await Camera.getPhoto({
      quality: 100,
      allowEditing: false,
      resultType: CameraResultType.Base64
    });
    if (nb === 0) {
      this.imgPath = 'data:image/png;base64,' + image.base64String
      this.isGetImg = true
    } else {
      this.imgCNIPath = 'data:image/png;base64,' + image.base64String
      this.isGetImgCNI = true
    }
  }


  selectedGenre(item: string) {
    this.valueGenre = item
    this.modal.dismiss()
  }
  ngOnInit() {
  }

}
