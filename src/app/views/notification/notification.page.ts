/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.page.html',
  styleUrls: ['./notification.page.scss'],
})
export class NotificationPage implements OnInit {

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
