import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Camera, CameraResultType } from '@capacitor/camera';
import { ModalController, NavParams } from '@ionic/angular';
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
    private route: ActivatedRoute,
    private navParams: NavParams,
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

selectedConfid(item: string) {
  this.valueConfid = item;
  this.privacy = item === 'Publique' ? 1 : 0;
  this.closeModal();
}
  closeModal() {
    this.modalCtrl.dismiss();
  }
  
  ngOnInit() {
    console.log(this.playlistId,'playlist id')
    // this.id = this.route.snapshot.paramMap.get('id'); // Récupération de l'ID

    if (this.playlistId && this.playlistId.thumbnail_ready) {
      this.imgPath = this.playlistId.thumbnail_ready;
      this.isGetImg = true;
    } else {
      console.log("playlistId ou thumbnail_ready est undefined");
    }
  }

  updatePlaylist() {

    this.playlistService.updatePlaylist(this.playlistId, this.playlistName, this.privacy, this.avatarFile)
      .subscribe(response => {
        console.log(response,'response')
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
