/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
import { Component, OnInit } from '@angular/core';
import { musicTab } from '../play/play.page';
import { ModalController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-myliste',
  templateUrl: './myliste.page.html',
  styleUrls: ['./myliste.page.scss'],
})
export class MylistePage implements OnInit {
  constructor(
    private navCtrl: NavController,
  ) { }


  goToPlay() {
    musicTab.musicIsPlay = true;
    musicTab.isClose = false;
  }

  onClick() {
  }

  ngOnInit() {
  }

}
