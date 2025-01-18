import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timePipe',
  standalone: true
})
export class TimePipe implements PipeTransform {
  transform(value: any): string {
    if (value && value.seconds) {
      const date = new Date(value.seconds * 1000); // Convert seconds to milliseconds
      return date.toLocaleTimeString('en-IN', { timeZone: 'Asia/Kolkata', hour: '2-digit', minute: '2-digit' }); // Returns only the time
    }
    return '';
  }
}
