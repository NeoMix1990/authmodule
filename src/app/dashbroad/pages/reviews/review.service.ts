import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { ProductReview } from '../../../models/product-review';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {
  id: any;
  contactId: any;
  ifroadTo: boolean = false;

  sendID$: Observable<any>;
  private mysendIDSubject = new Subject<any>();

  sendContactID$: Observable<any>;
  private mysendContactIDSubject = new Subject<any>();

  constructor() { 
    this.sendID$ = this.mysendIDSubject.asObservable();
    this.sendContactID$ = this.mysendContactIDSubject.asObservable();
  }
  selectProductContactReview: ProductReview = new ProductReview();

  sendDataContactId(data) {
    console.log(data);
    this.mysendContactIDSubject.next(data);
  }
        

  sendContactId() {
    this.sendDataContactId(this.contactId);
  }
  sendID(data) {
      console.log(data);
      this.mysendIDSubject.next(data);
  }

  sendDataId() {
    this.sendID(this.id);
  }
}

