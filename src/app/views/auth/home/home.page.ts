/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  valSlide = 0;
  constructor(private router: Router, private authService: AuthService) {}

  onStart() {
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['/tabs']);
    } else {
      this.router.navigate(['/login']);
    }
  }
  swiperSlideChanged(e: any) {
    this.valSlide = e.detail[0].activeIndex;
  }


  ngOnInit() {
  }

}
