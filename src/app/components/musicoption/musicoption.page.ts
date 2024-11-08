/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController, NavController, NavParams } from '@ionic/angular';
import { musicTab } from 'src/app/views/play/play.page';
import { CreateplaylistPage } from '../createplaylist/createplaylist.page';
import { AddplaylistPage } from '../addplaylist/addplaylist.page';
import { Share } from '@capacitor/share';
import { PlaylistService } from 'src/app/services/playlist.service';
import { LecteurService } from 'src/app/services/lecteur.service';
import { File } from '@ionic-native/file/ngx';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
import { FavoriteService } from 'src/app/services/favorite.service';
import { EventService } from 'src/app/services/event.service';

@Component({
  selector: 'app-musicoption',
  templateUrl: './musicoption.page.html',
  styleUrls: ['./musicoption.page.scss'],
})
export class MusicoptionPage implements OnInit {
  accessToken: string = localStorage.getItem('accessToken') || '';
  userId: number = parseInt(localStorage.getItem('userId') || '0', 10);
  favoris: any[] = [];
  liked!:any;
  addStory = false;
  currentSong: any;
  @Input() song: any | undefined;
  constructor(
    private PlaylistService: PlaylistService,
    public navCtrl: NavController,
    private modalCtrl: ModalController,
    private favoriteService: FavoriteService,
    private navParams: NavParams,
    public route: Router,
    private musicPlayerService: LecteurService,
    private file: File,
    private androidPermissions: AndroidPermissions,
    private eventService: EventService
  ) {}

  likeSong(audioId: string) {
    this.favoriteService.likeDislikeSong(audioId).subscribe({
        next: (data) => {
            this.liked = true; // Met à jour l'état à "aimé"
            console.log('Chanson aimée:', data);
        },
        error: (err) => {
            console.error('Erreur lors de l\'ajout aux favoris:', err);
        },
    });
}

dislikeSong(audioId: string) {
    this.favoriteService.dislikeTrack(audioId).subscribe({
        next: (data) => {
            console.log('Chanson non aimée:', data);
            this.liked = false; // Met à jour l'état à "non aimé"
        },
        error: (err) => {
            console.error('Erreur lors de la suppression des favoris:', err);
        },
    });
}
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
      handler: async () => {
        await this.addToPlaylist();
      },
    },
    {
      text: 'Fait',
      handler: () => {},
    },
  ];

  public addToWaitingList() {
    console.log('Ajouter à la liste d attente');
    this.musicPlayerService.addTowaitingList(this.song);
  }
  public btnSignale = [
    {
      text: 'Annuler',
      handler: () => {},
    },
    {
      text: 'Soumettre',
      handler: () => {},
    },
  ]; 
  async shareMusicLink(url: string) {
    console.log(url)
    try {
      await Share.share({
        title: 'Écoutez cette musique !',
        text: 'Découvrez cette chanson incroyable !',
        url: url,
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
  currentSongIndex: number = 0;
  playNextSong() {
    let song = this.PlaylistService.getnextsong();
    this.playMusic(song, this.currentSongIndex);
    // if (this.currentSongIndex + 1 < this.topSongs.length) {
    //   this.currentSongIndex++;
    //   this.playMusic(this.topSongs[this.currentSongIndex], this.currentSongIndex);
    // } else {
    //   console.log('Toutes les chansons ont été jouées.');
    // }
  }
  playMusic(song: any, index: number): void {
    // Appelez la méthode playMusic avec song et index
    this.musicPlayerService.playMusic(song, index);
    musicTab.musicIsPlay = true;
    this.currentSong = song;
    console.log(this.currentSong); 
  }
  artistDetail = (item: any) => { 
    console.log(item);
    // localStorage.setItem('artist', JSON.stringify(item));
    this.route.navigate(['/artistprofil', item]);
  };

  republier(id :any){
    this.eventService.getReblier(id).subscribe((response) => {
      alert(response.data);
      console.log(response.data)
    },
    (error) => {
      console.error('Erreur lors de la récupération des meilleurs albums :', error);
    }
  );
  }
  async addToPlaylist() {
    const modal = await this.modalCtrl.create({
      component: AddplaylistPage,
      initialBreakpoint: 0.75,
      breakpoints: [0.5, 0.75, 1],
      mode: 'ios',
    });
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
  cleanText: string = ''; // Nouvelle propriété pour stocker le texte nettoyé
  playlistIds!: any;
  selectedPlaylist: any;
  ngOnInit() {
    const storedSong = localStorage.getItem('currentSong');
    console.log('werrrrrrrrr', storedSong);
    if (storedSong) {
      this.currentSong = JSON.parse(storedSong);
      console.log('sonngggggg', this.currentSong);
      // Utiliser this.currentSong comme nécessaire
    }
    const content = this.currentSong.description;

    const parser = new DOMParser();
    const decodedContent = parser.parseFromString(content, 'text/html').body
      .textContent;
    // console.log(decodedContent);

    if (decodedContent) {
      this.cleanText = decodedContent.replace(/<[^>]+>/g, '');
      console.log(this.cleanText);
    } else {
      console.log('Le contenu décodé est null ou undefined');
    }

    this.playlistIds = this.navParams.get('playlistId');
    this.selectedPlaylist = this.navParams.get('playlistData');
    console.log('Playlist data:', this.selectedPlaylist);
    // const selectedPlaylist = this.favoris.find(
    //   (favoris) => favoris.id === this.playlistIds
    // ); // Recherche de l'élément
    // console.log('Playlistsssss:', this.selectedPlaylist);

    // if (selectedPlaylist) {
    //   console.log('Playlist sélectionnée:', selectedPlaylist); // Afficher la playlist trouvée
    // } else {
    //   console.log("Aucune playlist trouvée avec l'ID:", this.playlistIds);
    // }
    // this.selectedPlaylist = this.navParams.get('selectedPlaylist'); // Récupérer les componentProps
  }

  setRingtone(audioFileName: string) {
    console.log('urlllll', audioFileName);
    // Demander les permissions d'écriture
    this.androidPermissions
      .requestPermission(
        this.androidPermissions.PERMISSION.WRITE_EXTERNAL_STORAGE
      )
      .then(() => {
        // Définir le chemin source et le chemin cible (répertoire des sonneries)
        const sourcePath = this.file.externalDataDirectory + audioFileName; // Chemin du fichier audio dans ton app
        const targetPath = this.file.externalRootDirectory + 'Ringtones/'; // Répertoire des sonneries sur Android

        // Copier le fichier dans le répertoire des sonneries
        this.file
          .copyFile(sourcePath, audioFileName, targetPath, audioFileName)
          .then(() => {
            console.log(
              'Fichier audio copié avec succès dans le dossier des sonneries'
            );

            // Maintenant, définir ce fichier comme sonnerie
            this.setAsRingtone(targetPath + audioFileName);
          })
          .catch((err) => {
            console.log('Erreur lors de la copie du fichier', err);
          });
      });
  }
  setAsRingtone(filePath: string) {
    // Utiliser une méthode Java pour définir le fichier comme sonnerie
    // Par exemple, appeler l'API Android via un "exec" Cordova ou en modifiant un ContentProvider Android
    console.log('Définir le fichier comme sonnerie:', filePath);
    // Implémente une logique pour informer Android de définir le fichier comme sonnerie
  }
}
