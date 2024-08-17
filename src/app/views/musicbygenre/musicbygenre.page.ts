/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ModalController, NavController } from '@ionic/angular';
import { MusicoptionPage } from 'src/app/components/musicoption/musicoption.page';

@Component({
  selector: 'app-musicbygenre',
  templateUrl: './musicbygenre.page.html',
  styleUrls: ['./musicbygenre.page.scss'],
})
export class MusicbygenrePage implements OnInit {

  genre = '';
  constructor(    
    private actvroute: ActivatedRoute, 
    private modalCtrl: ModalController,
    public navCtrl: NavController,
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

  goToPlay() {
    this.navCtrl.navigateForward('play');
  }



  ngOnInit() {    
    this.genre = this.actvroute.snapshot.params['genre'];
  }

}

