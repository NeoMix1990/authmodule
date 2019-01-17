import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
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

export class ActivityComponent implements OnInit, OnDestroy {

mainUserActivityMass;
userId;
activityList;

constructor(private _http: HttpService,
            private dialog: MatDialog,
            private sidenavService: SidenavService,
            private activity: ActivityService) { }

  @ViewChild('sidenavprewiev') sidenavprewiev: MatSidenav;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  displayedColumns: string[] = ['edit', 'creatorName', 'counteragentName', 'topic', 'duration', 'startTimeUNIX', 'orders'];
  dataSource: MatTableDataSource<any>;

  ngOnInit() {
    this.getActivity();
    this.sidenavService.setSidenav(this.sidenavprewiev);
    // this.sort.sort(<MatSortable>({id: 'date', start: 'asc'}));
    // this.formatTime(this.end, this.start);
    console.log(this.activity.selectedActivity);
    console.log(this.activity.ifroadTo);
    if(this.activity.ifroadTo === true) {
      setTimeout(() => {
        console.log(this.activity.selectedActivity);
        this.openRightSidenav(this.activity.selectedActivity);
      }, 1000);
    }
  }

  ngOnDestroy() {
    this.activity.selectedActivity = undefined;
    this.activity.userId = undefined;
    this.activity.ifroadTo = false;
  }

  getUserActivityID(id) {
    this._http.getContent(`${PROD_URL}/activity/admin/${id}`).subscribe(data => {
      this.dataSource = new MatTableDataSource(Object(data));
      console.log(this.dataSource);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  }

  getActivity() {
    this._http.getContent(`${PROD_URL}/activity`).subscribe(data => {
      this.activityList = Object(data);
      this.mainUserActivityMass = Object(data);
      this.userId = this.activity.userId;
      console.log(this.mainUserActivityMass);
      console.log(this.userId);
      this.mainUserActivityMass.forEach(element => {
        if(this.userId == element.crmProductId) {
          this.userId = element.crmProductId;
        }
      });
      if(this.userId != undefined) {
        this.getUserActivityID(this.userId);
      } else {
        this.dataSource = new MatTableDataSource(Object(data));
        console.log(Object(data));
        console.log(this.dataSource);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      }
    });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  openRightSidenav(row) {
    this.activity.ifroadTo = false;
    this.sidenavService.sidenavWidth = 0;
    this.sidenavService.padding = 30;
    if(this.activity.ifroadTo === false) {
      this.activity.selectedActivity = row;
    } else {
      this.activityList.forEach(order => {
        if(this.activity.selectedActivity.id === order.id) {
          this.activity.selectedActivity = order;
        }
      });
    }

    console.log(this.activity.selectedActivity);

    this.sidenavService.open();
  }

  selectedRowIndex: number = -1; 

  highlight(row){ 
      this.selectedRowIndex = row.id; 
  }

}
