import { Injectable } from '@angular/core';
import { Media, MediaObject } from '@awesome-cordova-plugins/media/ngx';
import { AlertController, Platform } from '@ionic/angular';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SongsService {
  private mediaObject: MediaObject | null = null;
  private isPlayingSubject = new BehaviorSubject<boolean>(false);
  private currentSongSubject = new BehaviorSubject<any>(null);
  
  isPlaying$: Observable<boolean> = this.isPlayingSubject.asObservable();
  currentSong$: Observable<any> = this.currentSongSubject.asObservable();

  constructor(
    private media: Media, 
    private platform: Platform, 
    private alertController: AlertController
  ) {}

  updateCurrentSong(song: any) {
    this.currentSongSubject.next(song);
  }

  // Méthode pour afficher une alerte
  async showAlert(message: string) {
    const alert = await this.alertController.create({
      header: 'Alert',
      subHeader: 'A Sub Header Is Optional',
      message: message,
      buttons: ['OK']
    });

    await alert.present();
  }

  loadSong(songUrl: string, songId: string): Promise<void> {
    this.showAlert("test ok !")
    return new Promise<void>((resolve, reject) => {
      this.platform.ready().then(() => {
        if (this.mediaObject) {
          this.mediaObject.stop();
          this.mediaObject.release();
        }
        this.mediaObject = this.media.create(songUrl);

        // Écouter les mises à jour de statut
        this.mediaObject.onStatusUpdate.subscribe(status => {
          console.log('Status update:', status);
          // Vous pouvez vérifier si la lecture a commencé ici
        });

        // Écouter les erreurs
        this.mediaObject.onError.subscribe(error => {
          reject(error);
          this.showAlert('Erreur lors du chargement de la chanson : ' + error.toString());
        });

        // Démarrer la lecture
        try {
          this.mediaObject.play({ playAudioWhenScreenIsLocked: true });
          this.showAlert('Lecture en cours !');
          this.isPlayingSubject.next(true);
          this.updateCurrentSong({ url: songUrl, id: songId });
          resolve();
        } catch (error) {
          reject(error);
          this.showAlert('Erreur lors de la lecture de la chanson : ' + error);
        }
      }).catch(err => {
        this.showAlert('Erreur lors de la préparation de la plateforme : ' + err.message);
        reject(err);
      });
    });
  }
  
  // loadSong(songUrl: string, songId: string): Promise<void> {
  //   return new Promise<void>((resolve, reject) => {
  //     this.platform.ready().then(() => {
  //       if (this.mediaObject) {
  //         this.mediaObject.stop();
  //         this.mediaObject.release();
  //       }
  //       this.mediaObject = this.media.create(songUrl);
  //       this.mediaObject.play({ playAudioWhenScreenIsLocked: true })
  //       this.isPlayingSubject.next(true);
  //       this.showAlert('platforme is ready, and song is playing : ');
  //       this.updateCurrentSong({ url: songUrl, id: songId });
  //     }).catch(err => {
  //       this.showAlert('Erreur lors de la préparation de la plateforme : ' + err.message);
  //       reject(err);
  //     });
  //   });
  // }

  playMusic(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      if (this.mediaObject) {
        this.mediaObject.play({ playAudioWhenScreenIsLocked: true })
        this.isPlayingSubject.next(true);
        resolve();
      } else {
        this.showAlert('Aucun objet média à lire');
        reject(new Error('No media object to play'));
      }
    });
  }

  pauseMusic(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      if (this.mediaObject) {
        this.mediaObject.pause()
        this.isPlayingSubject.next(false);
      } else {
        this.showAlert('Aucun objet média à mettre en pause');
        reject(new Error('No media object to pause'));
      }
    });
  }

  stopMusic(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      if (this.mediaObject) {
        this.mediaObject.stop()
        this.mediaObject.release();
        this.isPlayingSubject.next(false);
        resolve();
      } else {
        this.showAlert('Aucun objet média à arrêter');
        reject(new Error('No media object to stop'));
      }
    });
  }

  seekTo(position: number): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      if (this.mediaObject) {
        this.mediaObject.seekTo(position * 1000)
      } else {
        this.showAlert('Aucun objet média pour se déplacer');
        reject(new Error('No media object to seek'));
      }
    });
  }

  getCurrentTime(): Promise<number> {
    return new Promise<number>((resolve, reject) => {
      if (this.mediaObject) {
        this.mediaObject.getCurrentPosition()
          .then((position: number) => resolve(position))
          .catch(err => {
            this.showAlert('Erreur lors de la récupération du temps actuel : ' + err.message);
            reject(err);
          });
      } else {
        resolve(0);
      }
    });
  }

  getDuration(): Promise<number> {
    return new Promise<number>((resolve, reject) => {
      if (this.mediaObject) {
        let duration= this.mediaObject.getDuration()
        resolve(duration)
      } else {
        resolve(0);
      }
    });
  }
}
