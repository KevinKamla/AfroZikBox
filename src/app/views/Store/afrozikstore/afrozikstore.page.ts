import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-afrozikstore',
  templateUrl: './afrozikstore.page.html',
  styleUrls: ['./afrozikstore.page.scss'],
})
export class AfrozikstorePage implements OnInit {

  selectedSegment = 'chansons';
  valueRangeMin = 0
  valueRangeMax = 50
  genreList = ['Afrozouk', 'Afrobeat', 'Afropop', 'Afrotrap', 'Amapiano', 'Ancestral Soul', 'Assiko',
    'Azonto', ' Batuque', 'Bend-skin', 'Bikutsi', 'Bongo Flava', 'Coupé-décalé', 'Dancehall',
    'Gqom', 'Highlife', 'Kizomba', 'Kwaito', 'Makossa', 'Maloya', 'Mapouka', 'Mbalax', 'Morna',
    'Ndombolo', 'Rumba congolaise', 'Sega', 'Soukous', 'Swede Swede', 'Tribal House', 'Wassoulou',
    'Zaïko', 'Ziglibithy', 'Zoblazo', 'Zouglou', 'Zouk']
  displayBtn = 'none'
  constructor() { }

  ngOnInit() {
    this
  }

  rangeChange(event: any) {
    this.valueRangeMin = event.detail.value.lower
    this.valueRangeMax = event.detail.value.upper
  }

}
