/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-genre',
  templateUrl: './genre.page.html',
  styleUrls: ['./genre.page.scss'],
})
export class GenrePage implements OnInit {

  constructor() { }
  genres = [
    { name: 'Afro zouk', checked: false },
    { name: 'Afrobeat', checked: false },
    { name: 'Ambass', checked: false },
    { name: 'Assiko', checked: false },
    { name: 'Rap', checked: false },
  ];

  // Méthode pour gérer le changement d'état des cases à cocher
  toggleCheckbox(name:any) {
    this.genres.forEach(genre =>{
      if (genre === name) {
        genre.checked = !genre.checked;
      }
    });
    console.log(this.genres);
    
  }
  // genres = [
  //   { name: 'Zouk', image: 'assets/icon/album.png', selected: false },
  //   { name: 'Afrobeat', image: 'assets/icon/album.png', selected: false },
  //   { name: 'Ambass-bey', image: 'assets/icon/album.png', selected: false },
  //   { name: 'Assiko', image: 'assets/icon/album.png', selected: false }
  // ];
  
  updateSelection(ev:any) {
    console.log(ev);
  }

  ngOnInit() {
  }

}
