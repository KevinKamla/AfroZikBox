import { Component, OnInit } from '@angular/core';
import { AlbumdetailPage } from '../albumdetail/albumdetail.page';
import { ModalController, NavController } from '@ionic/angular';
import { TopAlbumsService } from '../../../services/top-albums.service';

@Component({
  selector: 'app-album',
  templateUrl: './album.page.html',
  styleUrls: ['./album.page.scss'],
})
export class AlbumPage implements OnInit {
  
  topalbums:any[]=[];

  constructor(
    private modalCtrl: ModalController,
    private topAlbumsService:TopAlbumsService,
  ) { }

  numberOfTopSongs: number = 0;

  ngOnInit() {
    this.topAlbumsService.getTopAlbums().subscribe(
      (response) => {
        this.topalbums = response.top_albums;
        console.log('meilleurs albums récupérés :', this.topalbums);

        const numberOfSongs = this.topalbums.length;
        console.log('Nombre de Meilleur songs :', numberOfSongs);

        this.numberOfTopSongs = numberOfSongs;
      },
      (error) => {
        console.error('Erreur lors de la récupération des meilleurs albums :', error);
      }
    );
  }

}
