import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  AlertController,
  ModalController,
  NavController,
} from '@ionic/angular';
import { musicTab } from '../../play/play.page';
import { AlbumdetailPage } from '../../Albums/albumdetail/albumdetail.page';
import { TopSongsService } from 'src/app/services/top-songs.service';
import { TopAlbumsService } from 'src/app/services/top-albums.service';
import { SuggestionsService } from 'src/app/services/suggestions.service';
import { Storage } from '@ionic/storage-angular';
import { LecteurService } from 'src/app/services/lecteur.service';
import { PlaylistService } from 'src/app/services/playlist.service';
import { FollowService } from 'src/app/services/follow.service';
import { UserService } from 'src/app/services/user.service';
import { PlaylistoptionPage } from 'src/app/components/playlistoption/playlistoption.page';
import { MusicoptionPage } from 'src/app/components/musicoption/musicoption.page';
import { ChansonsService } from 'src/app/services/chansons.service';
import { AlbumsService } from 'src/app/services/albums.service';
import { FavoriteService } from 'src/app/services/favorite.service';
import { ArticlesService } from 'src/app/services/articles.service';
import { EventService } from 'src/app/services/event.service';

@Component({
  selector: 'app-artistprofil',
  templateUrl: './artistprofil.page.html',
  styleUrls: ['./artistprofil.page.scss'],
})
export class ArtistprofilPage implements OnInit {
  selectedSegment: string = 'Chansons';
  UserData: any;
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
  profile: any[] = [];
  isAdmin: boolean = false; // Déclaration de la propriété isAdmin
  url: any;
  constructor(
    private storage: Storage,
    private playlistService: PlaylistService,
    private chansonService: ChansonsService,
    private modalCtrl: ModalController,
    private navCtrl: NavController,
    public route: Router,
    private modal: ModalController,
    private routes: ActivatedRoute,
    private topsService: TopSongsService,
    private albumsService: AlbumsService,
    private topAlbumsService: TopAlbumsService,
    private favoriteService: FavoriteService,
    private articlesService: ArticlesService,
    private userService: UserService,
    private eventService: EventService,
    private yourService: EventService,
    private alertController: AlertController, // Ajout de l'AlertController
    private suggestionsService: SuggestionsService,
    private PlaylistService: PlaylistService,
    private followService: FollowService,
    private musicService: LecteurService,
    private userservice: UserService
  ) {}

  copyLinkAndRedirect() {
    const artistLink = this.url; // Remplacez par l'URL appropriée
    navigator.clipboard
      .writeText(artistLink)
      .then(() => {
        console.log('Lien copié :', artistLink);
        window.open(artistLink, '_blank'); // Ouvre le lien dans un nouvel onglet
      })
      .catch((err) => {
        console.error('Erreur lors de la copie du lien :', err);
      });
  }
  deleteEvent(eventId: number) {
    this.yourService.deleteEvent(eventId).subscribe({
      next: (response) => {
        console.log('Événement supprimé avec succès', response);
        this.showAlert('Succès', `${JSON.stringify(response.error)}`); // Correction de la popup de succès

        // Mettez à jour la liste après suppression
        this.events = this.events.filter((item) => item.id !== eventId);
      },
      error: (error) => {
        console.error("Erreur lors de la suppression de l'événement", error);
      },
    });
  }

  goToEditEvent(event: any) {
    this.navCtrl.navigateForward(['/createevenement'], {
      queryParams: { event: JSON.stringify(event) },
    });
  }

  selectEvent(event: any) {
    localStorage.setItem('selectedEvent', JSON.stringify(event));
    this.route.navigate(['eventdetail', event.id]);
  }

  public btnoptionProfil = [
    {
      text: 'Changer la photo de couverture',
      handler: () => {},
    },
    {
      text: 'Paramètre',
      handler: () => {
        this.goToRoute('settings');
      },
    },
    {
      text: 'Copier le lien vers le profil',
      handler: () => {
        this.copyLinkAndRedirect();
      },
    },
  ];

  loadSongsForTopAlbums() {
    this.topalbums.forEach((album) => {
      this.albumsService.getAlbumsr(album.id, '').subscribe(
        (response) => {
          // console.log(response, 'response');
          this.albumSongs[album.id] = response.songs; // Stocke les chansons pour chaque album
          console.log(`Chansons pour l'album ${album.id} :`, response.songs);
        },
        (error) => {
          console.error(
            `Erreur lors de la récupération des chansons pour l'album ${album.id} :`,
            error
          );
        }
      );
    });
  }

