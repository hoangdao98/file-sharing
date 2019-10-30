import { Directive, ElementRef, AfterContentInit, HostListener, OnInit } from '@angular/core';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { ninvoke } from 'q';

@Directive({
  selector: '[appDragDrop]'
})
export class DragDropDirective implements AfterContentInit {
  private modalHeader: any;
  private parentNode: any;
  private active = false;
  private y = null;
  private isMouseUp = false;
  private isMouseDown = false;
  private isMouseMove = false;
  private mouseOffset = {
    x: 0,
    y: 0
  };
  constructor(private el: ElementRef) {
  }

  private inital() {
    const self = this;
    this.parentNode.addEventListener('mousedown',
    (e) => {
      this.dragStart(e, this.parentNode, self);
    }
    , false);

    this.parentNode.addEventListener('mouseup',
    (e) => {
      this.dragEnd(e, this.parentNode, self);
    }
    , false);

    this.parentNode.addEventListener('mousemove',
    (e) => {
      this.drag(e, this.parentNode, self);
    }
    , false);
  }

  private dragStart(e, item, self) {
    self.mouseOffset = {
      x: item.offsetLeft - e.clientX,
      y: item.offsetTop - e.clientY
    };

    if (e.target === self.modalHeader) {
      self.isMouseDown = true;
      self.active = true;
    }
  }

  private dragEnd(e, item, self) {
    self.isMouseDown = false;
    self.active = false;
  }

  private drag(e, item, self) {
    e.preventDefault();
    if (self.active && self.isMouseDown) {
      item.style.left = e.clientX + self.mouseOffset.x + 'px';
      item.style.top = e.clientY + self.mouseOffset.y + 'px';
    }
  }

  ngAfterContentInit() {
    this.parentNode = this.el.nativeElement.firstChild;
    this.modalHeader = this.parentNode.querySelector('.modal-header');
    console.log(this.modalHeader, 'Modal header');

    this.inital();
  }
}
