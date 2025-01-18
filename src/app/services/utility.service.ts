import { DatePipe } from '@angular/common';
import { Injectable, Renderer2, RendererFactory2 } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilityService {
  private renderer: Renderer2;

  constructor(
    private rendererFactory: RendererFactory2,
    private datePipe: DatePipe
  ) {
    this.renderer = this.rendererFactory.createRenderer(null, null);
  }

  fileToBase64(file: any): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  }

  base64toFile(base64: string, filename: string): File {
    const arr: any = base64.split(',');
    const mime = arr && arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[arr.length - 1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, { type: mime });
  }

  isBase64Data(str: string): boolean {
    const base64Pattern = /^data:(.*?);base64,(.*)$/;
    return base64Pattern.test(str);
  }

  getFileExtension(url: string): string {
    return url.split('.').pop().split(/\#|\?/)[0];
  }

  public exportToCsv(rows: object[], fileName: string, columns?: string[]): void {
    if (!rows || !rows.length) {
      return;
    }
    const separator = ',';
    const keys = Object.keys(rows[0]).filter((k) => (columns ? columns.includes(k) : true));

    const csvContent =
      keys.join(separator) +
      '\n' +
      rows
        .map((row) => {
          return keys
            .map((k) => {
              let cell = row[k] === null || row[k] === undefined ? '' : row[k];
              cell = cell instanceof Date ? cell.toLocaleString() : cell.toString().replace(/"/g, '""');
              if (cell.search(/("|,|\n)/g) >= 0) {
                cell = `"${cell}"`;
              }
              return cell;
            })
            .join(separator);
        })
        .join('\n');

    this.downloadCsv(csvContent, fileName);
  }

  private downloadCsv(csvContent: string, fileName: string): void {
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link: HTMLAnchorElement = this.renderer.createElement('a');
    const url = window.URL.createObjectURL(blob);
    link.href = url;
    link.download = fileName;
    link.click();
    window.URL.revokeObjectURL(url);
  }

  formatDate(date: Date | string, format = 'yyyy-MM-dd') {
    return this.datePipe.transform(date, format);
  }

  createDateId(date: Date) {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const year = date.getFullYear();

    return `${day}${month}${year}`;
  }

  getStartAndEndHours(date: string | Date) {
    // Create a new Date for the start of the day (00:00)
    const startOfDay = new Date(date);
    startOfDay.setHours(0, 0, 0, 0);
    // Create a new Date for the end of the day (23:59)
    const endOfDay = new Date(date);
    endOfDay.setHours(23, 59, 59, 999);
    return { startOfDay, endOfDay };
  }

  getDateWithTime(date: string | Date, time: Date): Date {
    const dateWithTime = new Date(date);
    const hours = time.getHours();
    const minutes = time.getMinutes();
    dateWithTime.setHours(hours, minutes, 0, 0); // Set hours and minutes from time
    return dateWithTime;
  }

  formatTime(date: Date): string {
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  }
}
