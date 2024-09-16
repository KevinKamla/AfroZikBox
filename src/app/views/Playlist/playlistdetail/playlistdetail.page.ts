import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalController, NavController } from '@ionic/angular';
import { musicTab } from '../../play/play.page';
import { MusicoptionPage } from 'src/app/components/musicoption/musicoption.page';
import { PlaylistoptionPage } from 'src/app/components/playlistoption/playlistoption.page';
import { GenresService } from 'src/app/services/genres.service';
import { PlaylistService } from 'src/app/services/playlist.service';

@Component({
  selector: 'app-playlistdetail',
  templateUrl: './playlistdetail.page.html',
  styleUrls: ['./playlistdetail.page.scss'],
})
export class PlaylistdetailPage implements OnInit {

  pauseIcon: string = "play-circle";
  currentRoute = '';
  playlists: any[]=[];
  playlist = '';
  constructor(
    private modalCtrl: ModalController,
    public route: Router,
    public activatedRoute: ActivatedRoute,
    private navCtrl: NavController,
    private actvroute: ActivatedRoute, 
    private playlistService: PlaylistService,

  ) { }
  buttonAvert = [
    {
      text: 'Annuler',
    },
    {
      text: "D'accord",
      handler: () => {
        this.goToRoute('abonnement');
      },
    }
  ]

  async openOptionSound() {
    const modale = await this.modalCtrl.create({
      component: MusicoptionPage,
      initialBreakpoint: 0.75,
      breakpoints: [0.5, 0.75, 1],
      mode: 'ios'
    })

    await modale.present();
  }

  async openOptionPlaylist() {
    const modale = await this.modalCtrl.create({
      component: PlaylistoptionPage,
      initialBreakpoint: 0.75,
      breakpoints: [0.5, 0.75, 1],
      mode: 'ios'

    })
    await modale.present();
  }


  goToRoute(route: string = '') {
    if (route) {
      this.route.navigate([route]);
    } else {
      this.navCtrl.back();
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


  closeModal() {
    this.modalCtrl.dismiss();
  }

  plays: any;
  songs: any[] = [];
  ngOnInit() {
    this.playlist = this.actvroute.snapshot.params['playlist'];
    
    const playlistid = this.activatedRoute.snapshot.paramMap.get('id');

    const storedAlbum = localStorage.getItem('selectedPlaylist');

    if (storedAlbum) {
      // Convertir la chaîne JSON en un objet
      this.plays = JSON.parse(storedAlbum);
      this.songs = this.plays.songs
      console.log(this.plays,this.songs);
    } else {
      console.log('Aucune playlist n\'est stocké dans le localStorage');
    }
    
    this.playlistService.getPlaylists(playlistid).subscribe(
      (response) => {
        this.playlist = response.playlists.songs;
        console.log('playlist récupérés :', this.playlist);
      },
      (error) => {
        console.error('Erreur lors de la récupération des genres :', error);
      }
    );

  }

}
