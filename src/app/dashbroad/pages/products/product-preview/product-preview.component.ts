import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { SidenavService } from '../../../services/sidenav.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Product } from '../../../../models/product';
import { PROD_URL } from '../../../../siteurl/siteurl';
import { HttpService } from '../../../services/http.service';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';

@Component({
  selector: 'app-product-preview',
  templateUrl: './product-preview.component.html',
  styleUrls: ['./product-preview.component.css']
})
export class ProductPreviewComponent implements OnInit {

  
  constructor(private _http: HttpService, private sidenavService: SidenavService, private product: ProductService) { }
  nameSZRCMS = new FormControl('', [Validators.required]);
  nameSZRERP = new FormControl('', [Validators.required]);
  nameSeedCMS = new FormControl('', [Validators.required]);
  nameSeedERP = new FormControl('', [Validators.required]);
  filteredOptionsERP: Observable<Product[]>;
  filteredOptionsCMS: Observable<Product[]>;
  ngOnInit() {
  }
  
  close() {
    this.sidenavService.close();
  }

  previewSubmitSZR(nameSZRCMS, nameSZRERP) {
    console.log(nameSZRCMS);
    console.log(nameSZRERP);
    if(nameSZRCMS.valid != false && nameSZRERP.valid != false){
      this.sidenavService.close();
    }
  }
  previewSubmitSeed(nameSeedCMS, nameSeedERP) {
    console.log(nameSeedCMS);
    console.log(nameSeedERP);
    if(nameSeedCMS.valid != false && nameSeedERP.valid != false){
      this.sidenavService.close();
    }
  }
  deleteProductSzr(id: number) {
		console.log(id);
    this.product.delProduct(this.product.selectProductSzr.id);
    this.sidenavService.close();
  }

  displayFnCMS(product?: Product): string | undefined {
    return product ? product.name : undefined;
  }

  private _filterCMS(name: string): Product[] {
    const filterValueCMS = name.toLowerCase();

    return this.product.productListCMS.filter(option => option.name.toLowerCase().indexOf(filterValueCMS) === 0);
  }
  displayFnERP(product?: Product): string | undefined {
    return product ? product.name : undefined;
  }

  private _filterERP(name: string): Product[] {
    const filterValueERP = name.toLowerCase();

    return this.product.productListERP.filter(option => option.name.toLowerCase().indexOf(filterValueERP) === 0);
  }


  getFilter() {
      this.getProductERP();
      console.log(this.product.productListCMS);
      if(this.product.SZR == true) {
        this.previewSubmitSZR(this.product.selectProductSzr,this.product.selectProductSzr);
        this.nameSZRCMS.setValue(this.product.selectProductSzr.name); 
        this.nameSZRERP.setValue(this.product.selectProductSzr.name); 
        this.filterSZRERP();
        this.filterSZRCMS();
      } else if(this.product.Seed == true){
        this.nameSeedCMS.setValue(this.product.selectProductSeed.name);
        this.nameSeedERP.setValue(this.product.selectProductSeed.name);
        this.previewSubmitSeed(this.product.selectProductSeed, this.product.selectProductSeed);
        this.filterSeedERP();
        this.filterSeedCMS();
      }

      // this.productsCMS = this.productsCMSold.filter(data => {data.fertilizerGroup.name === this.product.selectProductSzr.fertilizerGroup.name})
      
  }

  getProductERP() {
    this._http.getContent(PROD_URL + '/crmproduct/erp/all').subscribe(dataCMS => {
      this.product.productListERP = Object(dataCMS);
      console.log(this.product.productListERP);
    });
  }

  filterSZRERP() {
    console.log(this.product.productListERP);
      this.filteredOptionsERP = this.nameSZRERP.valueChanges
      .pipe(
        startWith<string | Product>(''),
        map(value => typeof value === 'string' ? value : value.name),
        map(name => name ? this._filterERP(name) : this.product.productListERP.slice())
      );
  }

  filterSZRCMS() {
    console.log(this.product.productListCMS);
      this.filteredOptionsCMS = this.nameSZRCMS.valueChanges
      .pipe(
        startWith<string | Product>(''),
        map(value => typeof value === 'string' ? value : value.name),
        map(name => name ? this._filterCMS(name) : this.product.productListCMS.slice())
      );
  }
  filterSeedERP() {
    console.log(this.product.productListERP);
      this.filteredOptionsERP = this.nameSeedERP.valueChanges
      .pipe(
        startWith<string | Product>(''),
        map(value => typeof value === 'string' ? value : value.name),
        map(name => name ? this._filterERP(name) : this.product.productListERP.slice())
      );
  }

  filterSeedCMS() {
    console.log(this.product.productListCMS);
      this.filteredOptionsCMS = this.nameSeedCMS.valueChanges
      .pipe(
        startWith<string | Product>(''),
        map(value => typeof value === 'string' ? value : value.name),
        map(name => name ? this._filterCMS(name) : this.product.productListCMS.slice())
      );
  }

  changeSzrActivity(element) {
    console.log(element);
    let prod = new Product();
    prod.id = element.selectProductSzr.id;
    prod.active = element.active;
    // const isActive = element.active;
    this._http.putContent(PROD_URL + '/crmproduct/' + prod.id + '/active?is_active=' + prod.active, null)
        .subscribe(() => {
            // this.successMessage = 'Активность пользователя успешно изменена';
            // this.showSuccess();
        },
        // error => {
        //     this.initUsers();
        //     this.checkError(error)
      // }
    );
  }
}
