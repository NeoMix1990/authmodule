import { Injectable } from '@angular/core';
import { HttpService } from '../../services/http.service';
import { Product } from '../../../models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  selectProductSzr: Product = new Product();
  productListCMS: Product[] = [];
  productListERP: Product[] = [];
  constructor(private _http: HttpService) { }
  


  delProduct(id: any) {
    this.productListCMS = this.productListCMS.filter(products => id !== products.id);
  }
}
