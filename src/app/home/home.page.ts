/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {  
  
  selectedSegment: string = 'suggestions'; 

  constructor(
    public route: Router,

  ) {}

  goToRoute(route: string){
    this.route.navigate([route]);
    
  }

  ngOnInit() {
  }

}
