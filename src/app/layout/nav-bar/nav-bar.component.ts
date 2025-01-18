// Angular Import
import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent {
  // public props
  menuClass = false;
  collapseStyle = 'none';
  windowWidth = window.innerWidth;
  @Output() NavCollapse = new EventEmitter();
  @Output() NavCollapsedMob = new EventEmitter();
  @Output() NavCollapsedMob1 = new EventEmitter();

  // public method
  toggleMobOption() {
    this.menuClass = !this.menuClass;
    this.collapseStyle = this.menuClass ? 'block' : 'none';
    //its only triger when click on more-vertical(this is for close menubar)
    this.NavCollapsedMob1.emit();
  }

  //when click on menubar then close more-verti..
  navCollapsedMob() {
    if (this.menuClass === true) {
      this.toggleMobOption();
    }
    //its emit for mobile display
    this.NavCollapsedMob.emit();
  }

  navCollapse() {
    if (this.windowWidth >= 992) {
      this.NavCollapse.emit();
    }
  }
}
