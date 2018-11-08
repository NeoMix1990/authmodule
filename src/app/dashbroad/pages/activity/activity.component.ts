import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpService } from '../../services/http.service';
import { MatSort, MatPaginator, MatTableDataSource, MatSortable, MatDialog, MatSidenav } from '@angular/material';
import { PROD_URL } from '../../../siteurl/siteurl';
import { ActivityService } from './activity.service';
import { SidenavService } from '../../services/sidenav.service';

@Component({
  selector: 'app-activity',
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.css']
})

export class ActivityComponent implements OnInit {

constructor(private _http: HttpService,
            private dialog: MatDialog,
            private sidenavService: SidenavService,
            private activity: ActivityService) { }

  @ViewChild('sidenavprewiev') sidenavprewiev: MatSidenav;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  hideCell = false;

  ngOnInit() {
    this.getActivity();
    this.sidenavService.setSidenav(this.sidenavprewiev);
    // this.sort.sort(<MatSortable>({id: 'date', start: 'asc'}));
    // this.formatTime(this.end, this.start);
  }

  displayedColumns: string[] = ['user', 'contragent', 'duration', 'date' , 'kp'];
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

  showCell() {
    this.getActivity();
    this.hideCell = false;
  }

  openRightSidenav(row) {
    this.activity.selectedActivity = row;
    console.log(this.activity.selectedActivity);

    this.sidenavService.open();
    setTimeout(() => {
      this.hideCell = true;
    }, 600);
  }

}
