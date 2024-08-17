import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController, NavController } from '@ionic/angular';
import { StatutPage } from '../statut/statut.page';
import { musicTab } from '../../views/play/play.page';
import { AlbumdetailPage } from '../Albums/albumdetail/albumdetail.page';

@Component({
  selector: 'app-suggestions',
  templateUrl: './suggestions.page.html',
  styleUrls: ['./suggestions.page.scss'],
})
export class SuggestionsPage implements OnInit {

  constructor(
    private route: Router,
    private navCtrl: NavController,
    private modal: ModalController
  ) { }

  tabSong = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
  isOpenmodalAchat = false;
  walletIsOpen = false;
  confirDeletButtons = [
    {
      text: 'Annuler',
      handler: () => { this.isOpenmodalAchat = false; },
    },
    {
      text: 'Achat',
      handler: () => { this.isOpenmodalAchat = false; this.walletIsOpen = true; },
    }
  ]
  walletButtons = [
    {
      text: 'Annuler',
      handler: () => { this.walletIsOpen = false; },
    },
    {
      text: 'Ajouter un porte monnaie',
      handler: () => { this.walletIsOpen = false; this.navCtrl.navigateForward('/wallet'); },
    },
  ]


  playMusic = (item: any) => {
    musicTab.isClose = false;
    musicTab.musicIsPlay = true;
    console.log('musicTab : ', musicTab);
    
  }

  goToSegment(segment: string) {
    this.route.navigate(['tabs/home', segment]);
  }

  goToPlay() {
    this.navCtrl.navigateForward('play');
  }

  async openActut() {
    const modal = await this.modal.create({
      component: StatutPage,
      animated: true,
      showBackdrop: true,
      backdropDismiss: false,

    });

    await modal.present();
  }


  async openAlbumDetail(props:any) {
    const modal = await this.modal.create({
      component: AlbumdetailPage,
      animated: true,
      showBackdrop: true,
      backdropDismiss: false,
    })
    await modal.present();
  }


  openPopup() {
    this.isOpenmodalAchat = true;
  }


  ngOnInit() {
    
    this
  }

}
