import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class StoryService {
  private accessToken = localStorage.getItem('accessToken');
  private serverKey = environment.server_key;
  private create = `${environment.api}/story/create`;
  private get = `${environment.api}/story/get`;
  private start = `${environment.api}/story/start`;
  private delete = `${environment.api}/story/delete`;
  private pay = `${environment.api}/story/pay`;
  private next = `${environment.api}/story/next`;
  private previous = `${environment.api}/story/previous`;
  private story_views = `${environment.api}/story/story_views`;   
  constructor(private http: HttpClient) {}

  // Headers pour le multipart/form-data
  private getHttpOptions() {
    const headers = new HttpHeaders({
      'Content-Type': 'multipart/form-data',
      Authorization: this.accessToken || '',
    });
    return { headers };
  }

  // Créer une histoire
  createStory(formData: FormData): Observable<any> {
    const url = this.create;
    return this.http.post(url, formData, this.getHttpOptions());
  }

  // Payer pour publier une histoire
  payStory(storyId: number): Observable<any> {
    return this.http.post(this.pay, { id: storyId }, this.getHttpOptions());
  }

  // Supprimer une histoire
  deleteStory(storyId: number): Observable<any> {
    return this.http.post(this.delete, { id: storyId }, this.getHttpOptions());
  }

  // Récupérer toutes les histoires
  getStories(): Observable<any> {
    return this.http.get(this.get, this.getHttpOptions());
  }

  // Démarrer une histoire (suivi d'utilisateur)
  startStory(userId: number, storyId: number): Observable<any> {
    return this.http.post(
      this.start,
      { user_id: userId, story_id: storyId },
      this.getHttpOptions()
    );
  }

  // Méthode pour passer à la story suivante
  nextStory(user_id: number, story_id: number, next_user_id: number, next_story_id: number): Observable<any> {
    return this.http.post(this.next, {
      user_id,
      story_id,
      next_user_id,
      next_story_id
    });
  }

  // Méthode pour revenir à la story précédente
  previousStory(user_id: number, story_id: number, pre_user_id: number, pre_story_id: number): Observable<any> {
    return this.http.post(this.previous, {
      user_id,
      story_id,
      pre_user_id,
      pre_story_id
    });
  }

  // Méthode pour obtenir la liste des utilisateurs qui ont vu la story
  getStoryViews(story_id: number, offset = 0, limit = 20): Observable<any> {
    return this.http.post(this.story_views, {
      option: 'story_views',
      story_id,
      offset,
      limit
    });
  }
}
