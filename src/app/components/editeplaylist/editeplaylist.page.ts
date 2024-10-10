import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Camera, CameraResultType } from '@capacitor/camera';
import { ModalController } from '@ionic/angular';
import { PlaylistService } from 'src/app/services/playlist.service';

@Component({
  selector: 'app-editeplaylist',
  templateUrl: './editeplaylist.page.html',
  styleUrls: ['./editeplaylist.page.scss'],
})
export class EditeplaylistPage implements OnInit {

  @Input() playlistId: any | undefined;
  playlistEdit: any | null = null;
  valueConfid = 'Publique';
  isGetImg = false;
  imgPath: string = '';
  avatarFile: File | undefined;
  playlistName: string = '';
  privacy: number = 0;
  playlistid: any

  id:any
  constructor(
    private modalCtrl: ModalController,
    private playlistService: PlaylistService,
    private route: ActivatedRoute
  ) { }


  async camera() {
    const image = await Camera.getPhoto({
      quality: 100,
      allowEditing: false,
      resultType: CameraResultType.Base64
    });

    this.imgPath = 'data:image/png;base64,' + image.base64String
    this.isGetImg = true;
    this.avatarFile = this.dataURLtoFile(this.imgPath, 'image.jpg'); // Convertir en File

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

  selectedConfid(item:string) {
    this.valueConfid = item;
    this.closeModal();
  }

  closeModal() {
    this.modalCtrl.dismiss();
  }
  
  ngOnInit() {
    console.log(this.playlistId,'playlist id')
    this.id = this.route.snapshot.paramMap.get('id'); // Récupération de l'ID

    if (this.playlistId && this.playlistId.thumbnail_ready) {
      this.imgPath = this.playlistId.thumbnail_ready;
      this.isGetImg = true;
    } else {
      console.log("playlistId ou thumbnail_ready est undefined");
    }
  }

  // updatePlaylist() {
  //   console.log(this.avatarFile);
    
  //   if (!this.playlistId || !this.playlistName || !this.avatarFile) {
  //     console.error('Veuillez vérifier vos informations');
  //     return;
  //   }

  //   this.playlistService.updatePlaylist(this.playlistId, this.playlistName, this.privacy, this.avatarFile).subscribe(
  //     (response) => {
  //       if (response.status === 200) {
  //         this.closeModal();
  //         console.log('Playlist mise à jour avec succès', response);
  //       } else {
  //         console.error('Erreur lors de la mise à jour de la playlist', response);
  //       }
  //     },
  //     (error) => {
  //       console.error('Erreur :', error);
  //     }
  //   );
  // }
  updatePlaylist() {
    this.playlistid = this.route.snapshot.paramMap.get('id'); // Récupération de l'ID
    console.log(this.id,'playlist id')

    if (!this.id) {
      console.error('playlistid est undefined');
      return; // Sortir de la méthode si playlistid n'est pas défini
    }

    const playlistIdString = this.id.toString();

    this.playlistService.updatePlaylist(playlistIdString, this.playlistName, this.privacy, this.avatarFile)
      .subscribe(response => {
        if (response.status === 200) {
          console.log('Playlist mise à jour avec succès');
        } else {
          console.error('Erreur lors de la mise à jour de la playlist');
        }
      }, error => {
        console.error('Erreur serveur', error);
      });
  }

}
