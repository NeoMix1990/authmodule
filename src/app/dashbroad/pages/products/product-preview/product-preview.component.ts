import { Component, OnInit, Input } from '@angular/core';
import { ProductService } from '../product.service';
import { SidenavService } from '../../../services/sidenav.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Product } from '../../../../models/product';
import { PROD_URL } from '../../../../siteurl/siteurl';
import { HttpService } from '../../../services/http.service';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { ProductERP } from '../../../../models/productERP';
import { ProductsAdd } from '../../../../models/productsAdd';
import { ProductDTO } from '../../../../models/productDTO';
import { ProductCMS } from '../../../../models/productCMS';
import { SaleDTO } from '../../../../models/saleDTO';
import { SatDatepickerRangeValue } from 'saturn-datepicker/datepicker';
import { ElementInstructionMap } from '@angular/animations/browser/src/dsl/element_instruction_map';
import { MatAutocompleteSelectedEvent } from '@angular/material';

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
  formGroup: FormGroup;
  saleProductList: SaleDTO[] = [];
  filteredOptionsERP: Observable<ProductERP[]>;
  filteredOptionsCMS: Observable<ProductCMS[]>;
  filteredOptionsCRM: Observable<Product[]>;

  startDate;
  endDate;
  ngOnInit() {
    this.salesForm();
  }
  
  close() {
    this.product.plusminusProd = false;
    this.sidenavService.close();

    this.sidenavService.sidenavWidth = 190;
  }

  prodPreviewmass: ProductsAdd[] = [];
  prodpreview = new ProductsAdd();

  previewSubmitSZR(nameSZRCMS, nameSZRERP) {
    console.log(nameSZRCMS);
    console.log(nameSZRERP);
    this.prodPreviewmass = [];

    this.prodpreview.idCMS = nameSZRCMS.id;
    this.prodpreview.idCRM = this.product.selectProductSzr.id;
    this.prodpreview.idERP = nameSZRERP.erpId;
    this.prodPreviewmass.push(this.prodpreview);


    this._http.putContent(PROD_URL + '/product/'+ this.product.selectProductSzr.id, this.prodPreviewmass[0]).subscribe(data => console.log(data));
      console.log(this.prodPreviewmass);
    
    if(nameSZRCMS.valid != false && nameSZRERP.valid != false){
      this.sidenavService.close();
      this.sidenavService.sidenavWidth = 190;
    }
    this.product.getSzr();
  }

  previewSubmitSeed(nameSeedCMS, nameSeedERP) {
    console.log(nameSeedCMS);
    console.log(nameSeedERP);
    this.prodPreviewmass = [];
    this.prodpreview.idCMS = nameSeedCMS.id;
    this.prodpreview.idCRM = this.product.selectProductSeed.id;
    this.prodpreview.idERP = nameSeedERP.erpId;
    this.prodPreviewmass.push(this.prodpreview);

    this._http.putContent(PROD_URL + '/product/'+ this.product.selectProductSeed.id, this.prodPreviewmass[0]).subscribe(data => console.log(data));
      console.log(this.prodPreviewmass);
    // if(nameSeedCMS.valid != false && nameSeedERP.valid != false){
      this.sidenavService.close();
      this.sidenavService.sidenavWidth = 190;
    // }
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
    
    this._http.putContent(PROD_URL + '/sale/' + updateSale.id, updateSale).subscribe();
    this.sidenavService.close();
    this.sidenavService.sidenavWidth = 190;
    
  }

  deleteProductSzr(id: number) {
		console.log(id);
    this.product.delProduct(this.product.selectProductSzr.id);
    this.sidenavService.close();
  }

  displayFnCMS(product?: Product): string | undefined {
    return product ? product.name : undefined;
  }

  private _filterCMS(name: string): ProductCMS[] {
    const filterValueCMS = name.toLowerCase();

    return this.product.productListCMS.filter(option => option.name.toLowerCase().indexOf(filterValueCMS) === 0);
  }
  displayFnERP(product?: Product): string | undefined {
    return product ? product.name : undefined;
  }

  private _filterERP(name: string): ProductERP[] {
    const filterValueERP = name.toLowerCase();

    return this.product.productListERP.filter(option => option.name.toLowerCase().indexOf(filterValueERP) === 0);
  }

  displayFnCRM(product?: Product): string | undefined {
    return product ? product.name : undefined;
  }

  private _filterCRM(name: string): Product[] {
    const filterValueCRM = name.toLowerCase();

    return this.product.allProducts.filter(option => option.name.toLowerCase().indexOf(filterValueCRM) === 0);
  }

  getFilter() {
    console.log(this.product.productListCMS);
    if(this.product.SZR == true) {
      this.filterSZRERP();
      this.filterSZRCMS();
    } else if(this.product.Seed == true){
      this.filterSeedERP();
      this.filterSeedCMS();
    }
    this.sidenavService.close();
    // this.productsCMS = this.productsCMSold.filter(data => {data.fertilizerGroup.name === this.product.selectProductSzr.fertilizerGroup.name})
      
  }
  getSale() {
    console.log(this.product.selectSale);
    console.log(this.product.allProducts);
    this.setSale();
    this.filterCRM();
    this.sidenavService.close();
  }
  
  setSale() {
    console.log(this.product.selectSale);
    this.formGroup.controls.topic.setValue(this.product.selectSale.topic);
    this.formGroup.controls.dateSale.setValue({ begin: new Date(this.product.selectSale.startTimeUNIX), end: new Date(this.product.selectSale.endTimeUNIX) });
    this.formGroup.controls.description.setValue(this.product.selectSale.description);
    this.formGroup.controls.url.setValue(this.product.selectSale.url);
    this.productAllFilter();
  }

  deleteProductSale(id) {
    console.log(id);
    this.product.delProductInSale(id);
    this.product.getProductInSale();
    console.log(this.product.productMassInSale);
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

  salesForm(){
    this.formGroup = new FormGroup({
      topic: new FormControl(''),
      dateSale: new FormControl(''),
      description: new FormControl(''),
      url: new FormControl(''),
      nameCRM: new FormControl('')
    });
  }

  filterCRM() {
    console.log(this.product.allProducts);
    this.formGroup.controls.nameCRM.setValue(this.product.selectERP);
    this.filteredOptionsCRM = this.formGroup.controls.nameCRM.valueChanges
    .pipe(
      startWith<string | Product>(''),
      map(value => typeof value === 'string' ? value : value.name),
      map(name => name ? this._filterCRM(name) : this.product.allProducts.slice())
    );
  }

  filterSZRERP() {
    console.log(this.product.productListERP);
    this.nameSZRERP.setValue('');
    if(this.nameSZRERP.value == '') {
      this.nameSZRERP.setValue(this.product.selectERP);
      this.filteredOptionsERP = this.nameSZRERP.valueChanges
      .pipe(
        startWith<string | Product>(''),
        map(value => typeof value === 'string' ? value : value.name),
        map(name => name ? this._filterERP(name) : this.product.productListERP.slice())
      );
    }
  }

  filterSZRCMS() {
    console.log(this.product.productListCMS);
    this.nameSZRCMS.setValue('');
    if(this.nameSZRCMS.value == '') {
      this.nameSZRCMS.setValue(this.product.selectProductSzr);
      this.filteredOptionsCMS = this.nameSZRCMS.valueChanges
      .pipe(
        startWith<string | Product>(''),
        map(value => typeof value === 'string' ? value : value.name),
        map(name => name ? this._filterCMS(name) : this.product.productListCMS.slice())
      );

    }
  }
  filterSeedERP() {
    console.log(this.product.productListERP);
    this.nameSeedERP.setValue('');
    if(this.nameSeedERP.value == '') {
      this.nameSeedERP.setValue(this.product.selectERP);
      this.filteredOptionsERP = this.nameSeedERP.valueChanges
      .pipe(
        startWith<string | Product>(''),
        map(value => typeof value === 'string' ? value : value.name),
        map(name => name ? this._filterERP(name) : this.product.productListERP.slice())
      );
    }
  }

  filterSeedCMS() {
    console.log(this.product.productListCMS);
    this.nameSeedCMS.setValue('');
    if(this.nameSeedCMS.value == '') {
      this.nameSeedCMS.setValue(this.product.selectProductSeed);
      this.filteredOptionsCMS = this.nameSeedCMS.valueChanges
      .pipe(
        startWith<string | Product>(''),
        map(value => typeof value === 'string' ? value : value.name),
        map(name => name ? this._filterCMS(name) : this.product.productListCMS.slice())
      );
    }
  }

  changeActivity(element) {
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
  changeSaleActivity(element) {
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
