import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { UploadService } from 'src/app/shared/services/upload.service';
import { HttpEventType, HttpEvent } from '@angular/common/http';
import { File } from 'src/app/shared/models/file';
import { TouchSequence } from 'selenium-webdriver';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent implements OnInit {
  public fileList: FileList;
  public progress = 0;
  private currentData: File = new File();
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
  }

  /**
   * This method is used to call the api to save data form
   */
  public saveDataForm() {
    const formData: FormData = new FormData();

    formData.append('to', this.currentData.to);
    formData.append('subject', this.currentData.subject);
    formData.append('message', this.currentData.message);
    formData.append('files', this.currentData.files.toString());

    // Call api to save data
    this.uploadService.sendFiles(formData).subscribe(result => {
      console.log(result);
    });
  }

  public removeFile(index) {
    this.currentData.files.splice(index, 1);
    console.log(this.fileList, index);

    this.cd.detectChanges();
  }

}
