/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController, NavController } from '@ionic/angular';
import { FilteractionsearchPage } from 'src/app/components/filteractionsearch/filteractionsearch.page';
import { RechercheService } from 'src/app/services/recherche.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {
  selectedSegment: string = 'suggestions';
  keyword: string = '';
  genres: string = '';
  price: string = '';
  fetch: string[] = ['songs', 'albums', 'artist'];
  results: any;
  details: any;
  loading: boolean | undefined;

  constructor(
    public route: Router,
    public navCtrl: NavController,
    private modalCtrl: ModalController,
    private searchService: RechercheService
  ) {}

  goToRoute(route: string = '') {
    if (route) {
      this.route.navigate([route]);
    } else {
      this.navCtrl.back();
    }
  }

  async openActionFilter() {
    const modal = await this.modalCtrl.create({
      component: FilteractionsearchPage,
      initialBreakpoint: 0.5,
      breakpoints: [0.5],
      cssClass: 'menu-filter',
      mode: 'ios',
    });
    await modal.present();
  }

  ngOnInit() {
    this.performSearch();
  }

  performSearch() {
    this.loading = true;

    let fetch = [this.selectedSegment];

    this.searchService
      .search(this.keyword, this.genres, this.price, fetch)
      .subscribe(
        (response: any) => {
          this.loading = false;
          if (response.status === 200) {
            this.results = response.data;
          } else {
            console.log('Erreur :', response.message);
          }
        },
        (error) => {
          this.loading = false;
          console.error('Erreur lors de la recherche :', error);
        }
      );
  }
}
