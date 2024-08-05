/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-managesession',
  templateUrl: './managesession.page.html',
  styleUrls: ['./managesession.page.scss'],
})
export class ManagesessionPage implements OnInit {

  confirDeletIsOpen = false;
  confirDeletButtons = [
    {
      text: 'Oui',
      handler: () => { this.confirDeletIsOpen = false; },
    },
    {
      text: 'Annuler',
      handler: () => { this.confirDeletIsOpen = false; },
    }
  ]
  constructor() { }

  confirmDelete() {
    this.confirDeletIsOpen = true;
  }
  ngOnInit() {
  }

}
