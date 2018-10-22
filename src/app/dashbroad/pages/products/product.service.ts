import { Injectable } from '@angular/core';
import { HttpService } from '../../services/http.service';
import { Product } from '../../../models/product';
import { SaleDTO } from '../../../models/saleDTO';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  selectProductSeed: Product = new Product();
  selectProductSzr: Product = new Product();
  selectSale: SaleDTO = new SaleDTO();
  SZR: boolean = false;
  Seed: boolean = false;
  Sales: boolean = false;
  productListCMS: Product[] = [];
  productListERP: Product[] = [];
  saleList: SaleDTO[] = [];
  constructor(private _http: HttpService) { }
  


  delProduct(id: any) {
    this.productListCMS = this.productListCMS.filter(products => id !== products.id);
  }
}
