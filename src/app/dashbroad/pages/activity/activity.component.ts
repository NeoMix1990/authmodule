import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpService } from '../../services/http.service';
import { MatSort, MatPaginator, MatTableDataSource } from '@angular/material';
import { PROD_URL } from '../../../siteurl/siteurl';

@Component({
  selector: 'app-activity',
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.css']
})
export class ActivityComponent implements OnInit {

  constructor(private _http: HttpService) { }

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  ngOnInit() {
    this.getActivity();
  }
  displayedColumns: string[] = ['user', 'contragent', 'duration', 'date' , 'kp'];
  dataSource: MatTableDataSource<any>;

  getActivity() {
    this._http.getContent(PROD_URL + '/activity').subscribe(data => {
      this.dataSource = new MatTableDataSource(Object(data));
      console.log(this.dataSource);
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
