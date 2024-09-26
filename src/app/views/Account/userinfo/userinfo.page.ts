import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-userinfo',
  templateUrl: './userinfo.page.html',
  styleUrls: ['./userinfo.page.scss'],
})
export class UserinfoPage implements OnInit {
  userId: number = parseInt(localStorage.getItem('userId') || '0', 10);

  email: string = '';  
  avatar: any;
  followers : any[] = [];
  following :any []=[];
  email_on_follow_user:any;
  gender:any;
  name = ''
  country:string = '';
  balance:string = '';
  constructor(
    private navCtrl: NavController,
    public route: Router,
    private userService: UserService

  ) { }


  ngOnInit() {
    const u = localStorage.getItem("UserData")
    if (u) {
      const UserData = JSON.parse(u)
      console.log("userdata :", UserData )
      this.email = UserData.email
      this.avatar = UserData.avatar
      this.name = UserData.name
      this.gender = UserData.gender_text
      this.email_on_follow_user = UserData.email_on_follow_user
      this.country = UserData.country_name
      this.balance = UserData.balance
    }
    this.userService.getFollowers(this.userId).subscribe((res) => {
      console.log("followers :", res);
      this.followers = res.data.count;
      console.log("followers :", this.followers);
    });
    this.userService.getFollowing(this.userId).subscribe((response) =>{
      this.following = response.data.count;
    })
  }

  goToRoute(route: string = '') {
    if (route) {
      this.route.navigate([route]);
    } else {
      this.navCtrl.back();
    }
  }

}
