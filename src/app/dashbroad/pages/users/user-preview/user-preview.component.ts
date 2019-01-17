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

  id: number;

  constructor(private _http: HttpService,
              private sidenavService: SidenavService,
              private userServ: UserService,
              public usersComponent: UsersComponent) { }

  ngOnInit() {
  }

  close() {
    this.sidenavService.close();
    this.sidenavService.sidenavWidth = 220;
    this.sidenavService.padding = 0;
  }

  getFilter() {
    this.sidenavService.close();
  }

  unlinkDevice(id: number) {
      if (id != null) {
          if (confirm('Вы уверены что хотите отвязать уcтройство?') == true) {
              this._http.putContent(`${PROD_URL}/user/${id}/unlink`, null).subscribe(
                  response => {
                      alert('Устройство отвязано');
                  });
          }
      }
  }
  roadToActivity(user) {
    this.userServ.roadMainActivity(user.id);
  }

}
