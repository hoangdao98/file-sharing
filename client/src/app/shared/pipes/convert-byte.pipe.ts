import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'convertByte'
})
export class ConvertBytePipe implements PipeTransform {
  private KB = 1024;
  private MB = this.KB * this.KB;
  private TB = this.MB * this.MB * this.MB;

  transform(value: any, ...args: any[]): any {
    if (value > this.KB) {
      return `${Math.round(value / this.KB)} KB`;
    } else if (value > this.MB) {
      return `${Math.round(value / this.MB)} M`;
    } else {
      return 0;
    }
  }

}
