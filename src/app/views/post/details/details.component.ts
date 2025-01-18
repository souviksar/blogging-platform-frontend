import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { IPost } from 'src/app/interfaces';
import { EmptyValueCheckPipe } from 'src/app/pipes';
import { PostService } from 'src/app/services';
import { AddCommentComponent } from '../add-comment/add-comment.component';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [EmptyValueCheckPipe, CommonModule],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss'
})
export class DetailsComponent implements OnInit, OnDestroy {
  toastr: ToastrService = inject(ToastrService);
  postService: PostService = inject(PostService);
  dialog: MatDialog = inject(MatDialog);
  private destroySubscription$: Subject<void> = new Subject();
  activatedRoute: ActivatedRoute = inject(ActivatedRoute);
  postId: string;
  postDetails: IPost;

  ngOnInit(): void {
    this.postId = this.activatedRoute.snapshot.paramMap.get('postId');
    this.getPost();
  }

  getPost() {
    this.postService.getPost(this.postId).subscribe({
      next: (res) => {
        this.postDetails = res.data;
      },
      error: (error: HttpErrorResponse) => {
        this.toastr.error(error.error['message']);
      }
    });
  }

  addComment() {
    this.dialog
      .open(AddCommentComponent, {
        width: '50%',
        // height: '60%',
        data: { postId: this.postDetails.id }
      })
      .afterClosed()
      .subscribe({
        next: (data) => {
          if (data === 'Yes') this.getPost();
        }
      });
  }

  ngOnDestroy(): void {
    this.destroySubscription$.next();
    this.destroySubscription$.complete();
  }
}
