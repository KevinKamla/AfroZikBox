/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
import { Component, OnInit } from '@angular/core';
import { Camera, CameraOptions, CameraResultType } from '@capacitor/camera';
import { FileChooser } from '@ionic-native/file-chooser/ngx';
import { ModalController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-createsound',
  templateUrl: './createsound.page.html',
  styleUrls: ['./createsound.page.scss'],
})
export class CreatesoundPage implements OnInit {
  isGetImg = false;
  imgPath: string = '';
  valueGenre = 'Genres';
  songTitle: string | undefined;
  ageRestriction: number = 0;
  downloadPermission: number = 1;
  tags: string | undefined;
  genre: string | undefined;
  price: string | undefined;
  description: string | undefined;
  lyrics: string | undefined;

  selectedImage: string | undefined; // Store base64 image
  songLink: string | undefined; // URL of the uploaded song
  genreList = [
    'Afrozouk',
    'Afrobeat',
    'Afropop',
    'Afrotrap',
    'Amapiano',
    'Ancestral Soul',
    'Assiko',
    'Azonto',
    'Batuque',
    'Bend-skin',
    'Bikutsi',
    'Bongo Flava',
    'Coupé-décalé',
    'Dancehall',
    'Gqom',
    'Highlife',
    'Kizomba',
    'Kwaito',
    'Makossa',
    'Maloya',
    'Mapouka',
    'Mbalax',
    'Morna',
    'Ndombolo',
    'Rumba congolaise',
    'Sega',
    'Soukous',
    'Swede Swede',
    'Tribal House',
    'Wassoulou',
    'Zaïko',
    'Ziglibithy',
    'Zoblazo',
    'Zouglou',
    'Zouk',
  ];

  imgMusic: string = '';
  // songTitle: string = '';
  // ageRestriction: number | null = null;
  // downloadPermission: number | null = null;

  constructor(
    private modal: ModalController,
    private fileChooser: FileChooser,
    private toastController: ToastController // Added ToastController for feedback
  ) {}

  async camera() {
    try {
      const image = await Camera.getPhoto({
        quality: 100,
        allowEditing: false,
        resultType: CameraResultType.Base64,
      });

      this.imgPath = 'data:image/png;base64,' + image.base64String;
      this.isGetImg = true;
    } catch (error) {
      this.presentToast('Error capturing image');
    }
  }

  async selectPicture() {
    const options = {
      quality: 100,
      resultType: CameraResultType.Base64, // Get the image as a Base64 string
    };

    try {
      const image = await Camera.getPhoto(options);
      this.imgPath = 'data:image/jpeg;base64,' + image.base64String; // Use the base64String to set the image
      this.isGetImg = true;
    } catch (error) {
      console.error('Error selecting image', error);
    }
  }
  async pickAudioFile() {
    try {
      const result = await this.fileChooser.open({
        mime: 'audio/mp3',
      });

      if (result && result.length > 0) {
        const fileObject = result[0];
        // Add logic to handle audio file upload, like file path, etc.
      }
      this.imgMusic = 'assets/icon/son.png'; // Display default audio icon
    } catch (error) {
      this.presentToast('Error selecting audio file');
    }
  }

  selectedGenre(item: string) {
    this.valueGenre = item;
    this.modal.dismiss(); // Close the modal after selecting genre
  }

  async createTrack() {
    if (!this.songTitle) {
      this.presentToast('Please enter a song title');
      return;
    }

    if (!this.imgPath) {
      this.presentToast('Please select an image');
      return;
    }

    // Implement logic to create and submit the track
    const trackData = {
      title: this.songTitle,
      genre: this.valueGenre,
      ageRestriction: this.ageRestriction,
      downloadPermission: this.downloadPermission,
      image: this.imgPath,
    };

    // Example toast for feedback after track creation
    this.presentToast('Track created successfully!');
    console.log('Track data:', trackData);
  }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 2000,
      position: 'bottom',
    });
    toast.present();
  }

  ngOnInit() {}

  clearImage() {
    this.imgPath = '';
    this.isGetImg = false;
  }

  openAgeRestrictionDropdown() {
    // Logic to open age restriction dropdown, or directly handled in HTML
  }

  openDownloadDropdown() {
    // Logic to open download permission dropdown, or directly handled in HTML
  }
}
