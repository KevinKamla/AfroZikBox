import { Component, OnInit } from '@angular/core';
import { musicTab } from '../play/play.page';
import { MusicoptionPage } from 'src/app/components/musicoption/musicoption.page';
import { ModalController, NavController } from '@ionic/angular';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-musicaime',
  templateUrl: './musicaime.page.html',
  styleUrls: ['./musicaime.page.scss'],
})
export class MusicaimePage implements OnInit {
  userId: number = parseInt(localStorage.getItem('userId') || '0', 10);
  likes: any[]=[];
  constructor(
    private modalCtrl: ModalController,
    public navCtrl: NavController,
    private userService:UserService
  ) { }


  async openOptionSound() {
    const modal = await this.modalCtrl.create({
      component: MusicoptionPage,
      initialBreakpoint: 0.75,
      breakpoints: [0.5, 0.75, 1],
      mode: 'ios'
    })
    await modal.present();
  }

  goToPlay() {
    musicTab.musicIsPlay = true;
    musicTab.isClose = false;
    this.navCtrl.navigateForward('play');
  }



  ngOnInit() {
    this.userService.getLikeds(this.userId).subscribe((response)=>{
      this.likes = response.data.data;
      console.log(this.likes,'likeeeeeeeeeeeees')
    });
  }

}
