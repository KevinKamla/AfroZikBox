import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root',
})
export class UserSessionService {
  private readonly IS_LOGGED_IN_KEY = 'isLoggedIn';
  private readonly USER_SESSION_KEY = 'userSession';

  constructor(private storage: Storage) {
    this.init();
  }

  // Initialisation du stockage
  private async init() {
    await this.storage.create();
  }

  // Définir l'état de connexion
  async setLoggedIn(value: boolean): Promise<void> {
    await this.storage.set(this.IS_LOGGED_IN_KEY, value);
  }

  // Vérifier l'état de connexion
  async isLoggedIn(): Promise<boolean> {
    const isLoggedIn = await this.storage.get(this.IS_LOGGED_IN_KEY);
    return isLoggedIn ?? false; // Retourne false par défaut si non défini
  }

  // Sauvegarder les données de session utilisateur
  async setUserSession(value: { [key: string]: any }): Promise<void> {
    await this.storage.set(this.USER_SESSION_KEY, value);
  }

  // Récupérer les données de session utilisateur
  async getUserSession(): Promise<{ [key: string]: any }> {
    const session = await this.storage.get(this.USER_SESSION_KEY);
    return session ?? {}; // Retourne un objet vide par défaut si non défini
  }

  // Supprimer les données de session utilisateur
  async clearSession(): Promise<void> {
    await this.storage.remove(this.IS_LOGGED_IN_KEY);
    await this.storage.remove(this.USER_SESSION_KEY);
  }
}
