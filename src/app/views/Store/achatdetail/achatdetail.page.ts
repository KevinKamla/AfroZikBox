import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Share } from '@capacitor/share';

@Component({
  selector: 'app-achatdetail',
  templateUrl: './achatdetail.page.html',
  styleUrls: ['./achatdetail.page.scss'],
})
export class AchatdetailPage implements OnInit {

  constructor(
    private navCtrl: NavController,
    public route: Router,
    private routes: ActivatedRoute,
  ) { }
 
  public alertActionreeButtons = [
    {
      text: 'Partager',
      role: 'confirm',
      handler: () => { 
        this.shareMusicLink();
      },
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
  achats:any;
  achat:any;
  cover:any;
  url:any;
  ngOnInit() {
    this.achat = this.routes.snapshot.paramMap.get('id');
    console.log(this.achat, 'achatttt');
    const storedAlbum = localStorage.getItem('selectedArticle');

    if (storedAlbum) {
      // Convertir la chaîne JSON en un objet
      this.achats = JSON.parse(storedAlbum);
      console.log(this.achats, 'achatttt');
      this.cover =this.achats.event.image;
      this.url = this.achats.url;
    } else {
      console.log('Aucun album n\'est stocké dans le localStorage');
    }
  }

  async shareMusicLink() {
    try {
      await Share.share({
        title: 'Partager ceci !',
        text: 'Découvrez cette evenement incroyable !',
        url: this.url,
        dialogTitle: 'Partager l evenement',
      });
    } catch (error) {
      console.error('Erreur lors du partage:', error);
    }
  }

}
