import { Component, OnInit, Inject } from '@angular/core';
import { HttpService } from '../../../services/http.service';
import { MatDialogRef, MatDialog, MAT_DIALOG_DATA, MatAutocompleteSelectedEvent } from '@angular/material';
import { FormGroup, FormControl, RequiredValidator, Validators } from '@angular/forms';
import { ProductService } from '../product.service';

import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { Product } from '../../../../models/product';
import { ProductDTO } from '../../../../models/productDTO';
import { ProductsAdd } from '../../../../models/productsAdd';
import { PROD_URL } from '../../../../siteurl/siteurl';
import { ProductERP } from '../../../../models/productERP';
import { Descriptions } from '../../../../models/descriptions';
import { SaleDTO } from '../../../../models/saleDTO';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {
  formGroup: FormGroup;
  productform: FormGroup;
  objectKeys = Object.keys;
  filteredOptionsERP: Observable<ProductERP[]>;
  filteredOptionsCMS: Observable<Product[]>;
  filteredOptionsDescription: Observable<Descriptions[]>;
  filteredOptionsCRM: Observable<Product[]>;
  
  
  constructor(private _http: HttpService ,private dialogRef: MatDialogRef<ProductFormComponent>, @Inject(MAT_DIALOG_DATA) private data: any, private product: ProductService) { }

  ngOnInit() {
    this.product.productMassInSale = [];
    this.getERP();
    this.getFormContact();
    this.salesForm();
    this.filterERP();
    this.filterCMS();
    this.filterCRM();
    this.product.ShowDescription = false;
    console.log(this.data);
    console.log(this.product.productListERP);
  }

  displayFnCRM(product?: Product): string | undefined {
    return product ? product.name : undefined;
  }
  salesForm(){
    this.formGroup = new FormGroup({
      topic: new FormControl(''),
      dateSale: new FormControl(''),
      description: new FormControl(''),
      url: new FormControl(''),
      nameCRM: new FormControl('')
    });
  }

  addNewSale(data) {
    console.log(data);
    let createSale = new SaleDTO();
      console.log(this.product.productMassInSale);
      this.product.productId = [];
      this.product.productMassInSale.forEach(element => {
        this.product.productId.push(element.id);
      });
      createSale.topic = data.topic;
      createSale.description = data.description;
      createSale.url = data.url;
      createSale.startTimeUNIX = data.dateSale.begin.getTime();
      createSale.endTimeUNIX = data.dateSale.end.getTime();
      createSale.productsIds = this.product.productId;
      console.log(createSale);
      
    this._http.postContent(`${PROD_URL}/sale/`, createSale).subscribe();
    this.product.plusminusProd = false;
  }
  optionSaleSelected(event: MatAutocompleteSelectedEvent) {
    console.log(event.option.value);
    this.product.productMassInSale.push(event.option.value);
    console.log(this.product.productMassInSale);
    this.product.getProductInSale();
  }

  productAllFilter() {
    this.product.productMassInSale = [];
    this.product.productMassInSale = this.product.selectSale.productsIds.map((e) => { return this.product.allProducts.find((a) => { return a.id == e})})
    
    console.log(this.product.productMassInSale);
  }

  filterCRM() {
    console.log(this.product.allProducts);
    this.formGroup.controls.nameCRM.setValue(this.product.selectCMS);
    this.filteredOptionsCRM = this.formGroup.controls.nameCRM.valueChanges
    .pipe(
      startWith<string | Product>(''),
      map(value => typeof value === 'string' ? value : value.name),
      map(name => name ? this._filterCRM(name) : this.product.allProducts.slice())
    );
  }
  private _filterCRM(name: string): Product[] {
    const filterValueCRM = name.toLowerCase();

    return this.product.allProducts.filter(option => option.name.toLowerCase().indexOf(filterValueCRM) === 0);
  }
  deleteProductSale(id) {
    console.log(id);
    this.product.delProductInSale(id);
    this.product.getProductInSale();
    console.log(this.product.productMassInSale);
  }
  getFormContact() {
    this.productform = new FormGroup({
      newNameCMS: new FormControl(''),
      newNameERP: new FormControl(''),
      newNameERPDescription: new FormControl('')
    });
  }

  getERP() {
    this.product.getProductERP();
  }

  onNoClick(){
    this.product.plusminusProd = false;
    this.dialogRef.close();
  }

  sendNewProduct = new ProductDTO();
  prodinfomass: ProductsAdd[] = [];
  prodinfo = new ProductsAdd();
  onSubmit(productform: FormGroup) {
    console.log(productform);
    if(this.product.SZR == true) {
      this.sendNewProduct.productType = "FERTILIZER";
      console.log(this.sendNewProduct);
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

    console.log(this.sendNewProduct);
    
    this._http.postContent(`${PROD_URL}/crmproduct`, this.sendNewProduct).subscribe()
  }



  onSelectionChanged(event: MatAutocompleteSelectedEvent) {
    this.product.descriptionList = [];
    if(event.option.value.descriptions.length == 0) {
      this.product.ShowDescription = false;
      console.log(this.product.ShowDescription);
      this.productform.controls.newNameERPDescription.setValidators([Validators.nullValidator]);
      this.productform.controls.newNameERPDescription.updateValueAndValidity();
    } else if(event.option.value.descriptions.length > 0) {
      console.log(this.product.ShowDescription);
      console.log(event.option.value.descriptions);
      this.productform.controls.newNameERPDescription.setValidators([Validators.required]);
      this.productform.controls.newNameERPDescription.updateValueAndValidity();
      event.option.value.descriptions.forEach(element => {
        if(element.alreadyUsed == false) {
          console.log('hi mf');
          this.product.ShowDescription = true;
          this.product.descriptionList.push(element);
          this.filterERPDescriptuion();
          this.newDisplayDesc();
        }
      });

      console.log(this.product.descriptionList);
    }
  }

  onSelectionDesc(event: MatAutocompleteSelectedEvent) {
    console.log(event.option.value);
    this.prodinfo.idERPDescription = event.option.value.erpDescriptionId;
  }



  filterERP() {
    console.log(this.product.productListERP);
    this.filteredOptionsERP = this.productform.controls.newNameERP.valueChanges
    .pipe(
      startWith<string | ProductERP>(''),
      map(value => typeof value === 'string' ? value : value.name),
      map(name => name ? this._filterERP(name) : this.product.productListERP.slice())
    );
  }

  filterERPDescriptuion() {
    console.log(this.product.descriptionList);
    this.filteredOptionsDescription = this.productform.controls.newNameERPDescription.valueChanges
    .pipe(
      startWith<string | Descriptions>(''),
      map(value => typeof value === 'string' ? value : value.description),
      map(description => description ? this._filterERPDescription(description) : this.product.descriptionList.slice())
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

    return this.data.product.filter(option => option.name.toLowerCase().includes(filterValueCMS));
  }
  newDisplayFnERP(product?: ProductERP): string | undefined {
      return product ? product.name : undefined;
  }

  private _filterERP(name: string): ProductERP[] {
    const filterValueERP = name.toLowerCase();

    return this.product.productListERP.filter(option => option.name.toLowerCase().includes(filterValueERP));
  }

  newDisplayDesc(desc?: Descriptions): string | undefined {
    return desc ? desc.description : undefined;
  }

  private _filterERPDescription(desc: string): Descriptions[] {
    const filterValueERPDescription = desc.toLowerCase();

    return this.product.descriptionList.filter(option => option.description.toLowerCase().includes(filterValueERPDescription));
  }

}
