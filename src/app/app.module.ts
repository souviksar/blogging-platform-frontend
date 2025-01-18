// Angular Import
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

// project import
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavBarComponent } from './layout/nav-bar/nav-bar.component';
import { NavigationComponent } from './layout/navigation/navigation.component';
import { NavLeftComponent } from './layout/nav-bar/nav-left/nav-left.component';
import { NavRightComponent } from './layout/nav-bar/nav-right/nav-right.component';
import { NavSearchComponent } from './layout/nav-bar/nav-left/nav-search/nav-search.component';
import { ChatMsgComponent } from './layout/nav-bar/nav-right/chat-msg/chat-msg.component';
import { ChatUserListComponent } from './layout/nav-bar/nav-right/chat-user-list/chat-user-list.component';
import { FriendComponent } from './layout/nav-bar/nav-right/chat-user-list/friend/friend.component';
import { NavContentComponent } from './layout/navigation/nav-content/nav-content.component';
import { NavCollapseComponent } from './layout/navigation/nav-content/nav-collapse/nav-collapse.component';
import { NavGroupComponent } from './layout/navigation/nav-content/nav-group/nav-group.component';
import { NavItemComponent } from './layout/navigation/nav-content/nav-item/nav-item.component';
import { SharedModule } from './shared/shared.module';
import { LayoutComponent } from './layout/layout.component';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { errorInterceptor, loaderInterceptor, tokenInterceptor } from './interceptors';
import { DatePipe } from '@angular/common';
import { MatNativeDateModule, provideNativeDateAdapter } from '@angular/material/core';
import { MatNativeDatetimeModule } from '@mat-datetimepicker/core';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerModule } from 'ngx-spinner';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    NavigationComponent,
    NavLeftComponent,
    NavRightComponent,
    NavSearchComponent,
    ChatMsgComponent,
    ChatUserListComponent,
    FriendComponent,
    NavContentComponent,
    NavItemComponent,
    NavCollapseComponent,
    NavGroupComponent,
    LayoutComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    MatNativeDatetimeModule,
    NgbNavModule,
    ToastrModule.forRoot({
      maxOpened: 1,
      autoDismiss: true
    }),
    NgxSpinnerModule.forRoot({ type: 'ball-scale-multiple' }),
    MatNativeDateModule
  ],
  providers: [
    DatePipe,
    provideAnimationsAsync(),
    provideHttpClient(withInterceptors([loaderInterceptor, tokenInterceptor, errorInterceptor])),
    provideNativeDateAdapter()
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent]
})
export class AppModule {}
