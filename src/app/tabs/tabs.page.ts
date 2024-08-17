/* eslint-disable @angular-eslint/component-class-suffix */
import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { musicTab } from '../views/play/play.page';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})



export class TabsPage implements OnInit{
  musictabOption = musicTab;
  constructor(
    private navCtrl: NavController,
  ) { }

  play() {
    musicTab.musicIsPlay = !musicTab.musicIsPlay;
  }
  
  close() {
    musicTab.isClose = true;
    musicTab.musicIsPlay = false;
  }
  
  goToPlay() {
    this.navCtrl.navigateForward('play');
  }

  ngOnInit() {
    this
    
  }

}