  async openOptionSound() {
    const modal = await this.modalCtrl.create({
      component: MusicoptionPage,
      initialBreakpoint: 0.75,
      breakpoints: [0.5, 0.75, 1],
      mode: 'ios',
    });

    await modal.present();
  }

  async openOptionPlaylist() {
    const modale = await this.modalCtrl.create({
      component: PlaylistoptionPage,
      initialBreakpoint: 0.75,
      breakpoints: [0.5, 0.75, 1],
      mode: 'ios',
    });
    await modale.present();
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

  selectArticle(article: any) {
    localStorage.setItem('selectedArticle', JSON.stringify(article));
    // this.route.navigate(['achatdetail',article.id]);
  }
  async showAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header: header,
      message: message,
      buttons: ['OK'],
    });
    await alert.present();
  }
  suivre = 'Suivre';
  isFollowers = false;
  username = 'Bolingo';
  artist: any;
  isFollowing: boolean = false; // Suivre l'état de suivi
  idArtis: any;
  user_id: any;

  goToRoute(route: string = '') {
    if (route) {
      this.route.navigate([route]);
    } else {
      this.navCtrl.back();
    }
  }

  playMusic = (item: any) => {
    musicTab.isClose = false;
    musicTab.musicIsPlay = true;
  };

  async openAlbumDetail(props: any) {
    const modal = await this.modal.create({
      component: AlbumdetailPage,
      showBackdrop: true,
      backdropDismiss: false,
    });
    await modal.present();
  }

  toggleFollow(userId: number) {
    if (this.isFollowing) {
      this.followService.unfollowUser(userId).subscribe({
        next: () => {
          this.isFollowing = false; // Mise à jour de l'état
          console.log('Désabonné avec succès');
        },
        error: (error) => {
          console.error('Erreur lors du désabonnement', error);
        },
      });
    } else {
      this.followService.followUser(userId).subscribe({
        next: () => {
          this.isFollowing = true; // Mise à jour de l'état
          console.log('Abonné avec succès');
        },
        error: (error) => {
          console.error("Erreur lors de l'abonnement", error);
        },
      });
    }
  }

  blockUser(userId: number) {
    console.log(userId);

    this.userservice.blockUser(userId).subscribe(
      (response) => {
        console.log('User blocked successfully', response);
      },
      (error) => {
        console.error('Error blocking user', error);
      }
    );
  }

  unBlockUser(userId: number) {
    console.log(userId);

    this.userservice.unBlockUser(userId).subscribe(
      (response) => {
        console.log('User unblocked successfully', response);
      },
      (error) => {
        console.error('Error unblocking user', error);
      }
    );
  }
  public alertCashfreeButtons = [
    {
      text: 'Copier le lien vers le profil',
      role: 'confirm',
      handler: () => {
        this.copyLinkAndRedirect();
      },
    },
    {
      text: '',
      role: 'cancel',
      handler: () => {
        const artists = localStorage.getItem('artist');
        if (artists) {
          this.artist = JSON.parse(artists);
          this.idArtist = this.artist.id;
          const u = localStorage.getItem('UserData');
          if (u) {
            const UserData = JSON.parse(u);
            this.user_id = UserData.id;
          }
          this.checkIfUserBlocked(this.user_id).then((isBlocked) => {
            if (isBlocked) {
              this.unBlockUser(this.idArtist);
            } else {
              this.blockUser(this.idArtist);
            }
          });
        }
      },
    },
  ];
  checkIfUserBlocked(userId: number): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.userservice.getBlockedUsers(userId).subscribe(
        (response: any) => {
          const blockedUsers = response.data?.data || [];
          const isBlocked = blockedUsers.some(
            (blockedUser: any) => blockedUser.id === userId
          );
          resolve(isBlocked);
        },
        (error) => {
          console.error('Error fetching blocked users', error);
          reject(false);
        }
      );
    });
  }

  // copyLinkAndRedirect() {
  //   const artistLink = this.artist.url; // Remplacez par l'URL appropriée
  //   navigator.clipboard
  //     .writeText(artistLink)
  //     .then(() => {
  //       console.log('Lien copié :', artistLink);
  //       window.open(artistLink, '_blank'); // Ouvre le lien dans un nouvel onglet
  //     })
  //     .catch((err) => {
  //       console.error('Erreur lors de la copie du lien :', err);
  //     });
  // }
  topSongs: any[] = [];
  artist_ids: any;
  idArtist: any;
  filteredTOPSongs: any[] = [];
  filteredTOPAlbums: any[] = [];
  filteredLatest: any[] = [];

  async ngOnInit() {
    // await this.storage.create();
    const userdata = localStorage.getItem('UserData');
    if (userdata) {
      this.UserData = JSON.parse(userdata).data;
      // const userId = this.UserData;
      // console.log("userdata.id :", this.UserData)
    }
    await this.storage.create();
    const artist = this.routes.snapshot.paramMap.get('id');
    const artists = localStorage.getItem('artist');
    if (artists) {
      this.artist = JSON.parse(artists);
      this.idArtist = this.artist.id;
      console.log('artist', this.idArtist);
    }
    const u = localStorage.getItem('UserData');
    if (u) {
      const UserData = JSON.parse(u);
      console.log('userdata :', UserData);
      this.email = UserData.username;
      this.isAdmin = this.email === 'admin' ? true : false;
      // this.avatar = UserData.avatar;
      // this.cover = UserData.cover;
      this.url = UserData.url;
      // this.like = UserData.email_on_follow_user
      this.email_on_follow_user = UserData.email_on_follow_user;
    }
    this.userService.getFollowers(this.idArtist).subscribe((response) => {
      this.follower = response.data.count;
    });
    this.userService.getFollowing(this.idArtist).subscribe((response) => {
      this.following = response.data.count;
    });
    this.userService.getProfile(this.idArtist).subscribe((response) => {
      this.profile = response.details;
    });
    this.userService.getLikeds(this.idArtist).subscribe((response) => {
      // console.log(response);
      this.like = response.data.count;
      // console.log(this.like,"likeeeeeeeeee")
    });
    this.eventService
      .getMyEvents(this.idArtist)
      .subscribe((res: { data: any[] }) => {
        console.log('eventtttttttttttt', res);
        this.events = res.data;
      });
    this.favoriteService
      .getFavorites(this.idArtist, this.accessToken)
      .subscribe((res: { data: { data: any[] } }) => {
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
        console.error(
          'Erreur lors de la récupération des meilleurs albums :',
          error
        );
      }
    );
    this.chansonService.getChansons().subscribe(
      (response: { data: any[] }) => {
        this.chansons = response.data;
        console.log('chansons récupérés :', this.chansons);
      },
      (error: any) => {
        console.error('Erreur lors de la récupération des genres :', error);
      }
    );
    this.checkIfUserBlocked(this.user_id).then((isBlocked) => {
      this.alertCashfreeButtons[1].text = isBlocked ? 'Débloquer' : 'Bloquer';
      console.log(this.alertCashfreeButtons[1].text);
    });
    this.topsService.getTopSongs().subscribe(
      (response) => {
        this.topSongs = response.data;
        this.filteredTOPSongs = this.topSongs.filter(
          (song) => song.user_id == this.idArtist
        ); // Correction ici
        console.log(this.filteredTOPSongs, 'filteredSongs');
      },
      (error) => {
        console.error(
          'Erreur lors de la récupération des Meilleur songs :',
          error
        );
      }
    );

    this.topAlbumsService.getTopAlbums().subscribe(
      (response) => {
        this.topalbums = response.top_albums;
        this.filteredTOPAlbums = this.topalbums.filter(
          (album) => album.user_id == this.idArtist
        ); // Correction ici
        console.log(this.filteredTOPAlbums, 'filteredTOPAlbums');
      },
      (error) => {
        console.error(
          'Erreur lors de la récupération des meilleurs albums :',
          error
        );
      }
    );

    this.suggestionsService.getSuggestions().subscribe(
      (response) => {
        this.latest = response.new_releases.data;
        this.filteredLatest = this.latest.filter(
          (latest) => latest.user_id == this.idArtist
        ); // Correction ici
        console.log(this.filteredLatest, 'filteredLatest');
      },
      (error) => {
        console.error(
          'Erreur lors de la récupération des suggestions :',
          error
        );
      }
    );
  }

  selectAlbum(album: any) {
    localStorage.setItem('selectedAlbum', JSON.stringify(album));
    this.route.navigate(['albumdetail', album.id]);
  }

  loadsong(playlist: any, index: number) {
    // console.log('Playlist chargement...')
    this.PlaylistService.updateindex(index);
    this.PlaylistService.loadplaylist(playlist, index);
    this.musicService.loadNewPlaylist(playlist, index);
  }
}
