import { Component, OnInit } from '@angular/core';
import { ModalController, NavController,} from '@ionic/angular';
import { MusicoptionPage } from 'src/app/components/musicoption/musicoption.page';
import { musicTab } from '../../play/play.page';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-albumdetail',
  templateUrl: './albumdetail.page.html',
  styleUrls: ['./albumdetail.page.scss'],
})
export class AlbumdetailPage implements OnInit {

  pauseIcon: string = "play-circle";
  state = 'modal';

  constructor(
    private modalCtrl: ModalController,
    private navCtrl: NavController,
    public route: Router,
    private aroute: ActivatedRoute,
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

  ngOnInit() {
    this.state = this.aroute.snapshot.params['state'];
  }

}
