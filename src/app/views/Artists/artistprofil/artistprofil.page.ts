import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalController, NavController } from '@ionic/angular';
import { musicTab } from '../../play/play.page';
import { AlbumdetailPage } from '../../Albums/albumdetail/albumdetail.page';
import { TopSongsService } from 'src/app/services/top-songs.service';
import { TopAlbumsService } from 'src/app/services/top-albums.service';
import { SuggestionsService } from 'src/app/services/suggestions.service';
import { LecteurService } from 'src/app/services/lecteur.service';
import { PlaylistService } from 'src/app/services/playlist.service';
import { FollowService } from 'src/app/services/follow.service';

@Component({
  selector: 'app-artistprofil',
  templateUrl: './artistprofil.page.html',
  styleUrls: ['./artistprofil.page.scss'],
})
export class ArtistprofilPage implements OnInit {
  suivre = 'Suivre';
  isFollowers = false;
  username = 'Bolingo';
  artist: any;
  isFollowing: boolean = false; // Suivre l'état de suivi

  constructor(
    private navCtrl: NavController,
    public route: Router,
    private modal: ModalController,
    private routes: ActivatedRoute,
    private topsService: TopSongsService,
    private topAlbumsService: TopAlbumsService,
    private suggestionsService: SuggestionsService,
    private PlaylistService: PlaylistService,
    private followService:FollowService,
    private musicService: LecteurService // Injection du service de musique
  ) {}

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
        }
      });
    } else {
      this.followService.followUser(userId).subscribe({
        next: () => {
          this.isFollowing = true; // Mise à jour de l'état
          console.log('Abonné avec succès');
        },
        error: (error) => {
          console.error('Erreur lors de l\'abonnement', error);
        }
      });
    }
  }
  public alertCashfreeButtons = [
    {
      text: 'Copier le lien vers le profil',
      role: 'confirm',
      handler: () => {
        this.copyLinkAndRedirect(); // Appel de la méthode pour copier le lien
      },
    },
    {
      text: 'Bloquer',
      role: 'cancel',
      handler: () => {},
    },
  ];

  copyLinkAndRedirect() {
    const artistLink = this.artist.url; // Remplacez par l'URL appropriée
    navigator.clipboard.writeText(artistLink).then(() => {
      console.log('Lien copié :', artistLink);
      window.open(artistLink, '_blank'); // Ouvre le lien dans un nouvel onglet
    }).catch(err => {
      console.error('Erreur lors de la copie du lien :', err);
    });
  }
  topSongs: any[] = [];
  artist_ids: any;
  idArtist: any;
  filteredTOPSongs: any[] = [];
  filteredTOPAlbums: any[] = [];
  filteredLatest: any[] = [];
  topalbums: any[] = [];
  latest: any[] = [];
  ngOnInit() {
    const artist = this.routes.snapshot.paramMap.get('id');
    const artists = localStorage.getItem('artist');
    if (artists) {
      this.artist = JSON.parse(artists);
      this.idArtist = this.artist.id;
      console.log('artist', this.artist);
    }

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
