/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-myadresse',
  templateUrl: './myadresse.page.html',
  styleUrls: ['./myadresse.page.scss'],
})
export class MyadressePage implements OnInit {

  constructor() { }

  public deleteConfirme = [
    {
      text: 'NON',
      role: 'cancel',
      handler: () => { },
    },
    {
      text: 'OUI',
      role: 'confirm',
      handler: () => { },
    },
  ];


  ngOnInit() {
  }

}
