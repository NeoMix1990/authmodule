import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { ContactTDO } from '../../../models/contactDTO';
import { HttpService } from '../../services/http.service';
import { PROD_URL } from '../../../siteurl/siteurl';


@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css']
})
export class ContactsComponent implements OnInit {

  constructor(private _http: HttpService) { }

  contacts = [];
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  ngOnInit() {
    this.getContacts();
  }
  displayedColumns: string[] = ['FIO', 'position', 'firstPhone', 'subdivision', 'delete'];
  dataSource: MatTableDataSource<any>;
  
  getContacts() {
    this._http.getContent(PROD_URL + '/tdncontact').subscribe(data => {
      this.dataSource = new MatTableDataSource(Object(data));
      console.log(data);
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

}
