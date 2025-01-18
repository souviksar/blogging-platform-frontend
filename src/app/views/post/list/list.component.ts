import { Component, OnInit, ViewChild, inject } from '@angular/core';
import { MaterialModule } from 'src/app/shared/material/material.module';
import { MatDialog } from '@angular/material/dialog';
import { LoaderService, PostService, StorageService } from 'src/app/services';
import { ToastrService } from 'ngx-toastr';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { ReactiveFormsModule } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { EmptyValueCheckPipe } from 'src/app/pipes';
import { EMode } from 'src/app/constants';
import { ConfirmationComponent } from 'src/app/shared/components/confirmation/confirmation.component';
import { AddEditComponent } from '../add-edit/add-edit.component';
import { Subject, takeUntil } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { IUser } from 'src/app/interfaces';

@Component({
  selector: 'app-post-list',
  standalone: true,
  imports: [MaterialModule, ReactiveFormsModule, CommonModule, EmptyValueCheckPipe],
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  toastr: ToastrService = inject(ToastrService);
  dialog: MatDialog = inject(MatDialog);
  postService: PostService = inject(PostService);
  @ViewChild(MatPaginator) paginator: MatPaginator;
  loaderService: LoaderService = inject(LoaderService);
  storageService: StorageService = inject(StorageService);
  displayedColumns: string[] = ['title', 'author', 'action'];
  dataSource = new MatTableDataSource<any>();
  totalCount: number = 0;
  pageSize: number = 10;
  currentPage: number = 1;
  currentUserData: IUser = this.storageService.getUserInfo();
  private destroySubscription$: Subject<void> = new Subject();

  ngOnInit() {
    this.getPosts();
  }

  getPosts() {
    this.postService
      .getPosts(this.pageSize, this.currentPage)
      .pipe(takeUntil(this.destroySubscription$))
      .subscribe({
        next: (res) => {
          this.dataSource = new MatTableDataSource(res.data.posts);
          this.totalCount = res.data.totalResults;
        },
        error: (error: HttpErrorResponse) => {
          this.toastr.error(error.error['message']);
        }
      });
  }

  addPost() {
    this.dialog
      .open(AddEditComponent, {
        width: '50%',
        // height: '60%',
        data: { mode: EMode.ADD }
      })
      .afterClosed()
      .subscribe({
        next: (data) => {
          if (data === 'Yes') this.getPosts();
        }
      });
  }

  editPost(postData: any) {
    this.dialog
      .open(AddEditComponent, {
        width: '50%',
        // height: '60%',
        data: { mode: EMode.EDIT, postData }
      })
      .afterClosed()
      .subscribe({
        next: (data) => {
          if (data === 'Yes') this.getPosts();
        }
      });
  }

  showDeleteConfirmation(postId: string) {
    const message = `You want to delete post`;
    this.dialog
      .open(ConfirmationComponent, {
        data: { message },
        height: '368px',
        width: '500px'
      })
      .afterClosed()
      .subscribe({
        next: (data) => {
          if (data === 'Yes') this.deletePost(postId);
        }
      });
  }

  deletePost(postId: string) {
    this.postService
      .deletePost(postId)
      .pipe(takeUntil(this.destroySubscription$))
      .subscribe({
        next: (res) => {
          this.toastr.success(res.message);
          this.getPosts();
        },
        error: (error: HttpErrorResponse) => {
          this.toastr.error(error.error['message']);
        }
      });
  }

  pageChange(event: PageEvent) {
    this.pageSize = event.pageSize;
    this.currentPage = event.pageIndex + 1;
    this.getPosts();
  }

  ngOnDestroy(): void {
    this.destroySubscription$.next();
    this.destroySubscription$.complete();
  }
}
