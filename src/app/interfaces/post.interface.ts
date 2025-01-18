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
  comments: any[];
  created_at: Date;
  updated_at: Date;
  id: string;
}

interface IAuthor {
  name: string;
  email: string;
  role: string;
  status: boolean;
  created_at: Date;
  updated_at: Date;
  id: string;
}

export interface IAddPostRequest {
  title: string;
  content: string;
}

export interface IAddPostResponse {
  code: number;
  message: string;
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
