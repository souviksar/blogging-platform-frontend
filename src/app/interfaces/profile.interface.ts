import { IUserInfo } from './user-info.interface';

export interface IChangePassword {
  currentPassword: string;
  newPassword: string;
}

export interface IProfileDetails extends IUserInfo {
  imageUrl?: string;
}
