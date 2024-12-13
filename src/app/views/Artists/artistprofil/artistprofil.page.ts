import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController, NavController } from '@ionic/angular';
import { musicTab } from '../../play/play.page';
import { AlbumdetailPage } from '../../Albums/albumdetail/albumdetail.page';

@Component({
  selector: 'app-artistprofil',
  templateUrl: './artistprofil.page.html',
  styleUrls: ['./artistprofil.page.scss'],
})
export class ArtistprofilPage implements OnInit {

  suivre = 'Suivre';
  isFollowers = false;
  username = 'Bolingo';

  constructor(
    private navCtrl: NavController,
    public route: Router,
    private modal: ModalController
  ) { }

  goToRoute(route: string = '') {
    if (route) {
      this.route.navigate([route]);
    } else {
      this.navCtrl.back();
    }
  }

  playMusic = (item: any) => {
    musicTab.isClose = false;
    musicTab.musicIsPlay = true;
  }


  async openAlbumDetail(props: any) {
    const modal = await this.modal.create({
      component: AlbumdetailPage,
      showBackdrop: true,
      backdropDismiss: false,
    })
    await modal.present();
  }


  Following() {
    this.suivre === 'Suivre' ? this.suivre = 'Following' : this.suivre = 'Suivre';
    this.suivre === 'Suivre' ? this.isFollowers = false : this.isFollowers = true;
  }

  
  public alertCashfreeButtons = [
    {
      text: 'Copier le lien vers le profil',
      role: 'confirm',
      handler: () => { },
    },
    {
      text: 'Bloquer',
      role: 'cancel',
      handler: () => { },
    },
  ];

  ngOnInit() {
    this
  }

}
