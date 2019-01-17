import { Injectable } from '@angular/core';
import { HttpService } from '../../services/http.service';
import { Product } from '../../../models/product';
import { SaleDTO } from '../../../models/saleDTO';
import { PROD_URL } from '../../../siteurl/siteurl';
import { ProductERP } from '../../../models/productERP';
import { ProductCMS } from '../../../models/productCMS';
import { Descriptions } from '../../../models/descriptions';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  selectProductSeed: Product = new Product();
  selectProductSzr: Product = new Product();
  selectCMS: ProductCMS = new ProductCMS();
  selectSale: SaleDTO = new SaleDTO();
  allProducts: Product[] = [];
  SZR: boolean = false;
  Seed: boolean = false;
  Sales: boolean = false;
  ShowDescription: boolean = false;
  productListCMS: ProductCMS[] = [];
  productListERP: ProductERP[] = [];
  descriptionList: Descriptions[] = [];
  saleList: SaleDTO[] = [];
  selectProdSaleList = [];
  teleportBool: boolean = false;
  productMassInSale: Product[] = [];

  listAllProduct: Product[] =[];

  productId = [];

  plusminusProd: boolean = true;

  constructor(private _http: HttpService) { 
  }
  
  getSzr() {
    return this._http.getContent(`${PROD_URL}/crmproduct/fertilizer/all`);
  }

  getSeed() {
    return this._http.getContent(`${PROD_URL}/crmproduct/hybrid/all`);
  }

  getSale() {
    return this._http.getContent(`${PROD_URL}/sale/all`);
  }

  getProductERP() {
    return this._http.getContent(`${PROD_URL}/crmproduct/erp/all`).subscribe(dataERP => {
      this.productListERP = Object(dataERP);
      console.log(this.productListERP);
    });
  }
  getAllProducts() {
    return this._http.getContent(`${PROD_URL}/crmproduct/all`).subscribe(data => {
      this.allProducts = Object(data);
      // console.log(this.allProducts);
    });
  }

  getProductInSale(){
    return this.productMassInSale;
  }
  delProductInSale(id){
    return this.productMassInSale = this.productMassInSale.filter(product => product.id != id);
  }
}
