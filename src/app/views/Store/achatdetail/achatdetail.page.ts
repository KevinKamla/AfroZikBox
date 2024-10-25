import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-achatdetail',
  templateUrl: './achatdetail.page.html',
  styleUrls: ['./achatdetail.page.scss'],
})
export class AchatdetailPage implements OnInit {

  constructor(
    private navCtrl: NavController,
    public route: Router,
  ) { }

  public alertActionreeButtons = [
    {
      text: 'Partager',
      role: 'confirm',
      handler: () => { },
    },
    {
      text: 'Copier',
      role: 'cancel',
      handler: () => { },
    },
  ];

  goToRoute(route: string = '') {
    if (route) {
      this.route.navigate([route]);
    } else {
      this.navCtrl.back();
    }
  }

  ngOnInit() {
    this
  }

}
