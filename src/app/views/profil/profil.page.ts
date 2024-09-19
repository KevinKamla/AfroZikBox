/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController, NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
import { MusicoptionPage } from 'src/app/components/musicoption/musicoption.page';
import { PlaylistoptionPage } from 'src/app/components/playlistoption/playlistoption.page';
import { ChansonsService } from 'src/app/services/chansons.service';
import { GenresService } from 'src/app/services/genres.service';
import { PlaylistService } from 'src/app/services/playlist.service';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.page.html',
  styleUrls: ['./profil.page.scss'],
})
export class ProfilPage implements OnInit {


  selectedSegment: string = 'Chansons';
  UserData : any
  email: string = '';
  latest: any[] = [];
  playlist: any[] = [];
  chansons: any[] = [];
  albums: any[] = [];

  constructor(
    private storage: Storage,
    private playlistService: PlaylistService,
    private chansonService: ChansonsService,
    private modalCtrl: ModalController,
    private navCtrl: NavController,
    public route: Router,
  ) { }


    
  public btnoptionProfil = [
    {
      text: 'Changer la photo de couverture',
      handler: () => { },
    },
    {
      text: 'Paramètre',
      handler: () => { this.goToRoute('settings') },
    },
    {
      text: 'Copier le lien vers le profil',
      handler: () => { },
    },
  ];
  async ngOnInit() {
    const userdata =localStorage.getItem("UserData")
    if (userdata) {
      this.UserData = JSON.parse(userdata).data

      // this.email = user.email;  // Assigner l'email stocké à la variable
    }
    
    // await this.storage.create();

    // Récupérer les informations utilisateur stockées
    // const user = await this.storage.get('user');

    this.playlistService.getPlaylists().subscribe(
      (response) => {
        this.playlist = response.playlists;
        console.log('playlist récupérés :', this.playlist);
      },
      (error) => {
        console.error('Erreur lors de la récupération des genres :', error);
      }
    );

    this.chansonService.getChansons().subscribe(
      (response) => {
        this.chansons = response.data;
        console.log('chansons récupérés :', this.chansons);
      },
      (error) => {
        console.error('Erreur lors de la récupération des genres :', error);
      }
    );
  }

  async openOptionSound() {
    const modal = await this.modalCtrl.create({
      component: MusicoptionPage,
      initialBreakpoint: 0.75,
      breakpoints: [0.5, 0.75, 1],
      mode: 'ios'
    })

    await modal.present();
  }

  async openOptionPlaylist() {
    const modale = await this.modalCtrl.create({
      component: PlaylistoptionPage,
      initialBreakpoint: 0.75,
      breakpoints: [0.5, 0.75, 1],
      mode: 'ios'

    })
    await modale.present();
  }

  goToRoute(route: string = '') {
    if (route) {
      this.route.navigate([route]);
    } else {
      this.navCtrl.back();
    }
  }



}
