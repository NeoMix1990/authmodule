import { Injectable } from '@angular/core';
import { ActivityTDO } from "../../../models/activityDTO";
import { Observable, Subject } from 'rxjs';
import { OrderService } from '../orders/order.service';
import { SidenavService } from '../../services/sidenav.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ActivityService {
  userId;
  activityId;
  ifroadTo: boolean = false;
  selectedActivity: ActivityTDO = new ActivityTDO();
  
  sendUserID$: Observable<any>;
  private mysendUserIDSubject = new Subject<any>();

  sendOrderID$: Observable<any>;
  private mysendOrderIDSubject = new Subject<any>();

  constructor(private CpServ: OrderService,
    private sidenavService: SidenavService,
    private _router: Router
    ) { 
    this.sendUserID$ = this.mysendUserIDSubject.asObservable();
    this.sendOrderID$ = this.mysendOrderIDSubject.asObservable();
  }

  sendUserID(data) {
      console.log(data);
      this.mysendUserIDSubject.next(data);
  }

  sendOrderID(data) {
    console.log(data);
    this.mysendOrderIDSubject.next(data);
  }

  sendToActiveOrder() {
    this.sendOrderID(this.selectedActivity);
  }



  sendIdActivity() {
    this.sendUserID(this.userId);
  }
  roadMainCP(element) {
    this.CpServ.ifroadTo = true;
    this.CpServ.selectedOrder = element;
    console.log(element);
    this.CpServ.sendIdToCP();
    this.sidenavService.close();
    this.sidenavService.sidenavWidth = 220;
    this.sidenavService.padding = 0;
    setTimeout(() => {
      this._router.navigate(['/dashbroad/orders']);
    }, 400);
  }

}
