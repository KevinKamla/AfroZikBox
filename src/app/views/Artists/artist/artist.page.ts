import { Component, OnInit } from '@angular/core';
import { ArtistService } from '../../../services/artist.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-artist',
  templateUrl: './artist.page.html',
  styleUrls: ['./artist.page.scss'],
})
export class ArtistPage implements OnInit {

  artists: any[] = [];

  constructor(private artistService: ArtistService,    public route: Router,
  ) { }

  ngOnInit() {
    this.artistService.getArtists().subscribe(
      (response) => {
        console.log('Artistes récupérés :', response);
        this.artists = response.data.data;
      },
      (error) => {
        console.error('Erreur lors de la récupération des artistes :', error);
      }
    );
  }
  artistDetail = (item: any) => {
    console.log(item);
    localStorage.setItem('artist', JSON.stringify(item));
    this.route.navigate(['/artistprofil', item.id]);
  };
}
