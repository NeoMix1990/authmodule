import { Component, OnInit } from '@angular/core';
import { SidenavService } from '../../../services/sidenav.service';
import { UserService } from '../user.service';
import { UsersComponent } from '../users.component';
import {PROD_URL} from '../../../../siteurl/siteurl';
import {HttpService} from '../../../services/http.service';

@Component({
  selector: 'app-user-preview',
  templateUrl: './user-preview.component.html',
  styleUrls: ['./user-preview.component.css']
})
export class UserPreviewComponent implements OnInit {

  constructor(private _http: HttpService,
              private sidenavService: SidenavService,
              private user: UserService,
              public usersComponent: UsersComponent) { }

  ngOnInit() {
  }

  close() {
    this.sidenavService.close();
    setTimeout(() => {
      this.usersComponent.showCell();
    }, 300);
  }

}
