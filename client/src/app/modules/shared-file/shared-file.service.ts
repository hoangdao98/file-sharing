import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SharedFileService {
  private SERVER_URL = 'http://localhost:4000/api';
  constructor(private http: HttpClient) { }

  public getFiles(id: string): Observable<any> {
    const URL = `${this.SERVER_URL}/posts/${id}`;
    return this.http.get(URL);
  }

  public downloadFile(id: string): Observable<any> {
    return this.http.get(`${this.SERVER_URL}/download/${id}`)
    .pipe(
      catchError(err => { throw err; })
    );
  }
}
