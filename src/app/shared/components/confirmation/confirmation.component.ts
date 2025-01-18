import { Component, Inject, OnDestroy, Renderer2 } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';

type DialogData = {
  message: string;
};

@Component({
  selector: 'app-confirmation',
  standalone: true,
  imports: [CommonModule, MatDialogModule],
  templateUrl: './confirmation.component.html',
  styleUrl: './confirmation.component.scss'
})
export class ConfirmationComponent implements OnDestroy {
  constructor(
    @Inject(MAT_DIALOG_DATA) public dialogData: DialogData,
    private dialogRef: MatDialogRef<ConfirmationComponent>,
    private renderer: Renderer2
  ) {
    this.renderer.addClass(document.body, 'modal-open');
    this.dialogRef.addPanelClass('delete-modal');
  }

  ngOnDestroy(): void {
    this.renderer.removeClass(document.body, 'modal-open');
  }
}
