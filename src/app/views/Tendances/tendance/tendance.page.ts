/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
import { Component, OnInit } from '@angular/core';
import { ArticlesService } from '../../../services/articles.service';
import { ActivatedRoute, Router } from '@angular/router';
import { PlaylistService } from 'src/app/services/playlist.service';
import { AuthService } from 'src/app/services/auth.service';

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
    private publicPlaylistService: PlaylistService,
    private authService: AuthService,
  ) {}

  goToAlbum() {}
  ionViewWillEnter() {
    localStorage.removeItem('selectArticle');
    localStorage.removeItem('selectedPlaylist');
    // localStorage.clear();
  }
  ngOnInit() {
    if (!this.authService.isUserLoggedIn()) {
      this.router.navigate(['/login']); // Redirige vers la page de connexion
      return;
    }
    this.publicPlaylistService.getPublicPlayList().subscribe({
      next: (response) => {
        console.log(response);
        this.publicPlaylist = response.success.playlists;
        console.log(this.publicPlaylist);
        localStorage.setItem('publicPlaylist', JSON.stringify(this.publicPlaylist));
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
    localStorage.setItem('selectArticle', JSON.stringify(article));
    this.router.navigate(['detailtendance', article.id]);
  }

  selectAlbum(publicPlaylist: any) {

    this.router.navigate(['playlistdetail', publicPlaylist.id]);
  }
}
