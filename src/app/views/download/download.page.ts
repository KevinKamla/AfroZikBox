import { Component, OnInit } from '@angular/core';
import { musicTab } from '../play/play.page';
import { MusicoptionPage } from 'src/app/components/musicoption/musicoption.page';
import { ModalController, NavController } from '@ionic/angular';
import { DownloadService } from 'src/app/services/download.service';
import { Filesystem, Directory } from '@capacitor/filesystem';
import { Storage } from '@capacitor/storage';
import { LecteurService } from 'src/app/services/lecteur.service';
import { PlaylistService } from 'src/app/services/playlist.service';

@Component({
  selector: 'app-download',
  templateUrl: './download.page.html',
  styleUrls: ['./download.page.scss'],
})
export class DownloadPage implements OnInit {
  downloadedMusic: any[] = [];

  constructor(
    private modalCtrl: ModalController,
    public navCtrl: NavController,
    private downloadService: DownloadService,
    private PlaylistService: PlaylistService,
    private musicService: LecteurService // Injection du service de musique
  ) {}

  async openOptionSound() {
    const modal = await this.modalCtrl.create({
      component: MusicoptionPage,
      initialBreakpoint: 0.75,
      breakpoints: [0.5, 0.75, 1],
      mode: 'ios',
    });
    await modal.present();
  }
  goToPlay() {
    musicTab.musicIsPlay = true;
    musicTab.isClose = false;
    this.navCtrl.navigateForward('play');
  }
  // Fetch downloaded music and metadata
  ngOnInit() {
    this.loadDownloadedMusic();
  }

  async loadDownloadedMusic() {
    // Load downloaded songs from storage
    await this.downloadService.loadDownloadedSongs();
    this.downloadedMusic = this.downloadService.getDownloadedSongs();

    // Check if all songs are still available
    await this.downloadService.checkAllSongsAvailability();
  }

  // Format duration to mm:ss
  formatDuration(seconds: number): string {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60)
      .toString()
      .padStart(2, '0');
    return `${minutes}:${remainingSeconds}`;
  }

  // Method to handle playing a song
  playSong(song: any) {
    if (song.isAvailable) {
      const audio = new Audio(song.filePath);
      audio.play();
    } else {
      alert('The song file is no longer available on your device.');
    }
  }
}
