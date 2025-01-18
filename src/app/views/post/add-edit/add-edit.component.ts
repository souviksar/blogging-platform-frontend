import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, inject, Inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { Subject, takeUntil } from 'rxjs';
import { EErrors, EMode } from 'src/app/constants';
import { IAddPostRequest, IPost, IUpdatePostRequest } from 'src/app/interfaces';
import { PostService } from 'src/app/services';
import { MaterialModule } from 'src/app/shared/material/material.module';
import { noWhitespaceValidator } from 'src/app/validators';

interface IDialogData {
  mode: EMode;
  postData?: IPost;
}

@Component({
  selector: 'app-post-add-edit',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MaterialModule],
  templateUrl: './add-edit.component.html',
  styleUrl: './add-edit.component.scss'
})
export class AddEditComponent implements OnInit {
  toastr: ToastrService = inject(ToastrService);
  mode = EMode;
  errors = EErrors;
  postService: PostService = inject(PostService);

  addEditForm = this.fb.group({
    title: ['', [noWhitespaceValidator()]],
    content: ['', [noWhitespaceValidator()]]
  });
  private destroySubscription$: Subject<void> = new Subject();

  constructor(
    private dialogRef: MatDialogRef<AddEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IDialogData,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    if (this.data.mode === EMode.EDIT) {
      this.patchFormValue();
    }
  }

  patchFormValue() {
    this.addEditForm.patchValue({
      title: this.data.postData?.title,
      content: this.data.postData?.content
    });
  }

  submit() {
    if (this.addEditForm.invalid) {
      this.addEditForm.markAllAsTouched();
      return;
    }
    this.data.mode === EMode.ADD ? this.addPost() : this.editPost(); // Add or edit post based on mode
  }

  addPost() {
    const payload: IAddPostRequest = {
      title: this.addEditForm.value.title,
      content: this.addEditForm.value.content
    };

    this.postService
      .addPost(payload)
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

  editPost() {
    const payload: IUpdatePostRequest = {
      title: this.addEditForm.value.title,
      content: this.addEditForm.value.content
    };

    this.postService
      .updatePost(this.data.postData.id, payload)
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
