import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'emptyValueCheck',
  standalone: true
})
export class EmptyValueCheckPipe implements PipeTransform {
  transform(value: any): any {
    if (typeof value === 'number') {
      return value ?? '-';
    } else {
      return value ? value : '-';
    }
  }
}
