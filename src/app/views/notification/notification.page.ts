/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { NotificationsService } from 'src/app/services/notifications.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.page.html',
  styleUrls: ['./notification.page.scss'],
})
export class NotificationPage implements OnInit {
  notifications:any[]=[];
  lenght: number = 0;

  constructor(    
    public route: Router,
    public navCtrl: NavController,
    private notificationsService: NotificationsService
  ) { }

  goToRoute(route: string = ''){
    if (route) {
      this.route.navigate([route]);
    } else {
      this.navCtrl.back();
    }
  }
 
  ngOnInit() {
    this.notificationsService.getNotifications().subscribe((response) => {
      this.notifications = response.notifications;
      this.lenght = response.notifications.lenght;
    });
  }

}
