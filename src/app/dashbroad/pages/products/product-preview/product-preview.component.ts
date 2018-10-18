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

  productsCMSold: Product[] = [];
  constructor(private _http: HttpService, private sidenavService: SidenavService, private product: ProductService) { }
  productsCMS: Product[] = [];
  nameCMS = new FormControl();
  filteredOptions: Observable<Product[]>;
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

  displayFn(product?: Product): string | undefined {
    return product ? product.name : undefined;
  }

  private _filter(name: string): Product[] {
    const filterValue = name.toLowerCase();

    return this.productsCMS.filter(option => option.name.toLowerCase().indexOf(filterValue) === 0);
  }


  getProductInCMS() {
    this._http.getContent(PROD_URL + '/crmproduct/all').subscribe(data => {
      Object(data).forEach(element => {
        console.log(element);
        if (element.fertilizerGroup === null) {
          return;
        } else if(this.product.selectProductSzr.fertilizerGroup.name === element.fertilizerGroup.name) {
          this.productsCMS.push(element);
        }
      });
      // this.productsCMS = this.productsCMSold.filter(data => {data.fertilizerGroup.name === this.product.selectProductSzr.fertilizerGroup.name})
      console.log(this.productsCMS);
      this.filteredOptions = this.nameCMS.valueChanges
      .pipe(
        startWith<string | Product>(''),
        map(value => typeof value === 'string' ? value : value.name),
        map(name => name ? this._filter(name) : this.productsCMS.slice())
      );
    });
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
