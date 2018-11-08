import { Component, OnInit } from '@angular/core';
import { SidenavService } from '../../../../services/sidenav.service';
import { OrdersComponent } from '../orders.component';
import { OrderService } from '../order.service';


@Component({
  selector: 'app-order-preview',
  templateUrl: './order-preview.component.html',
  styleUrls: ['./order-preview.component.css']
})
export class OrderPreviewComponent implements OnInit {

  constructor(private sidenavService: SidenavService,
              private order: OrderService,
              public ordersComponent: OrdersComponent) { }

  ngOnInit() {

  }

  close() {
    this.sidenavService.close();
    setTimeout(() => {
      this.ordersComponent.showCell();
    }, 300);
  }

}
