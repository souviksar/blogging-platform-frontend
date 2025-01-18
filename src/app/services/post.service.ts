import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import {
  IAddCommentRequest,
  IAddCommentResponse,
  IAddPostRequest,
  IAddPostResponse,
  IDeletePostResponse,
  IGeTPostResponse,
  IGeTPostsResponse,
  IUpdatePostRequest,
  IUpdatePostResponse
} from '../interfaces';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private http: HttpClient = inject(HttpClient);

  getPosts(pageSize: number, currentPage: number) {
    return this.http.get<IGeTPostsResponse>(`${environment.API_BASE_URL}post/get-posts/${pageSize}/${currentPage}`);
  }

  addPost(payload: IAddPostRequest) {
    return this.http.post<IAddPostResponse>(`${environment.API_BASE_URL}post/add-post`, payload);
  }

  getPost(postId: string) {
    return this.http.get<IGeTPostResponse>(`${environment.API_BASE_URL}post/get-post/${postId}`);
  }

  updatePost(postId: string, payload: IUpdatePostRequest) {
    return this.http.patch<IUpdatePostResponse>(`${environment.API_BASE_URL}post/update-post/${postId}`, payload);
  }

  deletePost(postId: string) {
    return this.http.delete<IDeletePostResponse>(`${environment.API_BASE_URL}post/delete-post/${postId}`);
  }

  addComment(postId: string, payload: IAddCommentRequest) {
    return this.http.post<IAddCommentResponse>(`${environment.API_BASE_URL}post/add-comment/${postId}`, payload);
  }
}
