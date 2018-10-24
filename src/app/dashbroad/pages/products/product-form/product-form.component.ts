import { Component, OnInit, Inject } from '@angular/core';
import { HttpService } from '../../../services/http.service';
import { MatDialogRef, MatDialog, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormControl } from '@angular/forms';
import { ProductService } from '../product.service';

import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { Product } from '../../../../models/product';
import { ProductDTO } from '../../../../models/productDTO';
import { ProductsAdd } from '../../../../models/productsAdd';
import { PROD_URL } from '../../../../siteurl/siteurl';
import { ProductERP } from '../../../../models/productERP';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {

  productform: FormGroup;

  filteredOptionsERP: Observable<ProductERP[]>;
  filteredOptionsCMS: Observable<Product[]>;
  constructor(private _http: HttpService ,private dialogRef: MatDialogRef<ProductFormComponent>, private dialog: MatDialog, @Inject(MAT_DIALOG_DATA) private data: any, private product: ProductService) { }

  ngOnInit() {
    this.getERP();
    this.getFormContact();
    this.filterERP();
    this.filterCMS();
    console.log(this.data);
    console.log(this.product.productListERP);
  }

  getFormContact() {
    this.productform = new FormGroup({
      newNameCMS: new FormControl(''),
      newNameERP: new FormControl('')
    });
  }

  getERP() {
    this.product.getProductERP();
  }

  onNoClick(){
    this.dialogRef.close();
  }

  sendNewProduct = new ProductDTO();
  prodinfomass: ProductsAdd[] = [];
  prodinfo = new ProductsAdd();
  onSubmit(productform: FormGroup) {
    console.log(productform);
    
    // if(productform.value.newNameCMS.fertilizerGroup != true) {
    if(this.product.SZR == true) {
      this.sendNewProduct.productType = "FERTILIZER";
      console.log(this.sendNewProduct);
    // } else if(productform.value.newNameCMS.culture != null) {
    } else if(this.product.Seed == true) {
      this.sendNewProduct.productType = "HYBRID";
      console.log(this.sendNewProduct);
    }

    this.prodinfo.idCMS = productform.value.newNameCMS.id;
    this.prodinfo.idERP = productform.value.newNameERP.erpId;
    if(productform.value.newNameERP.descriptions.lebgth > 0) {
      this.prodinfo.idERPDescription = productform.value.newNameERP.descriptions[0].erpDescriptionId;
    }
    this.prodinfomass.push(this.prodinfo);
    this.sendNewProduct.products = this.prodinfomass;
    
    this._http.postContent(PROD_URL + '/crmproduct', this.sendNewProduct).subscribe()
  }


  filterERP() {
    console.log(this.product.productListERP);
    this.filteredOptionsERP = this.productform.controls.newNameERP.valueChanges
    .pipe(
      startWith<string | Product>(''),
      map(value => typeof value === 'string' ? value : value.name),
      map(name => name ? this._filterERP(name) : this.product.productListERP.slice())
    );
  }
  filterCMS() {
    console.log(this.data.product);
    this.filteredOptionsCMS = this.productform.controls.newNameCMS.valueChanges
    .pipe(
      startWith<string | Product>(''),
      map(value => typeof value === 'string' ? value : value.name),
      map(name => name ? this._filterCMS(name) : this.data.product.slice())
    );
  }

  newDisplayFnCMS(product?: Product): string | undefined {
    return product ? product.name : undefined;
  }

  private _filterCMS(name: string): Product[] {
    const filterValueCMS = name.toLowerCase();

    return this.data.product.filter(option => option.name.toLowerCase().indexOf(filterValueCMS) === 0);
  }
  newDisplayFnERP(product?: Product): string | undefined {
    return product ? product.name : undefined;
  }

  private _filterERP(name: string): ProductERP[] {
    const filterValueERP = name.toLowerCase();

    return this.product.productListERP.filter(option => option.name.toLowerCase().indexOf(filterValueERP) === 0);
  }
}
