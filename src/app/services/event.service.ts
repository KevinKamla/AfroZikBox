import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EventService {
  private baseUrl = `${environment.api}/event/get_my_events`;
  private create = `${environment.api}/event/create`;
  private getid = `${environment.api}/event/get_event_by_id`;
  private delete = `${environment.api}/event/delete`;
  private edit = `${environment.api}/event/edit`;
  private download = `${environment.api}/event/download`;
  private join = `${environment.api}/event/join`;
  private buy = `${environment.api}/event/buy`;
  private accessToken = localStorage.getItem('accessToken');
  private serverKey = environment.server_key;
  apiUrl = `${environment.api}/event/validate_ticket`;

  constructor(private http: HttpClient) {}

  // Fonction pour supprimer un événement par ID
  deleteEvent(eventId: number): Observable<any> {
    const params = new HttpParams()
      .set('server_key', this.serverKey)
      .set('access_token', this.accessToken || '')
      .set('id', eventId.toString());

    return this.http.delete<any>(this.delete, { params }).pipe(
      catchError((error) => {
        console.error("Erreur lors de la suppression de l'événement", error);
        return throwError(error);
      })
    );
  }

  // Fonction pour récupérer un événement par ID
  getEventById(eventId: number): Observable<any> {
    const params = new HttpParams()
      .set('server_key', this.serverKey)
      .set('access_token', this.accessToken || '')
      .set('id', eventId.toString());
    return this.http.get<any>(this.getid, { params }).pipe(
      catchError((error) => {
        console.error("Erreur lors de la récupération de l'événement", error);
        return throwError(error);
      })
    );
  }
  // Fonction pour acheter un billet d'événement
  buyTicket(eventId: number): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + localStorage.getItem('accessToken'), // Token si nécessaire
    });
    const params = new HttpParams()
      .set('server_key', this.serverKey)
      .set('access_token', this.accessToken || '')
      .set('id', eventId.toString());

    return this.http.post<any>(this.buy, params, { headers }).pipe(
      catchError((error) => {
        console.error("Erreur lors de l'achat du billet", error);
        return throwError(error);
      })
    );
  }
 
  // Fonction pour rejoindre ou quitter un événement
  joinEvent(eventId: number, type: 'join' | 'unjoin'): Observable<any> {
    const params = new HttpParams()
      .set('server_key', this.serverKey)
      .set('access_token', this.accessToken || '')
      .set('id', eventId.toString())
      .set('type', type);
    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + localStorage.getItem('accessToken'),
    });

    return this.http.post<any>(this.join, params, { headers }).pipe(
      catchError((error) => {
        console.error("Erreur lors de la gestion de l'événement", error);
        return throwError(error);
      })
    );
  }

  // Fonction pour télécharger un ticket d'événement
  downloadTicket(purchaseId: number): Observable<any> {
    const body = { id: purchaseId };
    const params = new HttpParams()
      .set('server_key', this.serverKey)
      .set('access_token', this.accessToken || '')
      .set('id', purchaseId.toString());
    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + localStorage.getItem('accessToken'), // Token si nécessaire
    });

    return this.http.post<any>(this.download, params, { headers }).pipe(
      catchError((error) => {
        console.error('Erreur lors du téléchargement du billet', error);
        return throwError(error);
      })
    );
  }

  getMyEvents(id: number): Observable<any> {
    const params = new HttpParams()
      .set('server_key', this.serverKey)
      .set('access_token', this.accessToken || '')
      .set('user_id', id.toString());
    return this.http.get<any>(this.baseUrl, { params });
  }

  createEvent(eventData: any, image: File, video?: File): Observable<any> {
    const formData: FormData = new FormData();

    // Ajouter les champs obligatoires
    formData.append('name', eventData.name);
    formData.append('desc', eventData.desc);
    formData.append('start_date', eventData.start_date);
    formData.append('start_time', eventData.start_time);
    formData.append('end_date', eventData.end_date);
    formData.append('end_time', eventData.end_time);
    formData.append('server_key', this.serverKey);
    formData.append('access_token', this.accessToken || '');

    if (eventData.location === 'online') {
      formData.append('online_url', eventData.online_url);
    } else if (eventData.location === 'real') {
      formData.append('real_address', eventData.real_address);
    }

    if (eventData.sell_tickets === 'yes') {
      formData.append('available_tickets', eventData.available_tickets);
      formData.append('ticket_price', eventData.ticket_price);
    }

    if (image) {
      formData.append('image', image, image.name);
    }
    if (video) {
      formData.append('video', video, video.name);
    }

    return this.http.post(this.create, formData);
  }

  // Validation du ticket
  validateTicket(qrCode: string): Observable<any> {
    const params = { qr: qrCode };

    return this.http.get(`${this.apiUrl}/validate_ticket`, { params });
  }

  // Fonction pour éditer un événement
  editEvent(
    eventId: number,
    eventData: any,
    imageFile?: File,
    videoFile?: File
  ): Observable<any> {
    const formData = new FormData();

    // Ajout des données de l'événement
    formData.append('id', eventId.toString());
    formData.append('name', eventData.name);
    formData.append('desc', eventData.desc);
    formData.append('start_date', eventData.start_date);
    formData.append('start_time', eventData.start_time);
    formData.append('end_date', eventData.end_date);
    formData.append('end_time', eventData.end_time);
    formData.append('server_key', this.serverKey);
    formData.append('access_token', this.accessToken || '');

    // Gestion de l'URL en cas d'événement en ligne
    if (eventData.location === 'online' && eventData.online_url) {
      formData.append('online_url', eventData.online_url);
    }

    // Gestion de l'adresse en cas d'événement en physique
    if (eventData.location === 'real' && eventData.real_address) {
      formData.append('real_address', eventData.real_address);
    }

    // Gestion des billets
    if (eventData.sell_tickets === 'yes') {
      formData.append(
        'available_tickets',
        eventData.available_tickets.toString()
      );
      formData.append('ticket_price', eventData.ticket_price.toString());
    }

    // Ajout du fichier image si disponible
    if (imageFile) {
      formData.append('image', imageFile, imageFile.name);
    }

    // Ajout du fichier vidéo si disponible
    if (videoFile) {
      formData.append('video', videoFile, videoFile.name);
    }

    // Envoi de la requête HTTP PUT pour modifier l'événement
    return this.http.post<any>(this.edit, formData).pipe(
      catchError((error) => {
        console.error("Erreur lors de la modification de l'événement", error);
        return throwError(error);
      })
    );
  }
}
