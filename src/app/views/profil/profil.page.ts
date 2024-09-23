import { UserData } from './../../models/user-info';
/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController, NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
import { MusicoptionPage } from 'src/app/components/musicoption/musicoption.page';
import { PlaylistoptionPage } from 'src/app/components/playlistoption/playlistoption.page';
import { AlbumsService } from 'src/app/services/albums.service';
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
  avatar: any;
  cover: any;
  like: any;
  email_on_follow_user: any;
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
    private albumsService: AlbumsService
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
    // await this.storage.create();
    const userdata =localStorage.getItem("UserData")
    if (userdata) {
      this.UserData = JSON.parse(userdata).data
      // const userId = this.UserData; 
      // console.log("userdata.id :", this.UserData)
    }
    await this.storage.create();

    const u = localStorage.getItem("UserData")
    if (u) {
      const UserData = JSON.parse(u)
      console.log("userdata :", UserData )
      this.email = UserData.email
      this.avatar = UserData.avatar
      this.cover = UserData.cover
      this.like = UserData.email_on_follow_user
      this.email_on_follow_user = UserData.email_on_follow_user
      // const userId = this.UserData.id; // Récupérer l'ID de l'utilisateur
      // console.log("userId :", userId)
      // this.albumsService.getAlbum(2, 'access_token').subscribe(
      //   (response) => {
      //     this.albums = response.songs;
      //     console.log('albums récupérés :', this.albums);
      //   },
      //   (error) => {  
      //     console.error('Erreur lors de la récupération des albums :', error);
      //   }
      // );
    }

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

  selectPlaylist(playlist: any) {
    localStorage.setItem('selectedPlaylist', JSON.stringify(playlist));
    this.route.navigate(['playlistdetail', playlist.id]);
  }


}
