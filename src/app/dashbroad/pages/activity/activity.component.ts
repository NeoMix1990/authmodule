import {Component, OnInit, ViewChild} from "@angular/core";
import { HttpService } from '../../services/http.service';
import {MatSort, MatPaginator, MatTableDataSource, MatSortable} from "@angular/material";
import { PROD_URL } from '../../../siteurl/siteurl';

@Component({
  selector: 'app-activity',
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.css']
})

export class ActivityComponent implements OnInit {

  // time: any;
  // dur: string;
  // end: any = [];
  // start: any = [];

  constructor(private _http: HttpService) { }

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  ngOnInit() {
    this.getActivity();
    // this.sort.sort(<MatSortable>({id: 'date', start: 'asc'}));
    // this.formatTime(this.end, this.start);

  }
  displayedColumns: string[] = ['user', 'contragent', 'topic', 'location', 'duration', 'date' , 'kp'];
  dataSource: MatTableDataSource<any>;

  getActivity() {
    this._http.getContent(PROD_URL + '/activity').subscribe(data => {
      this.dataSource = new MatTableDataSource(Object(data));
      console.log(Object(data));
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

  // formatTime(end: any, start: any) {
  //   this.time = (end - start).toFixed(2).split('.');
  //   this.time = new Date();
  //   this.dur = (this.time[0] + 'ч. ' + this.time[1] + 'м.');
  //   return this.dur;
  // }

}
