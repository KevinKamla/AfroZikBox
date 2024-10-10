import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AlertController, ModalController, NavParams } from '@ionic/angular';
import { EditeplaylistPage } from '../editeplaylist/editeplaylist.page';
import { PlaylistService } from 'src/app/services/playlist.service';

@Component({
  selector: 'app-playlistoption',
  templateUrl: './playlistoption.page.html',
  styleUrls: ['./playlistoption.page.scss'],
})
export class PlaylistoptionPage implements OnInit {

  
  @Input() playlistId: any | undefined;
  @Output() playlistDeleted = new EventEmitter<{ id: number, success: boolean }>();;
  playlistIdToDelete: any | null = null;
  constructor(
    private modalCtrl: ModalController,
    public playlistService: PlaylistService,
    private navParams: NavParams,
    private alertController: AlertController // Ajoutez AlertController
  ) {}

  async presentAlertConfirm() {
    const alert = await this.alertController.create({
      header: 'Supprimer la playlist',
      message: 'Êtes-vous sûr de vouloir supprimer cette playlist ?',
      buttons: [
        {
          text: 'Annuler',
          role: 'cancel',
          handler: () => {
            // Rien à faire si l'utilisateur annule
          },
        },
        {
          text: 'Supprimer',
          handler: () => {
            this.deletePlaylist();
          },
        },
      ],
    });

    await alert.present();
  }

  async openEditPlaylist(playlistId: any) {
    this.closeModal();
    const modale = await this.modalCtrl.create({
      component: EditeplaylistPage,
      componentProps: { playlistId },
      initialBreakpoint: 0.75,
      breakpoints: [0.5, 0.75, 1],
      mode: 'ios',
    });
    await modale.present();
  }

  setPlaylistIdToDelete(playlistId: number) {
    this.playlistIdToDelete = playlistId;
  }

  deletePlaylist() {
    if (!this.playlistId || !this.playlistId.id) {
      this.presentAlert('Erreur', 'ID de playlist manquant');
      return;
    }

    this.playlistService.deletePlaylist(this.playlistId.id).subscribe({
      next: (response) => this.handleResponse(response),
      error: (err) => this.handleError(err),
    });
  }

  private async handleResponse(response: any) {
    if (response.success) {
      console.log('Playlist supprimée avec succès');
      this.playlistDeleted.emit({ id: this.playlistId, success: true });
      await this.modalCtrl.dismiss({ deleted: true }); // Fermeture du modal après émission de l'événement
    } else {
      const message = response.sessionError || response.error || 'Erreur inconnue';
      this.presentAlert('Erreur', message);
    }
  }

  private handleError(err: any) {
    this.presentAlert('Erreur', 'Une erreur s\'est produite lors de la suppression.');
    console.error('Erreur lors de la suppression:', err);
  }

  async presentAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['OK'],
    });
    await alert.present();
  }

  closeModal() {
    this.modalCtrl.dismiss();
  }
  selectedPlaylist: any;
  playlistIds!: any;
  playlistData: any;
  playlist:any[]=[];
  ngOnInit() {
    this.playlistService.getPublicPlayList().subscribe(
      (response) => {
        console.log(response);
        const u = localStorage.getItem('UserData');
        if (u) {
          const UserData = JSON.parse(u);
          const userId = UserData.id;
          this.playlist = response.success.playlists.filter(
            (playlist: any) => playlist.publisher.id === userId
          );

          console.log('Playlists récupérées et filtrées:', this.playlist);
          localStorage.setItem('playlist', JSON.stringify(this.playlist));

        }
      },
      (error) => {
        console.error('Erreur lors de la récupération des playlists :', error);
      }
    );
    this.playlistIds = this.navParams.get('playlistId');
    // console.log('Playlist ID:', this.playlistIds);
    const selectedPlaylist = this.playlist.find(playlist => playlist.id === this.playlistIds); // Recherche de l'élément
    console.log('Playlistsssss:', this.selectedPlaylist);

    if (selectedPlaylist) {
      console.log('Playlist sélectionnée:', selectedPlaylist); // Afficher la playlist trouvée
    } else {
      console.log('Aucune playlist trouvée avec l\'ID:', this.playlistIds);
    }
    this.selectedPlaylist = this.navParams.get('selectedPlaylist'); // Récupérer les componentProps
    // console.log(this.selectedPlaylist); 
  }
}
