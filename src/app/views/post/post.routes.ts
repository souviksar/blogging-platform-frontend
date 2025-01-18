import { Routes } from '@angular/router';
import { ListComponent } from './list/list.component';

export const POST_ROUTES: Routes = [
  {
    path: '',
    component: ListComponent,
    data: { title: 'Post', isBreadcrumb: true }
  }
];
