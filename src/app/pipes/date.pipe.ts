import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'datePipe',
  standalone: true
})
export class DatePipe implements PipeTransform {
  transform(value: any): string {
    if (value && value.seconds) {
      const date = new Date(value.seconds * 1000); // Convert seconds to milliseconds

      const day = date.getDate();
      const month = date.toLocaleString('en-IN', { month: 'short' }); // Short month format (e.g., "Oct")
      const year = date.getFullYear();

      const daySuffix = this.getDaySuffix(day); // Get suffix for the day

      return `${day}${daySuffix} ${month}, ${year}`; // Format as "24th Oct, 2024"
    }
    return '';
  }

  // Helper method to determine the correct suffix for the day
  private getDaySuffix(day: number): string {
    if (day >= 11 && day <= 13) {
      return 'th';
    }
    switch (day % 10) {
      case 1:
        return 'st';
      case 2:
        return 'nd';
      case 3:
        return 'rd';
      default:
        return 'th';
    }
  }
}
