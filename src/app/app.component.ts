// Angular Import
import { Component, OnInit, effect, inject } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { LoaderService } from './services/loader.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  private router: Router = inject(Router);
  private spinner: NgxSpinnerService = inject(NgxSpinnerService);
  private loaderService: LoaderService = inject(LoaderService);

  constructor() {
    effect(() => {
      this.loaderService.isLoading() ? this.spinner.show() : this.spinner.hide();
    });
  }

  // life cycle event
  ngOnInit() {
    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
      window.scrollTo(0, 0);
    });
  }
}
