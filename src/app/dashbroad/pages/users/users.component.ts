import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { PROD_URL } from '../../../siteurl/siteurl';
import { HttpService } from '../../services/http.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  constructor(private _http: HttpService) { }

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  ngOnInit() {
    this.getUsers();
  }
  displayedColumns: string[] = ['login', 'name', 'position', 'phone', 'active'];
  dataSource: MatTableDataSource<any>;

  getUsers() {
    this._http.getContent(PROD_URL + '/user/all').subscribe(data => {
      console.log(data);
      this.dataSource = new MatTableDataSource(Object(data));
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
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
  
}
