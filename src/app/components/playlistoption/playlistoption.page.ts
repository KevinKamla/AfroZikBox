import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AlertController, ModalController, NavParams } from '@ionic/angular';
import { EditeplaylistPage } from '../editeplaylist/editeplaylist.page';
import { PlaylistService } from 'src/app/services/playlist.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-playlistoption',
  templateUrl: './playlistoption.page.html',
  styleUrls: ['./playlistoption.page.scss'], 
})
export class PlaylistoptionPage implements OnInit {
  @Input() playlistId: any | undefined;
  @Output() playlistDeleted = new EventEmitter<{
    id: number;
    success: boolean;
  }>();
  playlistIdToDelete: any | null = null;
  constructor(
    private modalCtrl: ModalController,
    public playlistService: PlaylistService,
    private navParams: NavParams,
    private router: Router,
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
    if (!this.playlistId) {
      this.presentAlert('Erreur', 'ID de playlist manquant');
      return;
    }
  
    // Appel au service pour supprimer la playlist
    this.playlistService.deletePlaylist(this.playlistId).subscribe({
      next: async (response) => {
        if (response.success) {
          // Succès
          console.log('Playlist supprimée avec succès');
          await this.presentAlert('Succès', 'Playlist supprimée avec succès');
          this.closeModal();
          this.router.navigate(['/myplaylist']);
        } else {
          // Gestion d'erreurs spécifiques
          const message = response.error || 'Erreur inconnue lors de la suppression';
          await this.presentAlert('Erreur', message);
        }
      },
      error: async (err) => {
        console.error('Erreur lors de la suppression:', err);
        await this.presentAlert(
          'Erreur',
          "Une erreur s'est produite lors de la suppression. Veuillez réessayer."
        );
      },
    });
  }
  

  private async handleResponse(response: any) {
    if (response.success) {
      console.log('Playlist supprimée avec succès');
      this.playlistDeleted.emit({ id: this.playlistId, success: true });
      await this.modalCtrl.dismiss({ deleted: true }); // Fermeture du modal après émission de l'événement
    } else {
      const message =
        response.sessionError || response.error || 'Erreur inconnue';
      this.presentAlert('Erreur', message);
    }
  }

  private handleError(err: any) {
    this.presentAlert(
      'Erreur',
      "Une erreur s'est produite lors de la suppression."
    );
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
  playlist: any[] = [];
  ngOnInit() {
    // Récupération des données de playlist stockées localement
    this.playlistData = JSON.parse(localStorage.getItem('publicPlaylist') || 'null');
  
    // Récupération de l'ID de la playlist depuis les paramètres
    this.playlistIds = this.navParams.get('playlistId');
    console.log('Playlist ID:', this.playlistIds);
  
    // Recherche de la playlist sélectionnée si `playlistData` et `playlistIds` sont définis
    if (this.playlistData && this.playlistIds) {
      this.selectedPlaylist = this.playlistData.find(
        (playlist: { id: number }) => playlist.id === parseInt(this.playlistIds, 10)
      );
      console.log('Playlist sélectionnée:', this.selectedPlaylist);
    } else {
      console.warn('Playlist data ou Playlist ID manquant');
    }
  }
  
}
