import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator, MatSidenav } from '@angular/material';
import { PROD_URL } from '../../../siteurl/siteurl';
import { HttpService } from '../../services/http.service';
import { SecurityService } from '../../../login/auth-service/security.service';
import { SidenavService } from '../../services/sidenav.service';
import { UserService } from './user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  constructor(private _http: HttpService,
              private _authSrv: SecurityService,
              private sidenavService: SidenavService,
              private user: UserService) { }

  @ViewChild('sidenavprewiev') sidenavprewiev: MatSidenav;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  hideCell = false;

  ngOnInit() {
    this.getUsers();
    this.sidenavService.setSidenav(this.sidenavprewiev);
  }

  displayedColumns: string[] = ['login', 'name', 'position', 'phone', 'group', 'activity', 'active'];
  dataSource: MatTableDataSource<any>;

  getUsers() {
    this._http.getContent(this._authSrv.getServerUrl() + '/user/all').subscribe(data => {
      console.log(data);
      this.dataSource = new MatTableDataSource(Object(data));
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  }

  openRightSidenav(row) {
    this.user.selectedUser = row;
    console.log(this.user.selectedUser);
    this.sidenavService.open();
    setTimeout(() => {
      this.hideCell = true;
    }, 600);
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  changeUsersActivity(element) {
    console.log(element);
    const isActive = element.active;
    this._http.putContent(PROD_URL + '/user/' + element.id + '?is_active=' + isActive, null)
        .subscribe(() => {
            // this.successMessage = 'Активность пользователя успешно изменена';
            // this.showSuccess();
        },
        // error => {
        //     this.initUsers();
        //     this.checkError(error)
      // }
    );
}

  showCell() {
    this.getUsers();
    this.hideCell = false;
  }

}
