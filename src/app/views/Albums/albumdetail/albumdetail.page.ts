import { Component, OnInit } from '@angular/core';
import { ModalController, NavController,} from '@ionic/angular';
import { MusicoptionPage } from 'src/app/components/musicoption/musicoption.page';
import { musicTab } from '../../play/play.page';
import { ActivatedRoute, Router } from '@angular/router';
import { TopAlbumsService } from '../../../services/top-albums.service';
import { AlbumsService } from 'src/app/services/albums.service';

@Component({
  selector: 'app-albumdetail',
  templateUrl: './albumdetail.page.html',
  styleUrls: ['./albumdetail.page.scss'],
})
export class AlbumdetailPage implements OnInit {

  pauseIcon: string = "play-circle";
  state = 'modal';
  topAlbums:any;
  albumId: any;
  albumSongs: any[] = [];
  constructor(
    private modalCtrl: ModalController,
    private navCtrl: NavController,
    public route: Router,
    private aroute: ActivatedRoute,
    private routes: ActivatedRoute,
    private topAlbumsService:TopAlbumsService,
    private albumsService: AlbumsService
  ) { }

  album: any;
  songs: any[] = [];

  async openOptionSound() {
    const modal = await this.modalCtrl.create({
      component: MusicoptionPage,
      initialBreakpoint: 0.75,
      breakpoints: [0.5, 0.75, 1],
      mode: 'ios'
    })

    await modal.present();
  }

  goToRoute(route: string = '') {
    if (route) {
      this.route.navigate([route]);
    } else {
      this.state === 'modal' ? this.closeModal() : this.navCtrl.back();
    }
  }

  play() {
    if (this.pauseIcon == "pause") {
      this.pauseIcon = "play-circle";
      musicTab.isClose = false;
      musicTab.musicIsPlay = false;

    } else {
      this.pauseIcon = "play-circle";
      musicTab.isClose = false;
      musicTab.musicIsPlay = true;
    }
  }

  // goToPlay() {
  //   musicTab.musicIsPlay = true;
  //   musicTab.isClose = false;
  // }
 
  closeModal() {
    this.modalCtrl.dismiss();
  }

  convertSecondsToMinutes(seconds: number): string {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}m ${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}s`;  
  }

  loadAlbumSongs() {
    this.albumsService.getAlbumsr(this.albumId, '').subscribe(
      (response) => {
        console.log(response);
        this.albumSongs = response.songs;
        console.log(`Chansons pour l'album ${this.albumId} :`, this.albumSongs);  
      },
      (error) => {
        console.error(`Erreur lors de la récupération des chansons pour l'album ${this.albumId} :`, error);
      }
    );
  }

  places :any;
  ngOnInit() {
    this.state = this.aroute.snapshot.params['state'];
    const albumId1 = this.routes.snapshot.paramMap.get('id');
    this.albumId = this.routes.snapshot.paramMap.get('id');

    this.songs = [];
    this.loadAlbumSongs();
    console.log(this.songs, this.album);
    const storedAlbum = localStorage.getItem('selectedAlbum');

    // Vérifier si l'album existe dans le localStorage
    if (storedAlbum) {
      // Convertir la chaîne JSON en un objet
      this.album = JSON.parse(storedAlbum);
      this.songs = this.album.songs
      console.log(this.songs, this.album);
    } else {
      console.log('Aucun album n\'est stocké dans le localStorage');
    }
    this.topAlbumsService.getTopAlbums(albumId1).subscribe(
      (response) => {
        this.topAlbums = response.top_albums;
        console.log('Détails de l\'albums récupérés :', this.topAlbums);
      },
      (error) => {
        console.error('Erreur lors de la récupération des détails de l\'artiste :', error);
      }
    );
  }

}
