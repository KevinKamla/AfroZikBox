import { Component, OnInit } from '@angular/core';
import { AlbumdetailPage } from '../albumdetail/albumdetail.page';
import { ModalController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-album',
  templateUrl: './album.page.html',
  styleUrls: ['./album.page.scss'],
})
export class AlbumPage implements OnInit {

  constructor(
    private modalCtrl: ModalController,
  ) { }

 
  ngOnInit() {
    this
  }

}
