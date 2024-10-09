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

  currentSong:any;
  constructor(
    public navCtrl: NavController,
    public route: Router,
  ) { }

  goToRoute(route: string = '') {
    if (route) {
      this.route.navigate(['/play']);
    } else {
      this.navCtrl.back();
    }
  }

  tags: any[]=[];
  ngOnInit() {
    const storedSong = localStorage.getItem('currentSong');
    console.log('werrrrrrrrr',storedSong)
    if (storedSong) {
      this.currentSong = JSON.parse(storedSong);
      this.tags = this.currentSong.tags.split(',');
      console.log('sonngggggg', this.tags);
      console.log('sonnggggggssssss', this.currentSong)
      this.tags.forEach((tag: string) => {
        console.log('Tag:', tag.trim()); // Utiliser trim() pour enlever les espaces
      }); 
      // Utiliser this.currentSong comme nécessaire
    }
  } 

}
