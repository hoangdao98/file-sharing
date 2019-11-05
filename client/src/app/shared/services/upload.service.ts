import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UploadService {
  private SERVER_URL = 'http://localhost:4000';
  constructor(private httpClient: HttpClient) { }

  /**
   * This method is used to call the api to send file
   * @param data data form
   * @param userID user id
   */
  public sendFiles(data): Observable<any> {
    const uploadUrl = `${this.SERVER_URL}/api/upload`;

    return this.httpClient.post<any>(uploadUrl, data, { reportProgress: true, observe: 'events'})
          .pipe(catchError(err => { throw err; }));
  }
}
