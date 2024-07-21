/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-play',
  templateUrl: './play.page.html',
  styleUrls: ['./play.page.scss'],
})
export class PlayPage implements OnInit {


  musicIsPlay = true;
  muteIcon: string = "mute";
  pauseIcon: string = "pause";
  gesVol: string = "medium";

  constructor(
    public navCtrl: NavController,
    public route: Router,
  ) { }

  goToRoute(route: string = ''){
    if (route) {
      this.route.navigate([route]);
    } else {
      this.navCtrl.back();
    }
  }

  play() {
    this.pauseIcon == "pause" ? this.pauseIcon = "play" : this.pauseIcon = "pause";
  }


  ngOnInit() {
  }

}
