import { Component, OnInit } from '@angular/core';
import { ArtistService } from '../../../services/artist.service';
import { Router } from '@angular/router';
import { FollowService } from 'src/app/services/follow.service';
@Component({
  selector: 'app-artist',
  templateUrl: './artist.page.html',
  styleUrls: ['./artist.page.scss'],
})
export class ArtistPage implements OnInit {
  artists: any[] = [];
  isFollowing: boolean | undefined;
  userId: any;
  allArtists: any[] = []; // Liste complète des artistes
  pageSize = 10; // Nombre d'artistes par "page"
  currentPage = 0;

  constructor(
    private artistService: ArtistService,
    public route: Router,
    private followService: FollowService
  ) {}

  ngOnInit() {
    this.userId = parseInt(localStorage.getItem('userId') || '0', 10);

    this.artistService.getArtists().subscribe(
      (response) => {
        console.log('Artistes récupérés :', response);

        // Charger tous les artistes dans `allArtists`
        this.allArtists = response.data.data.map((artist: any) => ({
          ...artist,
          isFollowing: false, // Ajout d'un état initial
        }));

        // Charger la première "page" dans `artists`
        this.loadNextPage();
      },
      (error) => {
        console.error('Erreur lors de la récupération des artistes :', error);
      }
    );
  }

  loadNextPage() {
    const startIndex = this.currentPage * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    const nextArtists = this.allArtists.slice(startIndex, endIndex);
    this.artists = [...this.artists, ...nextArtists];
    nextArtists.forEach((artist) => this.checkIfFollowing(this.userId, artist));
    this.currentPage++;
  }

  refreshArtists(event: any) {
    this.artistService.getArtists().subscribe(
      (response) => {
        console.log('Artistes rafraîchis :', response);
  
        // Met à jour la liste des artistes
        this.artists = response.data.data.map((artist: any) => ({
          ...artist,
          isFollowing: false,
        }));
  
        // Vérifiez le suivi pour chaque artiste
        this.artists.forEach((artist) => this.checkIfFollowing(this.userId, artist));
  
        // Fin de l'animation de rafraîchissement
        event.target.complete();
      },
      (error) => {
        console.error('Erreur lors du rafraîchissement des artistes :', error);
  
        // Fin de l'animation même en cas d'erreur
        event.target.complete();
      }
    );
  }
  
  loadMore(event: any) {
    if (this.currentPage * this.pageSize < this.allArtists.length) {
      this.loadNextPage();
    } else {
      event.target.disabled = true;
    }
    setTimeout(() => {
      event.target.complete();
    }, 1000);
  }

  artistDetail = (item: any) => {
    console.log(item);
    localStorage.setItem('artist', JSON.stringify(item));
    const userData = localStorage.getItem('UserData');
    if (userData) {
      const parsedUserData = JSON.parse(userData);
      if (parsedUserData.id === item.id) {
        this.route.navigate(['/tabs/profil']);
      } else {
        this.route.navigate(['/artistprofil', item.id]);
      }
    } else {
      this.route.navigate(['/artistprofil', item.id]);
    }
  };

  checkIfFollowing(userId: number, artist: any) {
    this.followService.getFollowers(artist.id).subscribe({
      next: (response: any) => {
        console.log('Réponse API:', response);
        const followedUsers = response.data.data; 
        artist.isFollowing = followedUsers.some(
          (user: any) => user.id === userId
        );
      },
      error: (error) => {
        console.error(
          'Erreur lors de la récupération des utilisateurs suivis',
          error
        );
      },
    });
  }

  toggleFollow(artist: any) {
    if (artist.isFollowing) {
      // Désabonnement
      this.followService.unfollowUser(artist.id).subscribe({
        next: () => {
          artist.isFollowing = false; // Mise à jour de l'état
          console.log('Désabonné avec succès');
        },
        error: (error) => {
          console.error('Erreur lors du désabonnement', error);
        },
      });
    } else {
      // Abonnement
      this.followService.followUser(artist.id).subscribe({
        next: () => {
          artist.isFollowing = true; // Mise à jour de l'état
          console.log('Abonné avec succès');
        },
        error: (error) => {
          console.error("Erreur lors de l'abonnement", error);
        },
      });
    }
  }
}
