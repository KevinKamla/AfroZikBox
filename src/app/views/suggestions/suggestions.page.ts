import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-suggestions',
  templateUrl: './suggestions.page.html',
  styleUrls: ['./suggestions.page.scss'],
})
export class SuggestionsPage implements OnInit {

  constructor(
    private route: Router,
    private navCtrl: NavController
  ) { }

  tabSong = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

  playMusic = (item: any) => {
    this.goToPlay();
  }

  goToSegment(segment: string) {
    this.route.navigate(['tabs/home', segment]);
  }
  goToPlay() {
    this.navCtrl.navigateForward('play');
  }


  // eslint-disable-next-line @angular-eslint/no-empty-lifecycle-method
  ngOnInit() {
  }

}
