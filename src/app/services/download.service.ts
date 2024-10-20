// src/app/services/download.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Filesystem, Directory, Encoding } from '@capacitor/filesystem';
import { Storage } from '@capacitor/storage';

@Injectable({
  providedIn: 'root',
})
export class DownloadService {
  downloadedSongs: any[] = [];

  constructor(private http: HttpClient) {}

  // Method to download a song and its cover image
  async downloadSongFromObject(songData: any) {
    const { audio_location, title, artist, thumbnail, duration } = songData;

    try {
      // Download and save song file
      const songBlob = await this.downloadFile(audio_location);
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
      console.log('Song and metadata saved successfully:', newSong);
    } catch (error) {
      console.error('Error downloading song or cover art:', error);
    }
  }

  // Helper method to download a file (song or cover art) as a blob
  private downloadFile(url: string): Promise<Blob | undefined> {
    return this.http.get(url, { responseType: 'blob' }).toPromise();
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
            directory: Directory.Data,
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
