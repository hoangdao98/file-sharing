import { State } from './../../shared/models/state';
import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { UploadService } from 'src/app/shared/services/upload.service';
import { HttpEventType, HttpEvent } from '@angular/common/http';
import { File } from 'src/app/shared/models/file';
import { ThrowStmt } from '@angular/compiler';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent implements OnInit {
  public fileList: FileList;
  private currentData: File = new File();
  public process = 0;
  public responseEvent = null;
  public uploadSpeedPerOneSecond = 0;
  private lastUploaded = 0;
  public state: State = new State();
  constructor(private uploadService: UploadService, private cd: ChangeDetectorRef) { }

  ngOnInit() {
  }

  /**
   * Import file to form data.
   * @param files list file
   */
  public handleFileInput(files: FileList) {
    this.fileList = files;

    if (this.fileList) {
      Array.from(this.fileList).forEach(file => {
        this.currentData.files.push(file);
      });
    }
    console.log(this.currentData.files);
  }

  /**
   * This method is used to call the api to save data form
   */
  public saveDataForm() {
    const formData: FormData = new FormData();

    formData.append('to', this.currentData.to);
    formData.append('subject', this.currentData.subject);
    formData.append('message', this.currentData.message);
    this.currentData.files.forEach(file => {
          formData.append('files', file);
    });

    const startTime: any = new Date();
    this.state.uploading = true;
    // Call the api to save data
    this.uploadService.sendFiles(formData).subscribe((event: HttpEvent<any>) => {
        switch (event.type) {
          case HttpEventType.Sent:
            console.log('Request has been made!');
            break;
          case HttpEventType.ResponseHeader:
            console.log('Response header has been received!');
            break;
          case HttpEventType.UploadProgress:
            const currentTime: any = new Date();
            let diffTime = currentTime - startTime;

            if (diffTime === 0) {
              diffTime = 1;
            }

            // Caculator time upload
            const speedPerOneMilisecond = ((event.loaded - this.lastUploaded) / diffTime);
            this.uploadSpeedPerOneSecond = speedPerOneMilisecond * 1000;
            this.lastUploaded = event.loaded;

            this.process = Math.round(event.loaded / event.total * 100);
            this.cd.detectChanges();
            break;
          case HttpEventType.Response:
            this.responseEvent = event.body;
            console.log(this.responseEvent);
            this.state.uploadSuccess = true;
            this.cd.detectChanges();
        }
    });
  }

  /**
   * This method is used to remove an added file
   * @param index index file in array
   */
  public removeFile(index) {
    this.currentData.files.splice(index, 1);
    console.log(this.fileList, index);

    this.cd.detectChanges();
  }

  /**
   * This method is used to reset data form.
   */
  public reset() {
    this.currentData = new File();
    this.state = new State();
    this.process = 0;
    this.responseEvent = null;
    this.uploadSpeedPerOneSecond = 0;
    this.lastUploaded = 0;
    this.fileList = null;
  }
}
