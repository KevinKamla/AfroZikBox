import { Component, OnInit } from '@angular/core';
import { musicTab } from '../../play/play.page';
import { MusicoptionPage } from 'src/app/components/musicoption/musicoption.page';
import { ModalController, NavController } from '@ionic/angular';
import { UserService } from 'src/app/services/user.service';
import { ArticlesService } from 'src/app/services/articles.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-listachat',
  templateUrl: './listachat.page.html',
  styleUrls: ['./listachat.page.scss'],
})
export class ListachatPage implements OnInit {
  userId: number = parseInt(localStorage.getItem('userId') || '0', 10);
  accessToken: string = localStorage.getItem('accessToken') || '';
  purchases: any[] = [];
  article: any[] = [];
  
  constructor(
    private modalCtrl: ModalController,
    public navCtrl: NavController,
    private userService: UserService,
    private articleService: ArticlesService, 
    private route: Router

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


  selectArticle(article: any) {
    localStorage.setItem('selectedArticle', JSON.stringify(article));
    this.route.navigate(['achatdetail']);
  }



  ngOnInit() {
    this.userService.getPurchases(this.userId).subscribe((response) => {
      this.purchases = response.data;
      console.log(this.purchases, 'purchasesss')
    });

    this.articleService.getArticles().subscribe(
      (response) => {
        this.article = response.data;
        console.log('Articles récupéréss :', this.article);
      },
      (error) => {
        console.error('Erreur lors de la récupération des Artistes :', error);
      }
    );
  }

}
