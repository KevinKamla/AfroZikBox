import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ArticlesService } from 'src/app/services/articles.service';

@Component({
  selector: 'app-listtendance',
  templateUrl: './listtendance.page.html',
  styleUrls: ['./listtendance.page.scss'],
})
export class ListtendancePage implements OnInit {
  article: any[] = [];

  constructor(private articleService: ArticlesService, private route: Router) { }

  ngOnInit() {
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
    localStorage.setItem('selectedArticle', JSON.stringify(article));
    this.route.navigate(['detailtendance', article.id]);
  }


}
