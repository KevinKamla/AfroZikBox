/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
import { Component, OnInit } from '@angular/core';
import { Camera, CameraOptions, CameraResultType } from '@capacitor/camera';
import { FileChooser } from '@ionic-native/file-chooser/ngx';
import { ModalController, ToastController } from '@ionic/angular';
import { AlbumsService } from 'src/app/services/albums.service';
import { SongsService } from 'src/app/services/songs.service';

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
  genre: any | undefined;
  price: string | undefined;
  description: string | undefined;
  lyrics: string | undefined;
  genreList: Array<{ id: string; name: string }> = [];

  selectedImage: string | undefined; // Store base64 image
  songLink: string | undefined; // URL of the uploaded song
  selectedGenreId: string | null = null; // ID du genre sélectionné
  // genreList: any[] = []; // Liste des genres

  imgMusic: string = '';
  file: any;
  // songTitle: string = '';
  // ageRestriction: number | null = null;
  // downloadPermission: number | null = null;

  constructor(
    private modal: ModalController,
    private fileChooser: FileChooser,
    private toastController: ToastController,
    private songUploadService: SongsService,
    private albumService: AlbumsService
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
  selectedGenre(event: any) {
    const selectedId = event.detail.value; // ID sélectionné
    const selectedGenre = this.genreList.find(
      (genre) => genre.id === selectedId
    );
    if (selectedGenre) {
      this.genre = selectedGenre.id; // Utiliser l'ID du genre
    } else {
      this.genre = null;
    }
    this.modal.dismiss();
  }

  // onGenreChange(event: any) {
  //   const selectedId = event.detail.value; // Récupère la valeur sélectionnée (l'ID)
  //   this.selectedGenre = this.genreList.find((genre) => genre.id === selectedId);

  //   if (this.selectedGenre) {
  //     console.log('Genre sélectionné:', this.selectedGenre);
  //     // Faites ce que vous voulez avec le genre sélectionné, par exemple :
  //     this.modal.dismiss({
  //       genreId: this.selectedGenre.id,
  //       genreName: this.selectedGenre.name,
  //     });
  //   } else {
  //     console.warn('Genre introuvable pour l\'ID:', selectedId);
  //   }
  // }

  imgFile: File | null = null;
  audioFile: File | null = null;

  async selectPicture() {
    try {
      const image = await Camera.getPhoto({
        quality: 100,
        allowEditing: false,
        resultType: CameraResultType.Uri,
      });
      const blob = await fetch(image.webPath!).then((res) => res.blob());
      this.imgFile = new File([blob], 'song-thumbnail.jpg');
      this.imgPath = URL.createObjectURL(blob);
      this.isGetImg = true;
    } catch (error) {
      this.presentToast("Erreur lors de la sélection de l'image.");
    }
  }

  async pickAudioFile() {
    try {
      const result = await this.fileChooser.open({
        mime: 'audio/mp3',
      });

      if (result && result.length > 0) {
        // The result will be a list of file paths, not file objects.
        const filePath = result[0];

        // Create a new File object using the file path
        const fileObject = await this.createFileObject(filePath);
        this.audioFile = fileObject; // Assign the File object

        console.log('Audio file selected:', fileObject);
      }
    } catch (error) {
      this.presentToast('Error selecting audio file');
    }
  }

  // Helper function to create a File object from the file path
  private async createFileObject(filePath: string): Promise<File> {
    const fileEntry = await this.file.resolveLocalFilesystemUrl(filePath);
    const file = await fileEntry.file();
    return new File([file], file.name, { type: file.type });
  }

  // async selectPicture() {
  //   const options = {
  //     quality: 100,
  //     resultType: CameraResultType.Base64, // Get the image as a Base64 string
  //   };

  //   try {
  //     const image = await Camera.getPhoto(options);
  //     this.imgPath = 'data:image/jpeg;base64,' + image.base64String; // Use the base64String to set the image
  //     this.isGetImg = true;
  //   } catch (error) {
  //     console.error('Error selecting image', error);
  //   }
  // }
  // async pickAudioFile() {
  //   try {
  //     const result = await this.fileChooser.open({
  //       mime: 'audio/mp3',
  //     });

  //     if (result && result.length > 0) {
  //       const fileObject = result[0];
  //       // Add logic to handle audio file upload, like file path, etc.
  //     }
  //     this.imgMusic = 'assets/icon/son.png'; // Display default audio icon
  //   } catch (error) {
  //     this.presentToast('Error selecting audio file');
  //   }
  // }

  onAudioFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.audioFile = file;
      console.log('Fichier audio sélectionné :', file.name);
    } else {
      this.audioFile = null;
      console.warn('Aucun fichier sélectionné.');
    }
  }

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

  // selectedGenre(item: string) {
  //   this.valueGenre = item;
  //   this.modal.dismiss(); // Close the modal after selecting genre
  // }

  // Handle genre selection
  //  selectedGenre(genre: any) {
  //   this.genre = genre.name;
  //   this.valueGenre = genre.name;
  //   this.modal.dismiss();
  // }

  // async createTrack() {
  //   if (!this.songTitle) {
  //     this.presentToast('Please enter a song title');
  //     return;
  //   }

  //   if (!this.imgPath) {
  //     this.presentToast('Please select an image');
  //     return;
  //   }

  //   // Implement logic to create and submit the track
  //   const trackData = {
  //     title: this.songTitle,
  //     genre: this.valueGenre,
  //     ageRestriction: this.ageRestriction,
  //     downloadPermission: this.downloadPermission,
  //     image: this.imgPath,
  //   };

  //   // Example toast for feedback after track creation
  //   this.presentToast('Track created successfully!');
  //   console.log('Track data:', trackData);
  // }

  createTrack() {
    console.log(this.genre);

    if (!this.validateForm()) return;
    console.log(this.imgFile);
    
    const formData = new FormData();
    formData.append('title', this.songTitle!);
    formData.append('description', this.description!);
    formData.append('tags', this.tags!);
    formData.append('genre', this.genre!);
    formData.append('price', this.price?.toString() || '0');
    formData.append('lyrics', this.lyrics!);
    formData.append('age_restriction', this.ageRestriction.toString());
    formData.append('allow_downloads', this.downloadPermission.toString());
    if (this.imgFile) formData.append('song-thumbnail', this.imgFile, this.imgFile.name);
    if (this.audioFile) formData.append('song-location', this.audioFile);

    this.songUploadService.uploadSong(formData).subscribe({
      next: (response) =>
        this.presentToast('Chanson téléchargée avec succès !'),
      error: (err) =>
        this.presentToast('Erreur lors du téléchargement de la chanson.'),
    });
  }

  // Validation du formulaire
  validateForm(): boolean {
    if (!this.songTitle || this.songTitle.trim().length < 3) {
      this.presentToast(
        'Le titre de la chanson doit contenir au moins 3 caractères.'
      );
      return false;
    }
    if (
      !this.price ||
      isNaN(parseFloat(this.price)) ||
      parseFloat(this.price) < 0
    ) {
      this.presentToast('Veuillez entrer un prix valide.');
      return false;
    }
    if (!this.genre) {
      this.presentToast('Veuillez sélectionner un genre valide.');
      return false;
    }
    if (!this.imgFile) {
      this.presentToast('Veuillez sélectionner une image.');
      return false;
    }
    if (!this.audioFile) {
      this.presentToast('Veuillez sélectionner un fichier audio.');
      return false;
    }
    return true;
  }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 2000,
      position: 'bottom',
    });
    toast.present();
  }

  ngOnInit() {
    this.fetchGenres();
  }

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
