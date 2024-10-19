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

  constructor(
    private navCtrl: NavController,
    public route: Router,
    private modal: ModalController,
    private routes: ActivatedRoute,
    private topsService: TopSongsService,
    private topAlbumsService: TopAlbumsService,
    private suggestionsService: SuggestionsService,
    private PlaylistService: PlaylistService,
    private musicService: LecteurService // Injection du service de musique
  ) { }

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
  }


  async openAlbumDetail(props: any) {
    const modal = await this.modal.create({
      component: AlbumdetailPage,
      showBackdrop: true,
      backdropDismiss: false,
    })
    await modal.present();
  }


  Following() {
    this.suivre === 'Suivre' ? this.suivre = 'Following' : this.suivre = 'Suivre';
    this.suivre === 'Suivre' ? this.isFollowers = false : this.isFollowers = true;
  }

  
  public alertCashfreeButtons = [
    {
      text: 'Copier le lien vers le profil',
      role: 'confirm',
      handler: () => { },
    },
    {
      text: 'Bloquer',
      role: 'cancel',
      handler: () => { },
    },
  ];

  topSongs: any[] = [];
  artist_ids :any;
  idArtist:any;
  filteredTOPSongs:any[]=[];
  filteredTOPAlbums:any[]=[];
  filteredLatest:any[]=[];
  topalbums:any[]=[];
  latest:any[]=[];
  ngOnInit() {
    const artist = this.routes.snapshot.paramMap.get('id');
    const artists = localStorage.getItem('artist');
    console.log(artists);
    if (artists) {
      this.artist = JSON.parse(artists);
      this.idArtist = this.artist.artist;
      console.log('idArtist',this.idArtist);
    }
    this.topsService.getTopSongs().subscribe(
      (response) => {
        this.topSongs = response.data; 
        this.filteredTOPSongs = this.topSongs.filter(song => song.user_id === this.idArtist);
        console.log(this.filteredTOPSongs,'filteredSongs'); 
        // this.loadSongsForTopAlbums();
        console.log(this.topSongs);
      },
      (error) => {
        console.error('Erreur lors de la récupération des Meilleur songs :', error);
      }
    );
    this.topAlbumsService.getTopAlbums().subscribe(
      (response) => {
        this.topalbums = response.top_albums;
        console.log(this.topalbums);
        this.filteredTOPAlbums = this.topalbums.filter(album => album.user_id === this.idArtist);
        console.log(this.filteredTOPAlbums,'filteredTOPAlbums'); 
      },
      (error) => {
        console.error('Erreur lors de la récupération des meilleurs albums :', error);
      }
    );
    this.suggestionsService.getSuggestions().subscribe(
      (response) => {
        this.latest = response.new_releases.data;
        console.log(this.latest);
        this.filteredLatest = this.latest.filter(latest => latest.user_id === this.idArtist);
        console.log(this.filteredLatest,'filteredLatest');
      },
      (error) => {
        console.error('Erreur lors de la récupération des suggestions :', error);
      }
    );
    
  }

  selectAlbum(album: any) {
    localStorage.setItem('selectedAlbum', JSON.stringify(album));
    this.route.navigate(['albumdetail', album.id]);
  }

  loadsong(playlist:any, index:number){
    // console.log('Playlist chargement...')
    this.PlaylistService.updateindex(index)
    this.PlaylistService.loadplaylist(playlist, index)
    this.musicService.loadNewPlaylist(playlist, index);
  }

}
