import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private baseUrl2 = `${environment.api}/chat/get_chats`
  private serverKey = environment.server_key;
  private accessToken = localStorage.getItem('accessToken');
  private fletch = `${environment.api}/chat/fetch`;

  constructor(private http: HttpClient) {}


  generateMessageHashId(): number {
    return Math.floor(Math.random() * 100000);
  }

  getChats(limit: number, offset: number): Observable<any> {
    const params = new HttpParams()
      .set('server_key', this.serverKey)
      .set('access_token', this.accessToken || '')      
      .set('limit', limit) 
      .set('offset', offset); 
    return this.http.post(this.baseUrl2, params).pipe(
      catchError((error) => {
        console.error('Error fetching chats:', error);
        throw error;
      })
    );
  }


  getChatsMessages(limit: number, offset: number, userID: number): Observable<any> {
    const params = new HttpParams()
      .set('server_key', this.serverKey)
      .set('access_token', this.accessToken || '')      
      .set('limit', limit)
      .set('user_id', userID)  
      .set('offset', offset);
      console.log(userID);
      
    return this.http.post(this.fletch, params).pipe(
      map((response: any) => {
        if (response.status === 200) {
          return response;
        } else {
          throw new Error(response.error || 'Error fetching chat messages');
        }
      }),
      catchError((error) => {
        console.error('Error:', error);
        return throwError(error);
      })
    );
  }


  sendMessage(
    userID: number,
    newMessage: string
  ): Observable<any> {
    const messageHashId = this.generateMessageHashId();
    const params = new HttpParams()
    .set('server_key', this.serverKey)
    .set('access_token', this.accessToken || '')      
    .set('hash-message', messageHashId)
    .set('id', userID)  
    .set('new-message', newMessage);

    return this.http.post(`${environment.api}/chat/new`, params).pipe(
      catchError((error) => {
        console.error('Error sending message:', error);
        throw error;
      })
    );
  }

  sendMedia(
    userID: number,
    mediaData: File,
  ): Observable<any> {
    const messageHashId = this.generateMessageHashId();
    console.log(mediaData);
    
    const formData: FormData = new FormData();
    formData.append('access_token', this.accessToken || '');
    formData.append('id', userID.toString());
    formData.append('hash-message', messageHashId.toString());
    formData.append('server_key', this.serverKey);
    formData.append('media', mediaData, mediaData.name);

    return this.http.post(`${environment.api}/chat/new`, formData).pipe(
      catchError((error) => {
        console.error('Error sending media:', error);
        throw error;
      })
    );
  }

  deleteChat(userID: number): Observable<any> {
    const params = {
      access_token: this.accessToken,
      user_id: userID,
      server_key: this.serverKey,
    };

    return this.http.post(`${environment.api}/chat/delete_chat`, params).pipe(
      catchError((error) => {
        console.error('Error deleting chat:', error);
        throw error;
      })
    );
  }
}
