import { UserData } from './../../models/user-info';
/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController, NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
import { MusicoptionPage } from 'src/app/components/musicoption/musicoption.page';
import { PlaylistoptionPage } from 'src/app/components/playlistoption/playlistoption.page';
import { AlbumsService } from 'src/app/services/albums.service';
import { ArticlesService } from 'src/app/services/articles.service';
import { ChansonsService } from 'src/app/services/chansons.service';
import { EventService } from 'src/app/services/event.service';
import { FavoriteService } from 'src/app/services/favorite.service';
import { GenresService } from 'src/app/services/genres.service';
import { LecteurService } from 'src/app/services/lecteur.service';
import { PlaylistService } from 'src/app/services/playlist.service';
import { TopAlbumsService } from 'src/app/services/top-albums.service';
import { UserService } from 'src/app/services/user.service';

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
  follower: any;
  following: any;
  email_on_follow_user: any;
  latest: any[] = [];
  playlist: any[] = [];
  chansons: any[] = [];
  albums: any[] = [];
  topalbums: any[] = [];
  albumSongs: { [key: string]: any[] } = {};
  accessToken: string = localStorage.getItem('accessToken') || '';
  userId: number = parseInt(localStorage.getItem('userId') || '0', 10);
  favoris: any[] = [];
  events: any[] = [];
  profile : any[]=[];
  isAdmin: boolean = false; // Déclaration de la propriété isAdmin

  constructor(
    private storage: Storage,
    private playlistService: PlaylistService,
    private chansonService: ChansonsService,
    private modalCtrl: ModalController,
    private navCtrl: NavController,
    public route: Router,
    private albumsService: AlbumsService,
    private topAlbumsService: TopAlbumsService,
    private favoriteService: FavoriteService,
    private articlesService: ArticlesService,
    private userService : UserService,
    private eventService : EventService,
    private PlaylistService: PlaylistService,
    private musicService: LecteurService // Injection du service de musique

  ) { }

  selectEvent(event: any) {
    localStorage.setItem('selectedEvent', JSON.stringify(event));
    this.route.navigate(['eventdetail', event.id]);
  }
    
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
      this.email = UserData.username;
      this.isAdmin = this.email === 'admin' ? true : false;
      this.avatar = UserData.avatar;
      this.cover = UserData.cover
      // this.like = UserData.email_on_follow_user
      this.email_on_follow_user = UserData.email_on_follow_user
    }
    this.userService.getFollowers(this.userId).subscribe((response)=>{
      this.follower = response.data.count;
    });
    this.userService.getFollowing(this.userId).subscribe((response)=>{
      this.following = response.data.count;
    });
    this.userService.getProfile(this.userId).subscribe((response) => {
      this.profile = response.details;
    });
    this.userService.getLikeds(this.userId).subscribe((response) =>{
      // console.log(response);
      this.like = response.data.count;
      // console.log(this.like,"likeeeeeeeeee")
    });
    this.eventService.getMyEvents(this.userId,'').subscribe((res) => {
      console.log('eventtttttttttttt',res);
      this.events = res.data;
    });
    this.favoriteService.getFavorites(this.userId, this.accessToken).subscribe((res) => {
      // console.log(res);
      this.favoris = res.data.data;
    });
    this.playlistService.getPlaylists().subscribe(
      (response) => {
        this.playlist = response.playlists;
        // console.log('playlist récupérés :', this.playlist);
      },
      (error) => {
        console.error('Erreur lors de la récupération des genres :', error);
      }
    );
    this.topAlbumsService.getTopAlbums().subscribe(
      (response) => {
        this.albums = response.top_albums;
        // console.log('meilleurs albums récupérés :', this.albums);
        this.loadSongsForTopAlbums();
      },
      (error) => {
        console.error('Erreur lors de la récupération des meilleurs albums :', error);
      }
    );
    this.chansonService.getChansons().subscribe(
      (response) => {
        this.chansons = response.data;
        // console.log('chansons récupérés :', this.chansons);
      },
      (error) => {
        console.error('Erreur lors de la récupération des genres :', error);
      }
    );
  }

  loadSongsForTopAlbums() {
    this.topalbums.forEach(album => {
      this.albumsService.getAlbumsr(album.id, '').subscribe(
        (response) => {
          // console.log(response, 'response');
          this.albumSongs[album.id] = response.songs; // Stocke les chansons pour chaque album
          console.log(`Chansons pour l'album ${album.id} :`, response.songs);
        },
        (error) => {
          console.error(`Erreur lors de la récupération des chansons pour l'album ${album.id} :`, error);
        }
      );
    });
  }

  selectAlbum(album: any) {
    localStorage.setItem('selectedAlbum', JSON.stringify(album));
    this.route.navigate(['albumdetail', album.id]);
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

  playMusicFromSongs(song: any, index: number) {
    this.musicService.loadNewPlaylist(this.chansons, index);
  }
  playMusicFromFavoris(song: any, index: number) {
    this.musicService.loadNewPlaylist(this.favoris, index);
  }
  loadsong(playlist:any, index:number){
    // console.log('Playlist chargement...')
    this.PlaylistService.updateindex(index)
    this.PlaylistService.loadplaylist(playlist, index)
    this.musicService.loadNewPlaylist(playlist, index);
  }

  
  selectArticle(article: any) {
    localStorage.setItem('selectedArticle', JSON.stringify(article));
    this.route.navigate(['achatdetail']);
  }
}
