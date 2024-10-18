import { Injectable } from '@angular/core';
import { Filesystem, Directory } from '@capacitor/filesystem';
import { Storage } from '@capacitor/storage';
@Injectable({
  providedIn: 'root',
})
export class DownloadService {
  constructor() {}
  // Function to download and store music, image, and metadata
  async downloadAndStoreMusic(currentSong:any) {
    try {
            // this.currentSong.audio_location,
            //   this.currentSong.title,
            //   this.currentSong.thumbnail,
            //   this.currentSong.title + '_img';
      // Download and store the music file
      const musicFile = await this.downloadAndStoreFile(
        currentSong.audio_location,
        currentSong.title,
        'audio'
      );

      // Download and store the image file
      await this.downloadAndStoreFile(
        currentSong.thumbnail,
      currentSong.title + '_img',
        'image'
      );

      // Extract metadata (duration) from the downloaded music file
      const duration =  currentSong.duration

      // Store the music, image, and metadata (duration) in Capacitor Storage
      await this.addMusicAndImageToDownloads(
        currentSong.title,
        currentSong.title + '_img',
        duration
      );

      console.log(
        'Song, image, and metadata downloaded and stored successfully'
      );
    } catch (error) {
      console.error('Error downloading or storing music and image:', error);
    }
  }

  // Generalized function to download a file (either music or image) and store it securely
  private async downloadAndStoreFile(
    url: string,
    fileName: string,
    fileType: 'audio' | 'image'
  ): Promise<Blob> {
    try {
      // Fetch the file from the URL
      const response = await fetch(url);
      const blob = await response.blob();

      // Convert Blob to base64 for storing
      const base64Data = await this.blobToBase64(blob);

      // Store the file in private storage
      await Filesystem.writeFile({
        path: fileName,
        data: base64Data,
        directory: Directory.Data, // Secure storage
      });

      console.log(
        `${fileType.charAt(0).toUpperCase() + fileType.slice(1)} file stored:`,
        fileName
      );
      return blob;
    } catch (error) {
      console.error(`Error downloading or storing ${fileType} file:`, error);
      throw error;
    }
  }

  // Add music, image, and metadata to Capacitor Storage
  private async addMusicAndImageToDownloads(
    musicFileName: string,
    imageFileName: string,
    duration: number
  ) {
    const { value } = await Storage.get({ key: 'downloadedMusic' });
    let downloadedMusic = value ? JSON.parse(value) : [];

    // Add new song, image, and metadata to the list
    downloadedMusic.push({
      musicFile: musicFileName,
      imageFile: imageFileName,
      duration: duration, // Store duration
    });

    // Save the updated list back to storage
    await Storage.set({
      key: 'downloadedMusic',
      value: JSON.stringify(downloadedMusic),
    });

    console.log('Music, image, and metadata saved in Capacitor Storage');
  }

  // Retrieve the list of downloaded music, images, and metadata
  async getDownloadedMusic(): Promise<
    Array<{ musicFile: string; imageFile: string; duration: number }>
  > {
    const { value } = await Storage.get({ key: 'downloadedMusic' });
    return value ? JSON.parse(value) : [];
  }
  // Convert Blob to base64
  blobToBase64(blob: Blob): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  }
}
