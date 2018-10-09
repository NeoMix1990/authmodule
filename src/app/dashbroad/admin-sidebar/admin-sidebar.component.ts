import { Component, OnInit, ViewChild, ViewEncapsulation, Output } from '@angular/core';
import { MatSidenav } from '@angular/material';

@Component({
  selector: 'app-admin-sidebar',
  templateUrl: './admin-sidebar.component.html',
  styleUrls: ['./admin-sidebar.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AdminSidebarComponent implements OnInit {

  constructor() { }
  sidenavWidth = 190;
  ngOnInit() {
    setTimeout(() => {
      this.sidenav.open();
    }, 0);
  }

  @ViewChild('sidenav') sidenav: MatSidenav;

  count = 0;
  
  crease(event){
    this.count++;
    console.log(this.count);
    if(this.count % 2) {
      this.sidenavWidth = 3;
      console.log(this.sidenavWidth);
    } else {
      this.sidenavWidth = 190;
      console.log(this.sidenavWidth);
    }
  }
}
