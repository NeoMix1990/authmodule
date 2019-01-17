import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpService } from '../../../services/http.service';
import { MatDialog, MatPaginator, MatSidenav, MatSort, MatTableDataSource } from '@angular/material';
import { SidenavService } from '../../../services/sidenav.service';
import { PROD_URL } from '../../../../siteurl/siteurl';
import { OrderService } from './order.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  constructor(private _http: HttpService,
              private dialog: MatDialog,
              private sidenavService: SidenavService,
              private order: OrderService) { }

  @ViewChild('sidenavprewiev') sidenavprewiev: MatSidenav;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  displayedColumns: string[] = ['date', 'kontragent', 'topic', 'user', 'sum', 'quantity', 'approved'];
  dataSource: MatTableDataSource<any>;

  hideCell = false;

  activities: string[] = [];

  ngOnInit() {
    this.getOrders();
    this.sidenavService.setSidenav(this.sidenavprewiev);
  }

  getOrders() {
    this._http.getContent(PROD_URL + '/activity/order/all').subscribe(data => {
      this.dataSource = new MatTableDataSource(Object(data));
      console.log('this.dataSource');
      console.log(this.dataSource);

      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;

      for (let i = 0; i < Object(data).length; i++) {
        this.activities.push(Object(data[i].activities));
      }
      console.log(this.activities);

    });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  openRightSidenav(row) {
    this.order.selectedOrder = row;
    console.log(this.order.selectedOrder);
    this.sidenavService.open();
    setTimeout(() => {
      this.hideCell = true;
    }, 600);
  }

  showCell() {
    this.getOrders();
    this.hideCell = false;
  }

}


