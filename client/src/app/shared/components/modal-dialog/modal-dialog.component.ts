import { Component, OnInit, ViewChild } from '@angular/core';
import { EventEmitter } from 'events';

@Component({
  selector: 'app-modal-dialog',
  templateUrl: './modal-dialog.component.html',
  styleUrls: ['./modal-dialog.component.scss']
})
export class ModalDialogComponent implements OnInit {
  public closeEvent =  new EventEmitter();
  @ViewChild('dynamicComponent', {static: true}) private container;
  public fileTitle = 'Sharing files';
  constructor() { }

  ngOnInit() {
  }
}
