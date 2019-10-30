import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UploadService {
  private SERVER_URL = 'http://localhost:3000';
  constructor(private httpClient: HttpClient) { }

  /**
   * This method is used to call the api to send file
   * @param data data form
   * @param userID user id
   */
  public sendFiles(data): Observable<any> {
    const uploadUrl = `${this.SERVER_URL}/api/upload`;

    return this.httpClient.post<any>(uploadUrl, data, { reportProgress: true, observe: 'events'})
          .pipe(
            map((event) => {
              console.log(event, 'event');
              switch (event.type) {
                case HttpEventType.Sent:
                  console.log('Request has been made!');
                  break;
                case HttpEventType.ResponseHeader:
                  console.log('Response header has been received!');
                  break;
                case HttpEventType.UploadProgress:
                  return Math.round(event.loaded / event.total * 100);
                  break;
                case HttpEventType.Response:
                  console.log('User successfully created!', event.body);
                  return event.body;
              }
            }),
            catchError(err => { throw err; })
          );
  }
}
