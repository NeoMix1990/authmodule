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
  sidenavWidth;
  count = 0;
  constructor(private sidenavService: SidenavService) {
    this.sidenavService.sideWidth.subscribe(data => this.sidenavWidth = data);
    // this.count = this.sidenavService.count;
  }

  @ViewChild('sidenav') sidenav: MatSidenav;

  ngOnInit() {
    setTimeout(() => {
      this.sidenav.open();
    }, 0);

    this.sidenavService.sidenavWidth = 190;
  }


  
  crease(event){
    console.log(this.count);
    if(this.sidenavService.sidenavWidth === 190) {
      this.sidenavService.sidenavWidth = 3;
      // this.sidenavService.open();
      console.log(this.sidenavService.sidenavWidth);
    } else if(this.sidenavService.sidenavWidth === 3){
      this.sidenavService.sidenavWidth = 190;
      if(this.sidenavService.open) {
        this.sidenavService.close();
      }
      console.log(this.sidenavService.sidenavWidth);
    }
  }
}
