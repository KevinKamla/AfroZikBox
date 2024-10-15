/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
import { Component, OnInit } from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';
import { MusicoptionPage } from 'src/app/components/musicoption/musicoption.page';
import { musicTab } from '../play/play.page';
import { FavoriteService } from 'src/app/services/favorite.service';
import { AuthService } from 'src/app/services/auth.service';
import { LecteurService } from 'src/app/services/lecteur.service';
import { PlaylistService } from 'src/app/services/playlist.service';

@Component({
  selector: 'app-favoris',
  templateUrl: './favoris.page.html',
  styleUrls: ['./favoris.page.scss'],
})
export class FavorisPage implements OnInit {
  accessToken: string = localStorage.getItem('accessToken') || '';
  userId: number = parseInt(localStorage.getItem('userId') || '0', 10);
  favoris: any[] = [];
  // userId!: number;
  constructor(
    private modalCtrl: ModalController,
    private navCtrl: NavController,
    private favoriteService: FavoriteService,
    private authService: AuthService,
    private PlaylistService: PlaylistService,
    private musicService: LecteurService // Injection du service de musique


  ) { }


  async openOptionSound() {
    const modal = await this.modalCtrl.create({
      component: MusicoptionPage,
      initialBreakpoint: 0.75,
      breakpoints: [0.5, 0.75, 1],
      mode: 'ios'
    })
    
    await modal.present();
  }

  goToPlay() {
    musicTab.musicIsPlay = true;
    musicTab.isClose = false;
    this.navCtrl.navigateForward('play');
  }

  ngOnInit() {

    this.favoriteService.getFavorites(this.userId, this.accessToken).subscribe((res) => {
      console.log(res);
      this.favoris = res.data.data;
    });
  }

  playMusicFromFavoris(song: any, index: number) {
    this.musicService.loadNewPlaylist(this.favoris, index);
  }
  loadsong(playlist:any, index:number){
    // console.log('Playlist chargement...')
    this.PlaylistService.updateindex(index)
    this.PlaylistService.loadplaylist(playlist, index)
    this.musicService.loadNewPlaylist(playlist, index);
  }

}
