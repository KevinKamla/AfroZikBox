import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  constructor(private storage: Storage) {
    this.init();
  }

  async init() {
    await this.storage.create();
  }

  // Set Device ID
  async setDeviceId(value: string, key: string) {
    await this.storage.set(key, value);
  }

  // Get Device ID
  async getDeviceId(key: string): Promise<string> {
    return (await this.storage.get(key)) || '';
  }

  // Clear All Storage
  async clearStorage() {
    await this.storage.clear();
  }

  // Remove Value from Storage
  async removeValue(key: string) {
    await this.storage.remove(key);
  }

  // Set Username
  async setUserName(value: string, key: string) {
    await this.storage.set(key, value);
  }

  // Get Username
  async getUserName(key: string): Promise<string> {
    return (await this.storage.get(key)) || '';
  }

  // Set Password
  async setPassword(value: string, key: string) {
    await this.storage.set(key, value);
  }

  // Get Password
  async getPassword(key: string): Promise<string> {
    return (await this.storage.get(key)) || '';
  }

  // Set User ID
  async setUserID(value: number, key: string) {
    await this.storage.set(key, value);
  }

  // Get User ID
  async getUserID(key: string): Promise<number> {
    return (await this.storage.get(key)) || 0;
  }

  // Set Shared Songs
  async setSharedSongs(value: Blob[], key: string) {
    await this.storage.set(key, value);
  }

  // Get Shared Songs
  async getSharedSongs(key: string): Promise<Blob[]> {
    return (await this.storage.get(key)) || [];
  }

  // Set Downloaded Songs
  async setDownloadSongs(value: Blob[], key: string) {
    await this.storage.set(key, value);
  }

  // Get Downloaded Songs
  async getDownloadSongs(key: string): Promise<Blob[]> {
    return (await this.storage.get(key)) || [];
  }

  // Set Dark Mode
  async setDarkMode(value: boolean, key: string) {
    await this.storage.set(key, value);
  }

  // Get Dark Mode
  async getDarkMode(key: string): Promise<boolean> {
    return (await this.storage.get(key)) || false;
  }

  // Set System Theme
  async setSystemTheme(value: boolean, key: string) {
    await this.storage.set(key, value);
  }

  // Get System Theme
  async getSystemTheme(key: string): Promise<boolean> {
    return (await this.storage.get(key)) || false;
  }

  // Set Genre IDs
  async setGenreIDs(value: number[], key: string) {
    await this.storage.set(key, value);
  }

  // Get Genre IDs
  async getGenreIDs(key: string): Promise<number[]> {
    return (await this.storage.get(key)) || [];
  }
}
