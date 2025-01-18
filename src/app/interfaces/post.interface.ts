export interface IGeTPostsResponse {
  code: number;
  message: string;
  data: IData;
}

interface IData {
  posts: IPost[];
  page: number;
  limit: number;
  totalPages: number;
  totalResults: number;
}

export interface IPost {
  title: string;
  content: string;
  author: IAuthor;
  status: boolean;
  comments: IComment[];
  created_at: Date;
  updated_at: Date;
  id: string;
}

interface IAuthor {
  name: string;
  email: string;
  id: string;
}

interface IComment {
  commenter: ICommenter;
  content: string;
}

interface ICommenter {
  name: string;
  email: string;
}

export interface IAddPostRequest {
  title: string;
  content: string;
}

export interface IAddPostResponse {
  code: number;
  message: string;
}

export interface IGeTPostResponse {
  code: number;
  message: string;
  data: IPost;
}

export interface IUpdatePostRequest {
  title: string;
  content: string;
}

export interface IUpdatePostResponse {
  code: number;
  message: string;
}

export interface IDeletePostResponse {
  code: number;
  message: string;
}

export interface IAddCommentRequest {
  content: string;
}

export interface IAddCommentResponse {
  code: number;
  message: string;
}
