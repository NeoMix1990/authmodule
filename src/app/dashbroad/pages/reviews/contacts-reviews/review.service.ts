import { Injectable } from '@angular/core';
import { ProductReview } from '../../../../models/product-review';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {

  constructor() { }
  selectProductContactReview: ProductReview = new ProductReview();

}


