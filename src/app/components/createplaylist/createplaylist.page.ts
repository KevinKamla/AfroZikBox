/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
import { Component, OnInit } from '@angular/core';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { ModalController } from '@ionic/angular';
import { PlaylistService } from 'src/app/services/playlist.service';

@Component({
  selector: 'app-createplaylist',
  templateUrl: './createplaylist.page.html',
  styleUrls: ['./createplaylist.page.scss'],
})
export class CreateplaylistPage implements OnInit {
  valueConfid = 'Confidentialité';
  isGetImg = false;
  imgPath: string = '';
  playlistName: string = '';
  avatarFile: File | null = null;
  privacy: number = 0;

  constructor(
    private modalCtrl: ModalController,
    private playlistService: PlaylistService
  ) { }

  async camera() {
    try {
      const image = await Camera.getPhoto({
        quality: 100,
        allowEditing: false,
        resultType: CameraResultType.Base64,
        source: CameraSource.Camera // Spécifiez CameraSource.Camera pour forcer la caméra
      });

      if (image) {
        const base64Image = image.base64String;
        this.imgPath = `data:image/jpeg;base64,${base64Image}`;
        this.isGetImg = true;
        this.avatarFile = this.dataURLtoFile(this.imgPath, 'image.jpg'); // Convertir en File
      }
    } catch (error) {
      console.error("Erreur caméra :", error);
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

  selectedConfid(item: string) {
    this.valueConfid = item;
    this.privacy = item === 'Publique' ? 1 : 0;
    this.closeModal();
  }

  closeModal() {
    this.modalCtrl.dismiss();
  }

  ngOnInit() { }

  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.avatarFile = file;
      this.imgPath = URL.createObjectURL(file); 
      this.isGetImg = true;
    }
  }

  createPlaylist() {
    console.log(this.avatarFile);
    
    if (!this.playlistName || !this.avatarFile) {
      console.error('Veuillez vérifier vos informations');
      return;
    }

    this.playlistService.createPlaylist(this.playlistName, this.privacy, this.avatarFile).subscribe(
      (response) => {
        if (response.status === 200) {
          this.closeModal();
          console.log('Playlist créée avec succès', response);
        } else {
          console.error('Erreur lors de la création de la playlist', response);
        }
      },
      (error) => {
        console.error('Erreur :', error);
      }
    );
  }
}
