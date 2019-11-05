import { SharedFileService } from './shared-file.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { File } from 'src/app/shared/models/file';

@Component({
  selector: 'app-shared-file',
  templateUrl: './shared-file.component.html',
  styleUrls: ['./shared-file.component.scss']
})
export class SharedFileComponent implements OnInit {
  private currentData: File = new File();

  constructor(private router: Router,
              private route: ActivatedRoute,
              public sharedFileService: SharedFileService) { }

  ngOnInit() {
    console.log(this.route);
    const idShared = this.route.snapshot.paramMap.get('id');

    // Get the data files
    this.sharedFileService.getFiles(idShared).subscribe(result => {
        this.currentData = result;
    });
  }

  public downloadFile(id: string) {
    this.sharedFileService.downloadFile(id).subscribe();
  }

}
