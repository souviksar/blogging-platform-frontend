import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import {
  ILogoutRequest,
  ILogoutResponse,
  IRefreshTokenResponse,
  IRefreshTokensRequest,
  ISigninRequest,
  ISigninResponse,
  ISignupRequest,
  ISignupResponse
} from '../interfaces';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private http: HttpClient = inject(HttpClient);

  signup(payload: ISignupRequest) {
    return this.http.post<ISignupResponse>(`${environment.API_BASE_URL}auth/register`, payload);
  }

  signin(payload: ISigninRequest) {
    return this.http.post<ISigninResponse>(`${environment.API_BASE_URL}auth/login`, payload);
  }

  logout(payload: ILogoutRequest) {
    return this.http.post<ILogoutResponse>(`${environment.API_BASE_URL}auth/logout`, payload);
  }

  refreshTokens(payload: IRefreshTokensRequest) {
    return this.http.post<IRefreshTokenResponse>(`${environment.API_BASE_URL}auth/refresh-tokens`, payload);
  }
}
