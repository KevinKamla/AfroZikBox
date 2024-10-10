import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController, NavController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { CreateplaylistPage } from 'src/app/components/createplaylist/createplaylist.page';
import { PlaylistoptionPage } from 'src/app/components/playlistoption/playlistoption.page';
import { PlaylistService } from 'src/app/services/playlist.service';

@Component({
  selector: 'app-myplaylist',
  templateUrl: './myplaylist.page.html',
  styleUrls: ['./myplaylist.page.scss'],
})
export class MyplaylistPage implements OnInit, OnDestroy {
  playlist: any[] = [];
  playlists: any[] = [];
  playlistSubscription: Subscription | undefined;
  message: string = '';
  constructor(
    private modalCtrl: ModalController,
    public navCtrl: NavController,
    public route: Router,
    public playlistService: PlaylistService
  ) {}

  async openCreatePlaylist() {
    const modale = await this.modalCtrl.create({
      component: CreateplaylistPage,
      initialBreakpoint: 0.75,
      breakpoints: [0.5, 0.75, 1],
      mode: 'ios',
    });
    await modale.present();
  }

  goToRoute(route: string = '') {
    if (route) {
      this.route.navigate([route]);
    } else {
      this.navCtrl.back();
    }
  }

  // async openOptionPlaylist(playlistId: any) {
  //   const modale = await this.modalCtrl.create({
  //     component: PlaylistoptionPage,
  //     componentProps: { playlistId },
  //     initialBreakpoint: 0.75,
  //     breakpoints: [0.5, 0.75, 1],
  //     mode: 'ios',
  //   });
  //   await modale.present();
  // }

  ngOnInit() {
    this.playlistSubscription = this.playlistService.playlists$.subscribe(
      (playlists) => {
        this.playlists = playlists;
      }
    );
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
    this.playlistService.getPlaylists();
  }
  playlistDetail(playlist: any) {
    localStorage.setItem('playlist', JSON.stringify(playlist));
    this.route.navigate(['playlistdetail', playlist.id]);
  }

  async openOptionPlaylist(playlistId: any) {
    const modal = await this.modalCtrl.create({
      component: PlaylistoptionPage,
      componentProps: { playlistId },
      initialBreakpoint: 0.75,
      breakpoints: [0.5, 0.75, 1],
      mode: 'ios',
    });
    await modal.present();

    const { data } = await modal.onDidDismiss();
    if (data?.deleted) {
      this.onPlaylistDeleted(playlistId.id); // Supprimer playlistId.id
    }
  }

  onPlaylistDeleted(playlistId: number) {
    this.playlists = this.playlists.filter(
      (playlist) => playlist.id !== playlistId
    );
    this.message = 'Playlist supprimée avec succès !';
    setTimeout(() => (this.message = ''), 3000);
  }

  ngOnDestroy() {
    this.playlistSubscription?.unsubscribe(); // Important pour éviter les fuites de mémoire
  }
}
