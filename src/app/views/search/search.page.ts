/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';

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
  ) { }

  
  goToRoute(route: string = ''){
    if (route) {
      this.route.navigate([route]);
    } else {
      this.navCtrl.back();
    }
  }
  

  ngOnInit() {
  }

}
