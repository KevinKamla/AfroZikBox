/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-menuactionhome',
  templateUrl: './menuactionhome.page.html',
  styleUrls: ['./menuactionhome.page.scss'],
})
export class MenuactionhomePage implements OnInit {

  constructor(
    private modalCtrl: ModalController,
  ) { }

  closeModal() {
    this.modalCtrl.dismiss();
  }


  ngOnInit() {
  }


}