import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AnimationController, CheckboxCustomEvent, ModalController } from '@ionic/angular';
import { PlaylistService } from 'src/app/services/playlist.service';

@Component({
  selector: 'app-addplaylist',
  templateUrl: './addplaylist.page.html',
  styleUrls: ['./addplaylist.page.scss'],
})
export class AddplaylistPage implements OnInit {
  playlist: any[] = [];
  currentSong: any;

  constructor(
    private animationCtrl: AnimationController,
    public playlistService: PlaylistService,
    private modalCtrl: ModalController 
  ) {}


  @Output() dismissChange = new EventEmitter<boolean>();

  // checkboxChanged(event: any) {
  //   const ev = event as CheckboxCustomEvent;
  //   const checked = ev.detail.checked;

  //   this.dismissChange.emit(checked);
  // }
  enterAnimation = (baseEl: HTMLElement) => {
    const root = baseEl.shadowRoot;

    const backdropAnimation = this.animationCtrl
      .create()
      .addElement(root?.querySelector('ion-backdrop')!)
      .fromTo('opacity', '0.01', 'var(--backdrop-opacity)');

    const wrapperAnimation = this.animationCtrl
      .create()
      .addElement(root?.querySelector('.modal-wrapper')!)
      .keyframes([
        { offset: 0, opacity: '0', transform: 'scale(0)' },
        { offset: 1, opacity: '0.99', transform: 'scale(1)' },
      ]);

    return this.animationCtrl
      .create()
      .addElement(baseEl)
      .easing('ease-out')
      .duration(500)
      .addAnimation([backdropAnimation, wrapperAnimation]);
  };

  leaveAnimation = (baseEl: HTMLElement) => {
    return this.enterAnimation(baseEl).direction('reverse');
  };

  ngOnInit(): void {
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
        }
      },
      (error) => {
        console.error('Erreur lors de la récupération des playlists :', error);
      }
    );

    const savedSong = localStorage.getItem('currentSong');
    if (savedSong) {
      this.currentSong = JSON.parse(savedSong);
      console.log('Chanson en cours récupérée:', this.currentSong);
    }
  }


  addToPlaylist(playlistId: any) {
    // Vérifiez que currentSong est défini et qu'il contient un ID valide
    if (this.currentSong && typeof this.currentSong.id === 'number') {
      console.log(`Ajout de la chanson ${this.currentSong.title} à la playlist avec ID : ${playlistId}`);
  
      // Vérification que playlistId est un nombre
      if (typeof playlistId === 'number') {
        // Appel du service pour ajouter la chanson à la playlist
        this.playlistService.addToPlaylist(this.currentSong.id, playlistId).subscribe(
          (response) => {
            console.log('Chanson ajoutée avec succès à la playlist', response);
  
            // Fermer le modal après avoir ajouté la chanson
            this.closeModal();
          },
          (error) => {
            console.error('Erreur lors de l’ajout de la chanson à la playlist :', error);
          }
        );
      } else {
        console.error('playlistId n’est pas un nombre valide');
      }
    } else {
      console.error('La chanson ou son ID n’est pas valide');
    }
  }
  

  closeModal() {
    this.modalCtrl.dismiss(); // Fermer le modal
  }

  checkboxChanged(event: any, playlistId: number) {
    const ev = event as CheckboxCustomEvent;
    const checked = ev.detail.checked;

    if (checked) {
      this.addToPlaylist(playlistId);
    }
  }
}
