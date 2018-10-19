import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { SidenavService } from '../../../services/sidenav.service';
import { FormGroup, FormControl } from '@angular/forms';
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
  nameCMS = new FormControl();
  nameERP = new FormControl();
  filteredOptionsERP: Observable<Product[]>;
  filteredOptionsCMS: Observable<Product[]>;
  ngOnInit() {
  }
  
  close() {
    this.sidenavService.close();
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
      this.filterERP();
      this.filterCMS();

      // this.productsCMS = this.productsCMSold.filter(data => {data.fertilizerGroup.name === this.product.selectProductSzr.fertilizerGroup.name})
      
  }

  getProductERP() {
    this._http.getContent(PROD_URL + '/crmproduct/erp/all').subscribe(dataCMS => {
      this.product.productListERP = Object(dataCMS);
      console.log(this.product.productListERP);
    });
  }

  filterERP() {
    console.log(this.product.productListERP);
      this.filteredOptionsERP = this.nameERP.valueChanges
      .pipe(
        startWith<string | Product>(''),
        map(value => typeof value === 'string' ? value : value.name),
        map(name => name ? this._filterERP(name) : this.product.productListERP.slice())
      );
  }

  filterCMS() {
    console.log(this.product.productListCMS);
      this.filteredOptionsCMS = this.nameCMS.valueChanges
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
