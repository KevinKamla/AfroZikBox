import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { EditeplaylistPage } from '../editeplaylist/editeplaylist.page';

@Component({
  selector: 'app-playlistoption',
  templateUrl: './playlistoption.page.html',
  styleUrls: ['./playlistoption.page.scss'],
})
export class PlaylistoptionPage implements OnInit {

  constructor(
    private modalCtrl: ModalController,
  ) { }

  public btnConfirDelete = [
    {
      text: 'Delete',
    },
    {
      text: 'Cancel',
    }
  ]

  async openEditPlaylist(){
    this.closeModal();
    const modale = await this.modalCtrl.create({
      component: EditeplaylistPage,
      initialBreakpoint: 0.75,
      breakpoints: [0.5, 0.75, 1],
      mode: 'ios'

    })
    await modale.present();
  }


  closeModal() {
    this.modalCtrl.dismiss();
  }
  ngOnInit() {
    this
  }

}
