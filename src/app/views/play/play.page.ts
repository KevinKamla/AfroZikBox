/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController, NavController, Platform } from '@ionic/angular';
import { MusicoptionPage } from 'src/app/components/musicoption/musicoption.page';
import { HttpClient } from '@angular/common/http';
import { Media, MediaObject } from '@awesome-cordova-plugins/media/ngx';

export let musicTab = {
  musicIsPlay: false,
  isClose: true
}

@Component({
  selector: 'app-play',
  templateUrl: './play.page.html',
  styleUrls: ['./play.page.scss'],
})


export class PlayPage implements OnInit {

  musictabOption = musicTab;
  muteIcon: string = "mute";
  pauseIcon: string = "play";
  gesVol: string = "medium";
  songFile!: MediaObject;

  constructor(
    private media: Media,
    private platform: Platform,
    private http:HttpClient,
    public navCtrl: NavController,
    public route: Router,
    private modalCtrl: ModalController,
  ) { }
  playSong(songUrl: string) {
    this.platform.ready().then(() => {
      this.songFile = this.media.create(songUrl);
      this.songFile.play();  
    });
  }

  stopSong() {
    if (this.songFile) {
      this.songFile.stop(); 
    }
  }

  fetchTopSongs() {
    const apiUrl = 'https://afrozikbox.com/endpoint/common/discover?server_key=d012ab7a1e170f66e8ed63176dcc4e7b';
    this.http.post(apiUrl, {
      access_token: 'your-access-token',
      server_key: 'your-server-key',
      limit: 1,
      offset: 0
    }).subscribe((data: any) => {
      const songUrl = data.new_releases.data[0].audio_location;
      console.log("url audio", songUrl);
      this.playSong(songUrl);
    });
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
      this.pauseIcon = "play";
      musicTab.isClose = false;
      musicTab.musicIsPlay = false;

    } else {
      this.pauseIcon = "pause";
      musicTab.isClose = false;
      musicTab.musicIsPlay = true;
    }
  }



  async openOptionSound() {
    const modal = await this.modalCtrl.create({
      component: MusicoptionPage,
      initialBreakpoint: 0.75,
      breakpoints: [0.5, 0.75, 1],
      mode: 'ios'

    })
    await modal.present();
  }


  ngOnInit() {
    musicTab.musicIsPlay? this.pauseIcon = 'pause' : this.pauseIcon = 'play';
    
  }

}
