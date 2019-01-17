import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { HttpService } from '../../services/http.service';
import { MatDialog, MatPaginator, MatSidenav, MatSort, MatTableDataSource } from '@angular/material';
import { SidenavService } from '../../services/sidenav.service';
import { PROD_URL } from '../../../siteurl/siteurl';
import { OrderService } from './order.service';
import { OrderPreviewComponent } from './order-preview/order-preview.component';
import { Order } from '../../../models/order';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit, OnDestroy {
  selectedRowIndex: number = -1; 

  highlight(row){ 
      this.selectedRowIndex = row.id; 
  }

  constructor(private _http: HttpService,
              private dialog: MatDialog,
              private sidenavService: SidenavService,
              private order: OrderService) { }

  @ViewChild('sidenavprewiev') sidenavprewiev: MatSidenav;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  displayedColumns: string[] = ['edit', 'creatorName', 'counteragentName', 'name', 'createTimeUNIX', 'sum', 'quantity', 'approved'];
  dataSource: MatTableDataSource<any>;
  orderList: Order[];

  activities: string[] = [];

  ngOnInit() {
    this.getOrders();
    this.sidenavService.setSidenav(this.sidenavprewiev);
    if(this.order.ifroadTo === true) {
      setTimeout(() => {
        this.openRightSidenav(this.order.selectedOrder);
      }, 1000);
    }
  }
  ngOnDestroy() {
    this.order.ifroadTo = false;
  }

  getOrders() {
    this._http.getContent(`${PROD_URL}/activity/order/all`).subscribe(data => {
      this.orderList = Object(data);
      this.dataSource = new MatTableDataSource(Object(data));
      console.log(this.dataSource);

      // this.sort.sort(<MatSortable>({id: 'date', start: 'desc'}));

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
    if (this.order.ifroadTo === true) {
      this.orderList.forEach(order => {
        if(this.order.selectedOrder.id === order.id) {
          this.order.selectedOrder = order;
        }
      });
    } else {
      this.order.selectedOrder = row;
    }
    if(this.order.selectedOrder.activities.length > 0){
      this.order.companyName = this.order.selectedOrder.activities[0].counteragentName;
    }
    console.log(this.order.selectedOrder);
    this.sidenavService.sidenavWidth = 0;
    this.sidenavService.padding = 30;
    this.sidenavService.open();
  }

}


