/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-musicdetails',
  templateUrl: './musicdetails.page.html',
  styleUrls: ['./musicdetails.page.scss'],
})
export class MusicdetailsPage implements OnInit {

  constructor(
    public navCtrl: NavController,
    public route: Router,
  ) { }

  goToRoute(route: string = '') {
    if (route) {
      this.route.navigate([route]);
    } else {
      this.navCtrl.pop();
    }
  }


  ngOnInit() {
  }

}
