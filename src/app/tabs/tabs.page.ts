import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {
  musicIsPlay = true;
  isClose = false;

  constructor(
    private navCtrl: NavController
  ) { }

  play() {
    this.musicIsPlay = !this.musicIsPlay;
  }

  close() {
    this.isClose = !this.isClose;
  }
  goToPlay() {
    this.navCtrl.navigateForward('play');
  }

}
