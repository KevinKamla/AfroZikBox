import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-detailtendance',
  templateUrl: './detailtendance.page.html',
  styleUrls: ['./detailtendance.page.scss'],
})
export class DetailtendancePage implements OnInit {

  constructor(
    public route: Router,
    private aroute: ActivatedRoute,
    private routes: ActivatedRoute,
  ) { }
  article: any;
  cleanText: string = '';  // Nouvelle propriété pour stocker le texte nettoyé

  ngOnInit() {
    const albumId = this.routes.snapshot.paramMap.get('id');

    const storedArticle = localStorage.getItem('selectArticle');

    // Vérifier si l'album existe dans le localStorage
    if (storedArticle) {
      // Convertir la chaîne JSON en un objet
      this.article = JSON.parse(storedArticle);
      // this.songs = this.album.songs
      console.log(this.article);
    } else {
      console.log('Aucun article n\'est stocké dans le localStorage');
    } 

  const content = this.article.content;
  const parser = new DOMParser();
  const decodedContent = parser.parseFromString(content, 'text/html').body.textContent;
  // console.log(decodedContent);
  
  if (decodedContent) {
    this.cleanText = decodedContent.replace(/<[^>]+>/g, '');
  } else {
    console.log('Le contenu décodé est null ou undefined');
  }


  }

}
