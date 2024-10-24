/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ActionSheetController, ModalController, NavController } from '@ionic/angular';
import { MenuactionhomePage } from '../components/menuactionhome/menuactionhome.page';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  selectedSegment = 'suggestions';
  isUserLogged: boolean = false;
  constructor(
    public route: Router,
    private actionSheetCtrl: ActionSheetController,
    private modalCtrl: ModalController,
    private activeroute: ActivatedRoute,
    private navCtlr: NavController,
    private authService: AuthService,

  ) { }

  public actionSheetButtons = [
    {
      icon: 'cloud-download',
      cssClass: 'btn-download',
      text: 'Télécharger une seule chanson',
      handler: () => { }
    }, {
      icon: 'cloud-upload',
      cssClass: 'btn-upload',
      text: 'Importer une chanson',
      handler: () => { }
    }, {
      icon: 'albums',
      cssClass: 'btn-albums',
      text: 'Créer un album',
      handler: () => { }
    }, {
      icon: 'list',
      cssClass: 'btn-list',
      text: 'Créer une playlist',
      handler: () => { }
    }, {
      icon: 'radio',
      cssClass: 'btn-radio',
      text: 'Ajouter une nouvelle station radio',
      handler: () => { }
    }, {
      icon: 'megaphone',
      cssClass: 'btn-megaphone',
      text: 'Télécharger une seule chanson',
      handler: () => { }
    },
  ];

  async openMenuAdd() {
    const modal = await this.modalCtrl.create({
      component: MenuactionhomePage,
      initialBreakpoint: 0.5,
      breakpoints: [0.5,0.75,1],
      cssClass: "menu-action",
      mode: 'ios'

    })
    await modal.present();
  }

  closeModal() {
    this.modalCtrl.dismiss();
  }

  goToRoute(route: string) {
    this.route.navigate([route]);

  }

  ngOnInit() {
    this.isUserLogged = this.authService.isUserLoggedIn();
    // this.route.paramMap.subscribe((params:any) => {
    //   this.selectedSegment = params.get('segment') || 'defaultSegment';
    // });
    this.activeroute.paramMap.subscribe((params: any) => {
      this.selectedSegment = params.get('segment');
    });

  }
}
