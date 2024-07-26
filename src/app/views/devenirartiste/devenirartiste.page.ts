/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
import { Component, OnInit } from '@angular/core';
import { Camera, CameraResultType } from '@capacitor/camera';
import { FileChooser } from '@ionic-native/file-chooser/ngx';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-devenirartiste',
  templateUrl: './devenirartiste.page.html',
  styleUrls: ['./devenirartiste.page.scss'],
})
export class DevenirartistePage implements OnInit {

  isGetImg = false;
  imgPath: string = '';
  valueGenre = 'Genres'
  genreList = ['Afrozouk', 'Afrobeat', 'Afropop', 'Afrotrap', 'Amapiano', 'Ancestral Soul', 'Assiko',
    'Azonto', ' Batuque', 'Bend-skin', 'Bikutsi', 'Bongo Flava', 'Coupé-décalé', 'Dancehall',
    'Gqom', 'Highlife', 'Kizomba', 'Kwaito', 'Makossa', 'Maloya', 'Mapouka', 'Mbalax', 'Morna',
    'Ndombolo', 'Rumba congolaise', 'Sega', 'Soukous', 'Swede Swede', 'Tribal House', 'Wassoulou',
    'Zaïko', 'Ziglibithy', 'Zoblazo', 'Zouglou', 'Zouk'];

  imgMucic: string = '';

  constructor(
    private modal: ModalController,
    private fileChooser: FileChooser
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


  async pickAudioFile() {
    const result = await this.fileChooser.open({
      mime: 'audio/mp3',      
    });
  
    if (result && result.length > 0) {
      const fileObject = result[0];
      // const filePath = fileObject.nativeURL;
      
    }
    this.imgMucic = 'assets/icon/son.png';
  }



  selectedGenre(item: string) {
    this.valueGenre = item
    this.modal.dismiss()
  }
  ngOnInit() {
  }

}
