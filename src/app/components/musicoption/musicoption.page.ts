/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController, NavController } from '@ionic/angular';
import { musicTab } from 'src/app/views/play/play.page';
import { CreateplaylistPage } from '../createplaylist/createplaylist.page';
import { AddplaylistPage } from '../addplaylist/addplaylist.page';
import { Share } from '@capacitor/share';

@Component({
  selector: 'app-musicoption',
  templateUrl: './musicoption.page.html',
  styleUrls: ['./musicoption.page.scss'],
})
export class MusicoptionPage implements OnInit {

  addStory = false;
  currentSong:any;
  constructor(
    public navCtrl: NavController,
    private modalCtrl: ModalController,
    public route: Router,

  ) { }

  public inputInformation = [
    {
      placeholder: 'Information',
      type: 'text',
      labelPlacement: 'floating',
    },
  ];

  public btnAddPlaylist = [
    {
      text: 'Créer',
      handler: async() => { await this.addToPlaylist()},
    },
    {
      text: 'Fait',
      handler: () => { },
    },
  ];

  public btnSignale = [
    {
      text: 'Annuler',
      handler: () => {},
    },
    {
      text: 'Soumettre',
      handler: () => { },
    },
  ];
  async shareMusicLink(url: string) {
    try {
      await Share.share({
        title: 'Écoutez cette musique !',
        text: 'Découvrez cette chanson incroyable !',
        url: this.currentSong.url,
        dialogTitle: 'Partager la musique',
      });
    } catch (error) {
      console.error('Erreur lors du partage:', error);
    }
  }

  closeModal() {
    this.modalCtrl.dismiss();
    this.modalCtrl.dismiss();
  }

  addToNext() {
    if (musicTab.musicIsPlay === false) {
      this.addStory = true;
    }
    this.closeModal();
  }
  
  async addToPlaylist() {
    const modal = await this.modalCtrl.create({
      component: AddplaylistPage,
      initialBreakpoint: 0.75,
      breakpoints: [0.5, 0.75, 1],
      mode: 'ios'

    })
    this.closeModal();
    await modal.present();
  }


goToRoute(route: string = '') {
  if (route) {
    this.route.navigate([route]);
  } else {
    this.navCtrl.back();
  }
}
cleanText: string = '';  // Nouvelle propriété pour stocker le texte nettoyé


  ngOnInit() {
    const storedSong = localStorage.getItem('currentSong');
    console.log('werrrrrrrrr',storedSong)
    if (storedSong) {
      this.currentSong = JSON.parse(storedSong);
      console.log('sonngggggg', this.currentSong)
      // Utiliser this.currentSong comme nécessaire
    }
    const content = this.currentSong.description;
    const parser = new DOMParser();
    const decodedContent = parser.parseFromString(content, 'text/html').body.textContent;
    // console.log(decodedContent);
    
    if (decodedContent) {
      this.cleanText = decodedContent.replace(/<[^>]+>/g, '');
    } else {
      console.log('Le contenu décodé est null ou undefined');
    }
  } 
  
}
