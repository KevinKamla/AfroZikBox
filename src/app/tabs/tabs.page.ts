/* eslint-disable @angular-eslint/component-class-suffix */
import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { musicTab } from '../views/play/play.page';
import { NativeAudio } from '@capacitor-community/native-audio';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})



export class TabsPage implements OnInit{
  musictabOption = musicTab;
  dataSon : any;
  constructor(
    private navCtrl: NavController,
  ) { }

  play() {
    // musicTab.musicIsPlay = !musicTab.musicIsPlay;
    NativeAudio.play({
      assetId: 'fire',
  });
  }
  
  close() {
    musicTab.isClose = true;
    musicTab.musicIsPlay = false;
  }
  
  goToPlay() {
    this.navCtrl.navigateForward('play');
  }

  ngOnInit() {
    const music = localStorage.getItem('music');
    
    if(music){
      this.dataSon = JSON.parse(music);
      console.log(this.dataSon)
    }
  }

}
