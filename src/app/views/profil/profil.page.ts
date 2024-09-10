/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
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

  email: string = '';  
  latest:any[]=[];
  playlist:any[]=[];
  chansons:any[]=[];

  constructor(private storage: Storage, private playlistService:PlaylistService, private chansonService: ChansonsService ) {}

  async ngOnInit() {
    await this.storage.create(); 

    // Récupérer les informations utilisateur stockées
    const user = await this.storage.get('user');
    if (user) {
      this.email = user.email;  // Assigner l'email stocké à la variable
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

}
