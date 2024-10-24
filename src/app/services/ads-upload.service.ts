import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AdsUploadService {
  private jsonFilePath = 'assets/CountryList.json';
  private apiUrl = 'https://afrozikbox.com/endpoint/ads/add'; 

  constructor(private http: HttpClient) {}

  addAdsAPI(params: any, mediaFile: File, audioFile: File | null = null): Observable<any> {
    const formData: FormData = new FormData();

    // Add parameters to formData
    for (let key in params) {
      if (params.hasOwnProperty(key)) {
        formData.append(key, params[key]);
      }
    }

    // Add media file (image/video)
    if (mediaFile) {
      formData.append('media', mediaFile, mediaFile.name);
    }

    // Add audio file if type is 'audio'
    if (audioFile) {
      formData.append('audio', audioFile, audioFile.name);
    }

    const headers = new HttpHeaders({
      'enctype': 'multipart/form-data',
    });

    return this.http.post(this.apiUrl, formData, { headers })
      .pipe(
        catchError(this.handleError)
      );
  }

  // Error handling
  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('Client-side error:', error.error.message);
    } else {
      console.error(`Backend error: ${error.status}, body: ${error.error}`);
    }
    return throwError('An error occurred, please try again later.');
  }

  // Get countries from local JSON file
  getCountries(): Observable<any> {
    return this.http.get(this.jsonFilePath);
  }
}
