import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { EventEmitter } from 'events';

@Component({
  selector: 'app-modal-dialog',
  templateUrl: './modal-dialog.component.html',
  styleUrls: ['./modal-dialog.component.scss']
})
export class ModalDialogComponent implements OnInit {
  public closeEvent =  new EventEmitter();
  @ViewChild('dynamicComponent', {static: true}) private container;
  @Input() height: any;
  @Input() width: any;
  @Input() minHeight: any;
  @Input() minWidth: any;
  public fileTitle = 'Sharing files';
  constructor() { }

  ngOnInit() {
  }
}
