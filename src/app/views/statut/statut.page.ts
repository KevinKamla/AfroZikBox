/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-statut',
  templateUrl: './statut.page.html',
  styleUrls: ['./statut.page.scss'],
})
export class StatutPage implements OnInit {

  constructor(
    private modalController: ModalController
  ) { }

  closeModal(){
    this.modalController.dismiss();
  }

  rangeChange(e:any){
    e++;
  }
  ngOnInit() {
  }

}
