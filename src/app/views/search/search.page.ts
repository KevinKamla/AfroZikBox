/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController, NavController } from '@ionic/angular';
import { FilteractionsearchPage } from 'src/app/components/filteractionsearch/filteractionsearch.page';

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {

  selectedSegment: string = 'suggestions'; 
  
  constructor(
    public route: Router,
    public navCtrl: NavController,
    private modalCtrl: ModalController,
  ) { }

  
  goToRoute(route: string = ''){
    if (route) {
      this.route.navigate([route]);
    } else {
      this.navCtrl.back();
    }
  }
  
  async openActionFilter(){
    const modal = await this.modalCtrl.create({
      component: FilteractionsearchPage,
      initialBreakpoint: 0.5,
      breakpoints: [0.5],
      cssClass: "menu-filter",
      mode:'ios'

    })
    await modal.present();
  }
  
  ngOnInit() {
  }

}


