import { Component, OnInit, ViewChild, ViewEncapsulation, Output } from '@angular/core';
import { MatSidenav } from '@angular/material';
import { SidenavService } from '../services/sidenav.service';

@Component({
  selector: 'app-admin-sidebar',
  templateUrl: './admin-sidebar.component.html',
  styleUrls: ['./admin-sidebar.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AdminSidebarComponent implements OnInit {

  count = 0;
  constructor(private sidenavService: SidenavService) {
    this.sidenavService.sideWidth.subscribe(data => this.sidenavWidth = data);
    // this.count = this.sidenavService.count;
  }
  sidenavWidth = 190;
  ngOnInit() {
    setTimeout(() => {
      this.sidenav.open();
    }, 0);
  }

  @ViewChild('sidenav') sidenav: MatSidenav;

  
  crease(event){
    this.count++;
    console.log(this.count);
    if(this.count % 2) {
      this.sidenavWidth = 3;
      // this.sidenavService.open();
      console.log(this.sidenavWidth);
    } else {
      this.sidenavWidth = 190;
      // this.sidenavService.close();
      console.log(this.sidenavWidth);
    }
  }
}
