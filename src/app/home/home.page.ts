/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {  
  
  selectedSegment: string = 'suggestions'; // Set a default value

  constructor() { }


  ngOnInit() {
  }

}
