import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../../../services/http.service';
import { SidenavService } from '../../../../services/sidenav.service';
import { ProductService } from '../../product.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import { SaleDTO } from '../../../../../models/saleDTO';
import { PROD_URL } from '../../../../../siteurl/siteurl';
import { MatAutocompleteSelectedEvent } from '@angular/material';
import { Product } from '../../../../../models/product';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { SalesComponent } from '../sales.component';

@Component({
  selector: 'app-sale-preview',
  templateUrl: './sale-preview.component.html',
  styleUrls: ['./sale-preview.component.css']
})
export class SalePreviewComponent implements OnInit {

  constructor(private saleupd: SalesComponent, private _http: HttpService, private sidenavService: SidenavService, private product: ProductService, private _router: Router) { }

  ngOnInit() {
    this.salesForm();
  }

  filteredOptionsCRM: Observable<Product[]>;
  formGroupSales: FormGroup;
  disable: boolean = true;


  close() {
    this.product.plusminusProd = false;
    this.sidenavService.close();
    this.formGroupSales.disable();
    this.disable = true;
    this.product.plusminusProd = true;
    this.product.productMassInSale = [];
    this.saleupd.getSales();
    this.sidenavService.sidenavWidth = 220;
    this.sidenavService.padding = 0;
  }

  disabled() {
    this.formGroupSales.disable();
    this.disable = true;
    this.product.plusminusProd = true;
  }

  enabled() {
    this.formGroupSales.enable();
    this.disable = false;
    this.product.plusminusProd = true;
  }

  getSale() {
    this.formGroupSales.disable();
    this.disable = true;
    this.product.plusminusProd = true;
    console.log(this.product.selectSale);
    console.log(this.product.allProducts);
    this.setSale();
    this.filterCRM();
    this.sidenavService.close();
  }

  setSale() {
    console.log(this.product.selectSale);
    this.formGroupSales.controls.topic.setValue(this.product.selectSale.topic);
    this.formGroupSales.controls.dateSale.setValue({ begin: new Date(this.product.selectSale.startTimeUNIX), end: new Date(this.product.selectSale.endTimeUNIX) });
    this.formGroupSales.controls.description.setValue(this.product.selectSale.description);
    this.formGroupSales.controls.url.setValue(this.product.selectSale.url);
    this.productAllFilter();
  }

  optionSaleSelected(event: MatAutocompleteSelectedEvent) {
    console.log(event.option.value);
    this.product.productMassInSale.push(event.option.value);
    this.product.productMassInSale.forEach(regionsel => {
      this.product.listAllProduct.forEach((allreg, i) => {
        if(regionsel.id === allreg.id) {
          this.product.listAllProduct.splice(i, 1);
        }
      })
    });
    this.formGroupSales.controls.nameCRM.setValue('');
    console.log(this.product.productMassInSale);
    this.product.getProductInSale();
  }

  productAllFilter() {
    this.product.getAllProducts();
    this.product.productMassInSale = [];
    this.product.listAllProduct = [];
    this.product.listAllProduct = this.product.allProducts;
    this.product.productMassInSale = this.product.selectSale.productsIds.map((e) => { return this.product.allProducts.find((a) => { return a.id == e})});
    this.product.selectSale.productsIds.forEach(prodid => {
      this.product.allProducts.forEach((allprod, i) => {
        if(prodid === allprod.id) {
          this.product.listAllProduct.splice(i, 1);
        }
      })
    });
  }

  filterCRM() {
    // console.log(this.product.allProducts);
    this.formGroupSales.controls.nameCRM.setValue('');
    this.filteredOptionsCRM = this.formGroupSales.controls.nameCRM.valueChanges
    .pipe(
      startWith<string | Product>(''),
      map(value => typeof value === 'string' ? value : value.name),
      map(name => name ? this._filterCRM(name) : this.product.listAllProduct.slice())
    );
  }

  displayFnCRM(product?: Product): string | undefined {
    return product ? product.name : undefined;
  }

  private _filterCRM(name: string): Product[] {
    const filterValueCRM = name.toLowerCase();

    return this.product.listAllProduct.filter(option => option.name.toLowerCase().includes(filterValueCRM));
  }

  salesForm(){
    this.formGroupSales = new FormGroup({
      topic: new FormControl({value: '', disabled: true}),
      dateSale: new FormControl({value: '', disabled: true}),
      description: new FormControl({value: '', disabled: true}),
      url: new FormControl({value: '', disabled: true}),
      nameCRM: new FormControl({value: '', disabled: true})
    });
  }

  changeSaleActivity(element) {
    console.log(element);
    let sale = new SaleDTO();
    sale.id = element.id;
    sale.blocked = element.blocked;
    // const isActive = element.active;
    this._http.putContent(`${PROD_URL}/sale/${sale.id}/block?is_blocked=${sale.blocked}`, null)
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

  previewSubmitSale(data) {
    console.log(data);
    let updateSale = new SaleDTO();
    if(this.product.productMassInSale != []){
      console.log(this.product.productMassInSale);
      this.product.productId = [];
      this.product.productMassInSale.forEach(element => {
        this.product.productId.push(element.id);
      });
      updateSale.id = this.product.selectSale.id;
      updateSale.topic = data.topic;
      updateSale.description = data.description;
      updateSale.url = data.url;
      updateSale.startTimeUNIX = data.dateSale.begin.getTime();
      updateSale.endTimeUNIX = data.dateSale.end.getTime();
      updateSale.productsIds = this.product.productId;
      console.log(updateSale);
    } else {
      console.log(this.product.productMassInSale);
      updateSale.id = this.product.selectSale.id;
      updateSale.topic = data.topic;
      updateSale.description = data.description;
      updateSale.url = data.url;
      updateSale.startTimeUNIX = data.startTimeUNIX;
      updateSale.endTimeUNIX = data.endTimeUNIX;
      updateSale.productsIds = this.product.selectSale.productsIds;
      console.log(updateSale);
    }
    
    this._http.putContent(`${PROD_URL}/sale/${updateSale.id}`, updateSale).subscribe(data => {
      this.saleupd.getSales();
    });
    this.sidenavService.close();
    this.sidenavService.sidenavWidth = 220;
    this.sidenavService.padding = 0;
    
  }

  deleteProductSale(product) {
    this.product.delProductInSale(product.id);
    this._http.deleteContent(`${PROD_URL}/sale/${product.id}`);
    this.product.listAllProduct.push(product);
    this.filterCRM();
  }

  goToProduct(product) {
    console.log(product);
    this.disable = true;
    this.product.plusminusProd = true;
    this.sidenavService.close();

    this.sidenavService.sidenavWidth = 220;
    this.sidenavService.padding = 0;
    setTimeout(() => {
      this.product.teleportBool = true;
      if(product.productType === "FERTILIZER") {
        console.log('hi szr');
        this.product.selectProductSzr = product;
        this._router.navigate(['/dashbroad/products/szr']);
      } else if(product.productType === "HYBRID") {
        console.log('hi seeds');
        this.product.selectProductSeed = product;
        this._router.navigate(['/dashbroad/products/seeds']);
      }
    }, 400);
  }

}
