import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { musicTab } from '../../play/play.page';
import { ModalController, NavController } from '@ionic/angular';
import { MusicoptionPage } from 'src/app/components/musicoption/musicoption.page';
import { TopSongsService } from 'src/app/services/top-songs.service';
import { TopAlbumsService } from 'src/app/services/top-albums.service';
import { SuggestionsService } from 'src/app/services/suggestions.service';

@Component({
  selector: 'app-mymusic',
  templateUrl: './mymusic.page.html',
  styleUrls: ['./mymusic.page.scss'],
})
export class MymusicPage implements OnInit {
  type: any;

  topSongs: any[] = [];
  artist_ids: any;
  idArtist: any;
  filtered: any[] = [];
  topalbums: any[] = [];
  latest: any[] = [];

  constructor(
    private aroute: ActivatedRoute,
    private modalCtrl: ModalController,
    public route: Router,
    private navCtrl: NavController,
    private topsService: TopSongsService,
    private topAlbumsService: TopAlbumsService,
    private suggestionsService: SuggestionsService,
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
  }


  goToRoute(route: string = '') {
    if (route) {
      this.route.navigate([route]);
    } else {
      this.navCtrl.back();
    }
  }

  ngOnInit() {
    this.type = this.aroute.snapshot.params['type'];
    this.idArtist = Number(this.aroute.snapshot.paramMap.get('idArtist'));
  
    switch (this.type) {
      case 'Meilleurs':
        this.topsService.getTopSongs().subscribe(
          (response) => {
            this.topSongs = response.data;
            this.filtered = this.topSongs.filter(
              (song) => song.user_id === this.idArtist
            );
            console.log(this.filtered, 'filteredTOPSongs');
          },
          (error) => {
            console.error('Erreur lors de la récupération des meilleurs songs :', error);
          }
        );
        break;
  
      case 'Albums':
        this.topAlbumsService.getTopAlbums().subscribe(
          (response) => {
            this.topalbums = response.top_albums;
            this.filtered = this.topalbums.filter(
              (album) => album.user_id === this.idArtist
            );
            console.log(this.filtered, 'filteredTOPAlbums');
          },
          (error) => {
            console.error('Erreur lors de la récupération des meilleurs albums :', error);
          }
        );
        break;
  
      case 'Récents':
        this.suggestionsService.getSuggestions().subscribe(
          (response) => {
            this.latest = response.new_releases.data;
            this.filtered = this.latest.filter(
              (latest) => latest.user_id === this.idArtist
            );
            console.log(this.filtered, 'filteredLatest');
          },
          (error) => {
            console.error('Erreur lors de la récupération des suggestions :', error);
          }
        );
        break;
  
      default:
        console.warn('Type inconnu:', this.type);
        break;
    }
  }  

}
