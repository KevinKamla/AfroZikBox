// src/app/services/download.service.ts
import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient, HttpEventType, HttpResponse } from '@angular/common/http';
import { Filesystem, Directory, Encoding } from '@capacitor/filesystem';
import { Storage } from '@capacitor/storage';
import { LocalNotifications } from '@capacitor/local-notifications';
@Injectable({
  providedIn: 'root',
})
export class DownloadService {
  downloadedSongs: any[] = [];
  downloadProgress: EventEmitter<number> = new EventEmitter<number>();

  constructor(private http: HttpClient) {}

  // Method to download a song and its cover image
  async downloadSongFromObject(songData: any) {
    const { audio_location, title, artist, thumbnail, duration } = songData;

    const notificationId = Math.floor(Math.random() * 100000);
    try {
      await this.showDownloadProgressNotification(notificationId, title, 0);

      // Download and save song file
      const songBlob = await this.downloadFileWithProgress(
        audio_location,
        notificationId,
        `${title}.mp3`
      );
      const songFilePath = await this.saveFileToFilesystem(
        `${title}.mp3`,
        songBlob!
      );

      // Download and save cover image
      const coverBlob = await this.downloadFile(thumbnail);
      const coverFilePath = await this.saveFileToFilesystem(
        `${title}.jpg`,
        coverBlob!
      );

      const newSong = {
        title,
        artist: artist || 'Unknown',
        duration: duration || 'Unknown',
        filePath: songFilePath,
        coverArtPath: coverFilePath,
      };

      // Add song to local storage
      await this.addSongToStorage(newSong);
      this.downloadedSongs.push(newSong);

      await LocalNotifications.cancel({
        notifications: [{ id: notificationId }],
      });
      await this.showCompletedNotification(notificationId, title);
      console.log('Song and metadata saved successfully:', newSong);
    } catch (error) {
      console.error('Error downloading song or cover art:', error);
    }
  }

  // Helper method to download a file (song or cover art) as a blob
  private downloadFile(url: string): Promise<Blob | undefined> {
    return this.http.get(url, { responseType: 'blob' }).toPromise();
  }

  // Helper method to download a file (song or cover art) as a blob
  private downloadFileWithProgress(
    url: string,
    notificationId: number,
    title: string
  ): Promise<Blob | undefined> {
    return new Promise((resolve, reject) => {
      this.http
        .get(url, {
          responseType: 'blob',
          observe: 'events',
          reportProgress: true,
        })
        .subscribe({
          next: async (event) => {
            if (event.type === HttpEventType.DownloadProgress) {
              const progress = event.total
                ? Math.round((100 * event.loaded) / event.total)
                : 0;
              this.downloadProgress.emit(progress);
              console.log(`Download progress: ${progress}%`);
              await this.updateDownloadProgressNotification(
                notificationId,
                title,
                progress
              );
            } else if (event instanceof HttpResponse) {
              resolve(event.body as Blob);
            }
          },
          error: (error) => reject(error),
        });
    });
  }
  // Helper method to save a file to the filesystem
  private async saveFileToFilesystem(
    fileName: string,
    fileBlob: Blob
  ): Promise<string> {
    const reader = new FileReader();
    reader.readAsDataURL(fileBlob);

    return new Promise((resolve, reject) => {
      reader.onloadend = async () => {
        const base64data = reader.result as string;

        try {
          const result = await Filesystem.writeFile({
            path: fileName,
            data: base64data.split(',')[1], // Remove base64 header
            directory: Directory.Documents,
          });
          resolve(result.uri);
        } catch (error) {
          reject(error);
        }
      };

      reader.onerror = (error) => {
        reject(error);
      };
    });
  }

  // Show initial download notification
  private async showDownloadProgressNotification(
    notificationId: number,
    title: string,
    progress: number
  ) {
    await LocalNotifications.schedule({
      notifications: [
        {
          largeBody: '' + progress,
          id: notificationId,
          title: `Downloading ${title}`,
          body: `${progress}% completed`,
          ongoing: true,
        },
      ],
    });
  }

  // Update progress in notification
  private async updateDownloadProgressNotification(
    notificationId: number,
    title: string,
    progress: number
  ) {
    await LocalNotifications.schedule({
      notifications: [
        {
          id: notificationId,
          title: `Downloading ${title}`,
          body: `${progress}% completed`,
          ongoing: true,
          largeBody: '' + progress,
        },
      ],
    });
  }

  // Show completed notification
  private async showCompletedNotification(
    notificationId: number,
    title: string
  ) {
    await LocalNotifications.schedule({
      notifications: [
        {
          id: notificationId,
          title: `Download Complete`,
          body: `${title} has been downloaded.`,
          ongoing: false,
        },
      ],
    });
  }

  // Add song metadata to storage
  private async addSongToStorage(song: any): Promise<void> {
    this.downloadedSongs.push(song);

    // Save to storage
    await Storage.set({
      key: 'downloadedSongs',
      value: JSON.stringify(this.downloadedSongs),
    });
  }

  // Load downloaded songs from storage
  async loadDownloadedSongs(): Promise<void> {
    const result = await Storage.get({ key: 'downloadedSongs' });
    if (result.value) {
      this.downloadedSongs = JSON.parse(result.value);
    }
  }

  // Check if a downloaded song file still exists
  async checkSongAvailability(song: any): Promise<boolean> {
    try {
      const result = await Filesystem.stat({
        path: song.filePath,
        directory: Directory.Data,
      });
      return !!result;
    } catch (error) {
      console.error('File not found:', error);
      return false;
    }
  }

  // Check availability of all downloaded songs
  async checkAllSongsAvailability(): Promise<void> {
    for (let song of this.downloadedSongs) {
      song.isAvailable = await this.checkSongAvailability(song);
    }

    // Update storage
    await Storage.set({
      key: 'downloadedSongs',
      value: JSON.stringify(this.downloadedSongs),
    });
  }

  // Retrieve the list of downloaded songs
  getDownloadedSongs() {
    return this.downloadedSongs;
  }
}
