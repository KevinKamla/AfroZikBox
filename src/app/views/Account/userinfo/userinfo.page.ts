import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-userinfo',
  templateUrl: './userinfo.page.html',
  styleUrls: ['./userinfo.page.scss'],
})
export class UserinfoPage implements OnInit {
  email: string = '';  
  avatar: any;
  email_on_follow_user:any;
  gender:any;
  name = ''
  constructor(
    private navCtrl: NavController,
    public route: Router,

  ) { }


  ngOnInit() {
    const u = localStorage.getItem("UserData")
    if (u) {
      const UserData = JSON.parse(u)
      console.log("userdata :", UserData )
      this.email = UserData.email
      this.avatar = UserData.avatar
      this.name = UserData.name
      this.gender = UserData.gender
      this.email_on_follow_user = UserData.email_on_follow_user
    }
  }

  goToRoute(route: string = '') {
    if (route) {
      this.route.navigate([route]);
    } else {
      this.navCtrl.back();
    }
  }

}
