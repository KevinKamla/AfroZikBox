/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
import { Component, OnInit } from '@angular/core';
import { ArticlesService } from '../../../services/articles.service';
import { ActivatedRoute, Router } from '@angular/router';
import { PlaylistService } from 'src/app/services/playlist.service';

@Component({
  selector: 'app-tendance',
  templateUrl: './tendance.page.html',
  styleUrls: ['./tendance.page.scss'],
})
export class TendancePage implements OnInit {
  private accessToken: any;
  public data: any;
  article: any[] = [];
  publicPlaylist: any[] = [];
  playlistId: number | undefined;
  playlistSongs: any[] = [];

  constructor(
    private articleService: ArticlesService,
    private router: Router,
    private route: ActivatedRoute,
    private publicPlaylistService: PlaylistService
  ) {}

  goToAlbum() {}
  ionViewWillEnter() {
    localStorage.removeItem('selectArticle');
    localStorage.removeItem('selectedPlaylist');
    localStorage.clear();
  }
  ngOnInit() {
    this.publicPlaylistService.getPublicPlayList().subscribe({
      next: (response) => {
        console.log(response);
        this.publicPlaylist = response.success.playlists;
        console.log(this.publicPlaylist);
      },
      error: (error) => {
        console.error(error);
      },
    });
    this.articleService.getArticles().subscribe(
      (response) => {
        this.article = response.data;
        console.log('Articles récupéréss :', this.article);
      },
      (error) => {
        console.error('Erreur lors de la récupération des Artistes :', error);
      }
    );
  }

  selectArticle(article: any) {
    // Ajouter les informations de l'album au localStorage
    localStorage.setItem('selectArticle', JSON.stringify(article));

    // Naviguer vers la page des détails de l'album sélectionné
    this.router.navigate(['detailtendance', article.id]);
  }

  selectAlbum(publicPlaylist: any) {
    // Ajouter les informations de l'album au localStorage
    localStorage.setItem('selectedPlaylist', JSON.stringify(publicPlaylist));

    // Naviguer vers la page des détails de l'album sélectionné
    this.router.navigate(['playlistdetail', publicPlaylist.id]);
  }
}
