import { Injectable } from '@angular/core';
import { HttpService } from '../../services/http.service';
import { Product } from '../../../models/product';
import { SaleDTO } from '../../../models/saleDTO';
import { PROD_URL } from '../../../siteurl/siteurl';
import { ProductERP } from '../../../models/productERP';
import { ProductCMS } from '../../../models/productCMS';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  selectProductSeed: Product = new Product();
  selectProductSzr: Product = new Product();
  selectERP: ProductERP = new ProductERP();
  selectSale: SaleDTO = new SaleDTO();
  SZR: boolean = false;
  Seed: boolean = false;
  Sales: boolean = false;
  productListCMS: ProductCMS[] = [];
  productListERP: ProductERP[] = [];
  saleList: SaleDTO[] = [];
  constructor(private _http: HttpService) { }
  

  getProductERP() {
    return this._http.getContent(PROD_URL + '/crmproduct/erp/all').subscribe(dataERP => {
      this.productListERP = Object(dataERP);
      console.log(this.productListERP);
    });
  }

  delProduct(id: any) {
    this.productListCMS = this.productListCMS.filter(products => id !== products.id);
  }
}
