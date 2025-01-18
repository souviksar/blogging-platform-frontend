import { Component } from '@angular/core';
import { Location, LocationStrategy } from '@angular/common';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent {
  navCollapsed!: boolean;
  navCollapsedMob: boolean;
  windowWidth: number;

  constructor(
    private location: Location,
    private locationStrategy: LocationStrategy
  ) {
    // let current_url = this.location.path();
    const baseHref = this.locationStrategy.getBaseHref();
    if (baseHref) {
      // current_url = baseHref + this.location.path();
    }
    this.windowWidth = window.innerWidth;
    this.navCollapsedMob = false;
  }

  navMobClick() {
    if (this.windowWidth < 992) {
      if (this.navCollapsedMob && !document.querySelector('app-navigation.pcoded-navbar')?.classList.contains('mob-open')) {
        this.navCollapsedMob = !this.navCollapsedMob;
        setTimeout(() => {
          this.navCollapsedMob = !this.navCollapsedMob;
        }, 100);
      } else {
        this.navCollapsedMob = !this.navCollapsedMob;
      }
    }
  }

  navMobClick1() {
    if (this.windowWidth < 992) {
      if (this.navCollapsedMob || !this.navCollapsedMob) {
        this.navCollapsedMob = false;
      }
    }
  }
}
