import { Routes } from '@angular/router';
import { ListComponent } from './list/list.component';
import { DetailsComponent } from './details/details.component';

export const POST_ROUTES: Routes = [
  {
    path: '',
    component: ListComponent,
    data: { title: 'Post', isBreadcrumb: true }
  },
  {
    path: 'details/:postId',
    component: DetailsComponent,
    data: { title: 'Post Details', isBreadcrumb: true }
  }
];
