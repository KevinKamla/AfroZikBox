import { Component, OnInit } from '@angular/core';
import { musicTab } from '../play/play.page';
import { MusicoptionPage } from 'src/app/components/musicoption/musicoption.page';
import { ModalController, NavController } from '@ionic/angular';
import { DownloadService } from 'src/app/services/download.service';
import { Filesystem, Directory } from '@capacitor/filesystem';
import { Storage } from '@capacitor/storage';
@Component({
  selector: 'app-download',
  templateUrl: './download.page.html',
  styleUrls: ['./download.page.scss'],
})
export class DownloadPage implements OnInit {
  downloadedMusic: Array<{
    musicFile: string;
    imageFile: string;
    duration: number;
  }> = [];

  constructor(
    private modalCtrl: ModalController,
    public navCtrl: NavController,
    private downloadService: DownloadService
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
    this.downloadedMusic = await this.downloadService.getDownloadedMusic();
  }

  // Retrieve the image file and convert it to a displayable format
  async getImageSrc(imageFileName: string): Promise<string> {
    try {
      const result = await Filesystem.readFile({
        path: imageFileName,
        directory: Directory.Data,
      });

      return `data:image/jpeg;base64,${result.data}`;
    } catch (error) {
      console.error('Error retrieving image file:', error);
      return ''; // Return empty string if image not found
    }
  }

  // Format duration to mm:ss
  formatDuration(seconds: number): string {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60)
      .toString()
      .padStart(2, '0');
    return `${minutes}:${remainingSeconds}`;
  }
}
