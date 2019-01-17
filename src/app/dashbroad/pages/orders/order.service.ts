import { Injectable } from '@angular/core';
import {Order} from '../../../models/order';
import { Observable, Subject } from 'rxjs';
import { ActivityService } from '../activity/activity.service';
import { SidenavService } from '../../services/sidenav.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  ifroadTo: boolean = false;
  sendCPId$: Observable<any>;
  private mysendCPIDSubject = new Subject<any>();

  constructor() { 
    this.sendCPId$ = this.mysendCPIDSubject.asObservable();
  }

  selectedOrder: Order = new Order();
  companyName: any;

  sendIdCP(data) {
    console.log(data);
    this.mysendCPIDSubject.next(data);
  }

  sendIdToCP() {
    this.sendIdCP(this.selectedOrder);
  }

}
