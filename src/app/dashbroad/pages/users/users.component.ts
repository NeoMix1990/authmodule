import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator, MatSidenav, MatDialog } from '@angular/material';
import { PROD_URL } from '../../../siteurl/siteurl';
import { HttpService } from '../../services/http.service';
import { SecurityService } from '../../../login/auth-service/security.service';
import { SidenavService } from '../../services/sidenav.service';
import { UserService } from './user.service';
import { UserFormComponent } from './user-form/user-form.component';
import { UserDTO } from '../../../models/user';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  selectedRowIndex: number = -1; 

  highlight(row){ 
      this.selectedRowIndex = row.id; 
  }

  constructor(private dialog: MatDialog,
              private _http: HttpService,
              private _authSrv: SecurityService,
              private sidenavService: SidenavService,
              private userServ: UserService) { }

  @ViewChild('sidenavprewiev') sidenavprewiev: MatSidenav;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;


  ngOnInit() {
    this.getUsers();
    this.sidenavService.setSidenav(this.sidenavprewiev);
  }

  displayedColumns: string[] = ['edit', 'name', 'activity', 'active'];
  dataSource: MatTableDataSource<any>;

  getUsers() {
    this._http.getContent(`${PROD_URL}/user/all`).subscribe(data => {
      console.log(data);
      this.dataSource = new MatTableDataSource(Object(data));
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  }

  openRightSidenav(row) {
    this.userServ.selectedUser = row;
    console.log(this.userServ.selectedUser);
    this.sidenavService.sidenavWidth = 0;
    this.sidenavService.padding = 30;
    this.sidenavService.open();
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
    this._http.putContent(`${PROD_URL}/user/${element.id}?is_active=${isActive}`, null)
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

  addNewUserModal(user: UserDTO) {
    this.sidenavService.sidenavWidth = 220;
    this.sidenavService.padding = 0;
    const dialogRef = this.dialog.open(UserFormComponent,
      { data: { }, height: '600px', width: '600px'
      });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        this.getUsers();
      }
    });
  }

  roadToActivity(user) {
    this.userServ.roadMainActivity(user.id);
  }


}
