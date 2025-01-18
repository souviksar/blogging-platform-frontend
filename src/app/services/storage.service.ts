import { Injectable } from '@angular/core';
import { IUser } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  constructor() {}

  setUserInfo(data: Partial<IUser>, keepMeSignedIn: boolean) {
    keepMeSignedIn ? localStorage.setItem('userInfo', JSON.stringify(data)) : sessionStorage.setItem('userInfo', JSON.stringify(data));
  }

  getUserInfo(): IUser | null {
    const userInfo = localStorage.getItem('userInfo') || sessionStorage.getItem('userInfo');
    return userInfo ? JSON.parse(userInfo) : null;
  }

  updateUserInfo(data: Partial<IUser>) {
    if (localStorage.getItem('userInfo')) {
      localStorage.setItem('userInfo', JSON.stringify(data));
    } else {
      sessionStorage.setItem('userInfo', JSON.stringify(data));
    }
  }

  saveTokens(accessToken: string, refreshToken: string) {
    if (localStorage.getItem('accessToken')) {
      this.setAccessToken(accessToken, true);
      this.setRefreshToken(refreshToken, true);
    } else {
      this.setAccessToken(accessToken, false);
      this.setRefreshToken(refreshToken, false);
    }
  }

  setAccessToken(token: string, keepMeSignedIn: boolean) {
    keepMeSignedIn
      ? localStorage.setItem('accessToken', JSON.stringify(token))
      : sessionStorage.setItem('accessToken', JSON.stringify(token));
  }

  getAccessToken(): string | null {
    const accessToken = localStorage.getItem('accessToken') || sessionStorage.getItem('accessToken');
    return accessToken ? JSON.parse(accessToken) : null;
  }

  setRefreshToken(token: string, keepMeSignedIn: boolean) {
    keepMeSignedIn
      ? localStorage.setItem('refreshToken', JSON.stringify(token))
      : sessionStorage.setItem('refreshToken', JSON.stringify(token));
  }

  getRefreshToken(): string | null {
    const refreshToken = localStorage.getItem('refreshToken') || sessionStorage.getItem('refreshToken');
    return refreshToken ? JSON.parse(refreshToken) : null;
  }

  setVerifyOtpEmail(email: string) {
    sessionStorage.setItem('verifyOtpEmail', JSON.stringify(email));
  }

  getVerifyOtpEmail(): string | null {
    return JSON.parse(sessionStorage.getItem('verifyOtpEmail'));
  }

  removeVerifyOtpEmail() {
    sessionStorage.removeItem('verifyOtpEmail');
  }

  destroy() {
    localStorage.clear();
    sessionStorage.clear();
  }
}
