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
  padding;
  indexside;

  @ViewChild('sidenav') sidenav;
  constructor(private sidenavService: SidenavService) {
    this.sidenavService.sideWidth.subscribe(data => this.sidenavWidth = data);
    this.sidenavService.pad.subscribe(data => this.padding = data);
    this.sidenavService.indexsid.subscribe(data => this.indexside = data);
    // this.count = this.sidenavService.count;

  }

  ngOnInit() {
    this.sidenavService.sidenavWidth = 220;
    this.sidenavService.padding = 30;
  }


  
  crease(event){
    if(this.sidenavService.sidenavWidth === 220) {
      this.sidenavService.indexsidebar = 5;
      this.sidenavService.sidenavWidth = 0;
      this.sidenavService.padding = 30;
      // if(this.sidenavService.sidenav != undefined){
      //   this.sidenavService.open();
      // }
      // console.log(this.sidenavService.sidenavWidth);
    } else if(this.sidenavService.sidenavWidth === 0){
      this.sidenavService.indexsidebar = 3;
      this.sidenavService.sidenavWidth = 220;
      this.sidenavService.padding = 0;
      if(this.sidenavService.sidenav != undefined){
        this.sidenavService.close();
      }
      // console.log(this.sidenavService.sidenavWidth);
    }
  }
}
