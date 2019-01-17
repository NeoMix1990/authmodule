import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { SidenavService } from '../../../services/sidenav.service';
import { OrdersComponent } from '../orders.component';
import { OrderService } from '../order.service';
import { MatTableDataSource, MatSidenav, MatSort } from '@angular/material';
import { ProductService } from '../../products/product.service';
import { Router } from '@angular/router';
import { ActivityService } from '../../activity/activity.service';
import * as jspdf from 'jspdf';
import html2canvas from 'html2canvas';


@Component({
  selector: 'app-order-preview',
  templateUrl: './order-preview.component.html',
  styleUrls: ['./order-preview.component.css']
})
export class OrderPreviewComponent implements OnInit {

  @ViewChild('sidenavprewiev') sidenavprewiev: MatSidenav;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private sidenavService: SidenavService,
              private activity: ActivityService,
              private order: OrderService,
              private product: ProductService,
              private _router: Router,
              public ordersComponent: OrdersComponent) { }

  ngOnInit() {
    console.log(this.order.ifroadTo);
    if(this.order.ifroadTo === true) {
      setTimeout(() => {
        this.getNomencleture();
      }, 1000);
    }
  }
  ngOnDestroy() {
    this.order.ifroadTo = false;
  }

  displayedColumns: string[] = ['crmProduct.name', 'crmProduct.productType', 'crmProduct.brand.brandName', 'price'];
  dataSource: MatTableDataSource<any>;

  displayedColumnsActive: string[] = ['startTimeUNIX', 'topic', 'go'];
  dataSourceActive: MatTableDataSource<any>;


  close() {
    this.sidenavService.close();
    this.sidenavService.sidenavWidth = 220;
    this.sidenavService.padding = 0;
  }

  getFilter() {
    this.getNomencleture();
    this.sidenavService.close();
  }

  getNomencleture() {
    this.dataSource = new MatTableDataSource(Object(this.order.selectedOrder.orderProducts));
    console.log(this.dataSource);
    this.dataSource.sortingDataAccessor = (item, property) => {
      switch(property) {
        case 'crmProduct.name': return item.crmProduct.name;
        case 'crmProduct.brand.brandName': return item.crmProduct.brand.brandName;
        default: return item[property];
      }
    };
    this.dataSource.sort = this.sort;

    this.dataSourceActive = new MatTableDataSource(this.order.selectedOrder.activities);
    this.dataSourceActive.sortingDataAccessor = (item, property) => {
      switch(property) {
        case 'topic': return item.topic;
        default: return item[property];
      }
    };

    this.dataSourceActive.sort = this.sort;
  }
  roadOrderToProduct(product) {
    console.log(product.id);

    this.sidenavService.close();
    this.sidenavService.sidenavWidth = 220;
    this.sidenavService.padding = 0;
    setTimeout(() => {
      this.product.teleportBool = true;
      if(product.productType === "FERTILIZER") {
        console.log('hi szr');
        this.product.selectProductSzr = product;
        this._router.navigate(['/dashbroad/products/szr']);
      } else if(product.productType === "HYBRID") {
        console.log('hi seeds');
        this.product.selectProductSeed = product;
        this._router.navigate(['/dashbroad/products/seeds']);
      }
    }, 400);
  }


  // for print code
  public captureScreen() {
    let data = document.getElementById('pdf-download');
    html2canvas(data).then(canvas => {
      // Few necessary setting options
      let imgWidth = 208;
      let pageHeight = 295;
      let imgHeight = canvas.height * imgWidth / canvas.width;
      let heightLeft = imgHeight;
      
      const contentDataURL = canvas.toDataURL('image/png')
      let pdf = new jspdf('p', 'mm', 'a4'); // A4 size page of PDF
      let position = 0;
      pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight)
      pdf.save('kp.pdf'); // Generated PDF
    });
  }
  // /for print code
  

  goToActivity(order) {
    this.activity.ifroadTo = true;
    this.activity.selectedActivity = order;
    console.log(order);
    this.activity.sendToActiveOrder();
    this.sidenavService.close();
    this.sidenavService.sidenavWidth = 220;
    this.sidenavService.padding = 0;
    setTimeout(() => {
      this._router.navigate(['/dashbroad/activity']);
    }, 400);
  }
}
