import { Component, OnInit } from '@angular/core';
import { ArtistService } from '../../../services/artist.service';
@Component({
  selector: 'app-artist',
  templateUrl: './artist.page.html',
  styleUrls: ['./artist.page.scss'],
})
export class ArtistPage implements OnInit {

  artists: any[] = [];

  constructor(private artistService: ArtistService) { }

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

}
