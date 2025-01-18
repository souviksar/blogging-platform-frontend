import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, inject, Inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { Subject, takeUntil } from 'rxjs';
import { EErrors } from 'src/app/constants';
import { IAddCommentRequest } from 'src/app/interfaces';
import { PostService } from 'src/app/services';
import { MaterialModule } from 'src/app/shared/material/material.module';
import { noWhitespaceValidator } from 'src/app/validators';

interface IDialogData {
  postId: string;
}

@Component({
  selector: 'app-add-comment',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MaterialModule],
  templateUrl: './add-comment.component.html',
  styleUrl: './add-comment.component.scss'
})
export class AddCommentComponent {
  toastr: ToastrService = inject(ToastrService);
  errors = EErrors;
  postService: PostService = inject(PostService);

  addEditForm = this.fb.group({
    content: ['', [noWhitespaceValidator()]]
  });
  private destroySubscription$: Subject<void> = new Subject();

  constructor(
    private dialogRef: MatDialogRef<AddCommentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IDialogData,
    private fb: FormBuilder
  ) {}

  addComment() {
    if (this.addEditForm.invalid) {
      this.addEditForm.markAllAsTouched();
      return;
    }

    const payload: IAddCommentRequest = {
      content: this.addEditForm.value.content
    };

    this.postService
      .addComment(this.data.postId, payload)
      .pipe(takeUntil(this.destroySubscription$))
      .subscribe({
        next: (res) => {
          this.toastr.success(res.message);
          this.dialogRef.close('Yes');
        },
        error: (error: HttpErrorResponse) => {
          this.toastr.error(error.error['message']);
        }
      });
  }

  ngOnDestroy(): void {
    this.destroySubscription$.next();
    this.destroySubscription$.complete();
  }
}
