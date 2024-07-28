/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
import { Component, OnInit } from '@angular/core';
import { Clipboard } from '@capacitor/clipboard';

@Component({
  selector: 'app-affilies',
  templateUrl: './affilies.page.html',
  styleUrls: ['./affilies.page.scss'],
})
export class AffiliesPage implements OnInit {

  isToastOpen = false;
  constructor() { }

  writeToClipboard = async (url: string) => {
    await Clipboard.write({
      url: url
    }).then(() => {this.isToastOpen = true });
  };

  ngOnInit() {
  }

}
