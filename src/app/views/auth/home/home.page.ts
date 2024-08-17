/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  valSlide = 0;
  constructor() { }

  swiperSlideChanged(e: any) {
    this.valSlide = e.detail[0].activeIndex;
  }


  ngOnInit() {
  }

}
