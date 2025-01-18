export interface ISignupRequest {
  name: string;
  email: string;
  password: string;
}

export interface ISignupResponse {
  code: number;
  message: string;
}

export interface ISigninRequest {
  email: string;
  password: string;
}

export interface ISigninResponse {
  code: number;
  message: string;
  data: IData;
}

interface IData {
  tokens: ITokenData;
  user: IUser;
}

interface ITokenData {
  access: string;
  refresh: string;
}

export interface IUser {
  name: string;
  email: string;
  role: string;
  status: boolean;
  created_at: Date;
  updated_at: Date;
  id: string;
}

export interface ILogoutRequest {
  refreshToken: string;
}

export interface ILogoutResponse {
  message: string;
  status: string;
}

export interface IRefreshTokensRequest {
  refreshToken: string;
}

export interface IRefreshTokenResponse {
  message: string;
  data: ITokenData;
  status: string;
}
