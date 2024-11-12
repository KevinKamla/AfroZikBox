import { Component, OnInit } from '@angular/core';
import { AlbumsService } from 'src/app/services/albums.service';

@Component({
  selector: 'app-afrozikstore',
  templateUrl: './afrozikstore.page.html',
  styleUrls: ['./afrozikstore.page.scss'],
})
export class AfrozikstorePage implements OnInit {

  selectedSegment = 'chansons';
  valueRangeMin = 0
  valueRangeMax = 50
  genreList : any[] = [];
  displayBtn = 'none'
  constructor(private albumService: AlbumsService) { }

  ngOnInit() {
    this.fetchGenres();
  }


   // Fetch genres from the API
   fetchGenres() {
    this.albumService.getGenres().subscribe(
      (response) => {
        this.genreList = response.data.map((item: any) => ({
          id: item.id,
          name: item.cateogry_name,
        }));
      },
      (error) => {
        console.error('Error fetching genres:', error);
      }
    );
  }

  rangeChange(event: any) {
    this.valueRangeMin = event.detail.value.lower
    this.valueRangeMax = event.detail.value.upper
  }

}
