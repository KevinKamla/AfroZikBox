/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
import { Component, OnInit } from '@angular/core';
import { ArticlesService } from '../../../services/articles.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tendance',
  templateUrl: './tendance.page.html',
  styleUrls: ['./tendance.page.scss'],
})
export class TendancePage implements OnInit {

  constructor(
    private articleService: ArticlesService,
    private router: Router
  ) { }

  goToAlbum(){
    
  }

  article:any[]=[]
  ngOnInit() {
    this.articleService.getArticles().subscribe(
      (response) => {
        this.article = response.data;
        console.log('Articles récupérés :', this.article);
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

}
