import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-sidebar',
  templateUrl: './admin-sidebar.component.html',
  styleUrls: ['./admin-sidebar.component.css']
})
export class AdminSidebarComponent implements OnInit {
  constructor() { }

  ngOnInit() {
  }
  count = 0;
  sidenavWidth = 3;
  crease(event){
    this.count++;
    console.log(this.count);
    if(this.count % 2) {
      this.sidenavWidth = 15;
    } else {
      this.sidenavWidth = 3;
    }
    console.log("decrease sidenav width");
  }
}
