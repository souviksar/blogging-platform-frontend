import { Component, OnDestroy, inject } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { filter, map, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

interface IRouteData {
  title: string;
  isBreadcrumb: boolean;
}

@Component({
  selector: 'app-breadcrumb',
  standalone: true,
  imports: [],
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss']
})
export class BreadcrumbComponent implements OnDestroy {
  private router: Router = inject(Router);
  private titleService: Title = inject(Title);
  routeData: IRouteData;
  private destroySubject$: Subject<void> = new Subject();

  constructor() {
    this.setBreadcrumb();
  }

  // public method
  setBreadcrumb() {
    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        map(() => {
          let route = this.router.routerState.root;
          while (route.firstChild) {
            route = route.firstChild;
          }
          return { title: route.snapshot.data['title'] as string, isBreadcrumb: route.snapshot.data['isBreadcrumb'] as boolean };
        }),
        takeUntil(this.destroySubject$)
      )
      .subscribe((data: IRouteData) => {
        this.routeData = data;
        this.titleService.setTitle(data.title && data.title.length ? data.title + ' | Blogging Platform' : 'Blogging Platform');
      });
  }

  ngOnDestroy(): void {
    this.destroySubject$.next();
    this.destroySubject$.complete();
    this.titleService.setTitle('Blogging Platform');
  }

  goBack() {}
}
