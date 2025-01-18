import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  // private cognitoConfig: CognitoUserPool = new CognitoUserPool(environment.COGNITO_CONFIG);
  // changePassword(payload: IChangePassword): Observable<any> {
  //   return new Observable((observer) => {
  //     const cognitoUser = this.cognitoConfig.getCurrentUser();
  //     if (cognitoUser) {
  //       cognitoUser.getSession((err: Error | null, session: CognitoUserSession | null) => {
  //         if (err) {
  //           observer.error(err);
  //         } else if (!session) {
  //           observer.error('No session found');
  //         } else {
  //           cognitoUser.changePassword(payload.currentPassword, payload.newPassword, (err: any, result: any) => {
  //             if (err) {
  //               observer.error(err);
  //             } else if (result === 'SUCCESS') {
  //               observer.next();
  //               observer.complete();
  //             }
  //           });
  //         }
  //       });
  //     } else {
  //       observer.error('User is not authenticated');
  //     }
  //   });
  // }
  // updateProfile(payload: IUpdateProfileDetails): Observable<CognitoUser> {
  //   return new Observable((observer) => {
  //     const cognitoUser = this.cognitoConfig.getCurrentUser();
  //     if (cognitoUser) {
  //       cognitoUser.getSession((err: Error | null, session: CognitoUserSession | null) => {
  //         if (err) {
  //           observer.error(err);
  //         } else if (!session) {
  //           observer.error('No session found');
  //         } else {
  //           cognitoUser.updateAttributes(payload.attributes, (err: any, result: string) => {
  //             if (err) {
  //               observer.error(err);
  //             } else if (result === 'SUCCESS') {
  //               observer.next(cognitoUser);
  //               observer.complete();
  //             }
  //           });
  //         }
  //       });
  //     } else {
  //       observer.error('User is not authenticated');
  //     }
  //   });
  // }
}
