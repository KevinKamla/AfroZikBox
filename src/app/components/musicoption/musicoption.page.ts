/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-musicoption',
  templateUrl: './musicoption.page.html',
  styleUrls: ['./musicoption.page.scss'],
})
export class MusicoptionPage implements OnInit {

  constructor(
    public navCtrl: NavController,
    private modalCtrl: ModalController,
    public route: Router,
   
  ) { }


  
  closeModal() {
    this.modalCtrl.dismiss();
  }


  ngOnInit() {
  }

}
