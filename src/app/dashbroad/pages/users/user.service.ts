import { Injectable } from '@angular/core';
import {UserDTO} from '../../../models/user';
import { SidenavService } from '../../services/sidenav.service';
import { Router } from '@angular/router';
import { ActivityService } from '../activity/activity.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private sidenavService: SidenavService, 
              private _router: Router,
              private activeServ: ActivityService  
            ) { }
  selectedUser: UserDTO = new UserDTO();

  roadMainActivity(element) {

    this.activeServ.userId = element;
    console.log(element);
    this.activeServ.sendIdActivity();
    this.sidenavService.close();
    this.sidenavService.sidenavWidth = 220;
    this.sidenavService.padding = 0;
    setTimeout(() => {
      this._router.navigate(['/dashbroad/activity']);
    }, 400);
  }
}
