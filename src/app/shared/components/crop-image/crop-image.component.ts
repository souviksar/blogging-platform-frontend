import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ImageCroppedEvent, ImageCropperComponent } from 'ngx-image-cropper';
import { MaterialModule } from '../../material/material.module';

@Component({
  selector: 'app-crop-image',
  standalone: true,
  imports: [ImageCropperComponent, CommonModule, MaterialModule],
  templateUrl: './crop-image.component.html',
  styleUrl: './crop-image.component.scss'
})
export class CropImageComponent {
  croppedImage: string = '';

  constructor(
    private dialogRef: MatDialogRef<CropImageComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.base64;
  }

  onCrop(): void {
    this.dialogRef.close(this.croppedImage);
  }
}
