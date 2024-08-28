import { Component, OnInit } from '@angular/core';
import { ModalController, NavController,} from '@ionic/angular';
import { MusicoptionPage } from 'src/app/components/musicoption/musicoption.page';
import { musicTab } from '../../play/play.page';
import { ActivatedRoute, Router } from '@angular/router';
import { TopAlbumsService } from '../../../services/top-albums.service';

@Component({
  selector: 'app-albumdetail',
  templateUrl: './albumdetail.page.html',
  styleUrls: ['./albumdetail.page.scss'],
})
export class AlbumdetailPage implements OnInit {

  pauseIcon: string = "play-circle";
  state = 'modal';
  topAlbums:any;
  constructor(
    private modalCtrl: ModalController,
    private navCtrl: NavController,
    public route: Router,
    private aroute: ActivatedRoute,
    private routes: ActivatedRoute,
    private topAlbumsService:TopAlbumsService,
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
  places :any;
  ngOnInit() {
    this.state = this.aroute.snapshot.params['state'];
    const albumId = this.routes.snapshot.paramMap.get('id');

    this.topAlbumsService.getTopAlbums(albumId).subscribe(
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
