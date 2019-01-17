import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../../../services/http.service';
import { SidenavService } from '../../../../services/sidenav.service';
import { ProductService } from '../../product.service';
import { Router } from '@angular/router';
import { MessageService } from '../../../messages/message.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { SaleDTO } from '../../../../../models/saleDTO';
import { ProductsAdd } from '../../../../../models/productsAdd';
import { Observable } from 'rxjs';
import { ProductERP } from '../../../../../models/productERP';
import { ProductCMS } from '../../../../../models/productCMS';
import { Product } from '../../../../../models/product';
import { PROD_URL } from '../../../../../siteurl/siteurl';
import { startWith, map } from 'rxjs/operators';
import { SzrComponent } from '../szr.component';
import { ReviewService } from '../../../reviews/review.service';

@Component({
  selector: 'app-szr-preview',
  templateUrl: './szr-preview.component.html',
  styleUrls: ['./szr-preview.component.css']
})
export class SzrPreviewComponent implements OnInit {

  constructor(private reviewServ: ReviewService, private szrupd: SzrComponent, private _http: HttpService, private sidenavService: SidenavService, private product: ProductService, private _router: Router, private sendId: MessageService) { 
  }

  disable: boolean = true;
  formGroupSZR: FormGroup;
  saleProductList: SaleDTO[] = [];
  filteredOptionsERP: Observable<ProductERP[]>;
  filteredOptionsCMS: Observable<ProductCMS[]>;

  ngOnInit() {
    this.SZRForm();
    if(this.product.teleportBool === true) {
      setTimeout(() => {
        this.setSZR();
        this.getFilter();
      }, 1000);
    }
  }


  prodPreviewmass: ProductsAdd[] = [];
  prodpreview = new ProductsAdd();

  close() {
    this.product.plusminusProd = false;
    this.sidenavService.close();
    this.formGroupSZR.disable();
    this.disable = true;
    this.product.plusminusProd = true;
    this.szrupd.getSZR();
    this.szrupd.getSZRAll();
    this.sidenavService.sidenavWidth = 220;
    this.sidenavService.padding = 0;
  }

  disabled() {
      this.formGroupSZR.disable();
      this.disable = true;
      this.product.plusminusProd = true;
  }

  enabled() {
      this.formGroupSZR.enable();
      this.disable = false;
      this.product.plusminusProd = true;
  }

  getFilter() {
    console.log(this.product.selectCMS);
    this.setSZR();
    this.formGroupSZR.disable();
    this.product.plusminusProd = true;
    this.disable = true;
    
    this.filterSZRERP();
    this.filterSZRCMS();
    this.sidenavService.close();
    // this.productsCMS = this.productsCMSold.filter(data => {data.fertilizerGroup.name === this.product.selectProductSzr.fertilizerGroup.name})
    this.saleListinProduct();
  }


  filterSZRERP() {
    // console.log(this.product.productListERP);
    this.formGroupSZR.controls.nameSZRERP.setValue('');
    if(this.formGroupSZR.controls.nameSZRERP.value == '') {
      this.formGroupSZR.controls.nameSZRERP.setValue(this.product.selectProductSzr);
      this.filteredOptionsERP = this.formGroupSZR.controls.nameSZRERP.valueChanges
      .pipe(
        startWith<string | Product>(''),
        map(value => typeof value === 'string' ? value : value.name),
        map(name => name ? this._filterERP(name) : this.product.productListERP.slice())
      );
    }
  }

  filterSZRCMS() {
    // console.log(this.product.productListCMS);
    this.formGroupSZR.controls.nameSZRCMS.setValue('');
    if(this.formGroupSZR.controls.nameSZRCMS.value == '') {
      this.formGroupSZR.controls.nameSZRCMS.setValue(this.product.selectCMS);
      this.filteredOptionsCMS = this.formGroupSZR.controls.nameSZRCMS.valueChanges
      .pipe(
        startWith<string | Product>(''),
        map(value => typeof value === 'string' ? value : value.name),
        map(name => name ? this._filterCMS(name) : this.product.productListCMS.slice())
      );
    }
  }

  displayFnCMS(product?: Product): string | undefined {
    return product ? product.name : undefined;
  }

  private _filterCMS(name: string): ProductCMS[] {
    const filterValueCMS = name.toLowerCase();

    return this.product.productListCMS.filter(option => option.name.toLowerCase().includes(filterValueCMS));
  }
  displayFnERP(product?: Product): string | undefined {
    return product ? product.name : undefined;
  }

  private _filterERP(name: string): ProductERP[] {
    const filterValueERP = name.toLowerCase();

    return this.product.productListERP.filter(option => option.name.toLowerCase().includes(filterValueERP));
  }

  sameSale = [];
  saleListinProduct() {
    // console.log(this.product.selectProductSzr.products[0]);
    this.sameSale = [];
      this.product.selectProductSzr.products.forEach(prod => {
        prod.sales.forEach(sale => {
          this.sameSale.push(sale);
      });
    });
  }


  previewSubmitSZR(formGroupSeed) {
    console.log(formGroupSeed.nameSZRCMS);
    console.log(formGroupSeed.nameSZRERP);
    this.prodPreviewmass = [];

    this.prodpreview.idCMS = formGroupSeed.nameSZRCMS.id;
    this.prodpreview.idCRM = this.product.selectProductSzr.id;

    if(!formGroupSeed.nameSZRERP.products) {
      this.prodpreview.idERP = formGroupSeed.nameSZRERP.erpId;
      this.prodPreviewmass.push(this.prodpreview);
    } else {
      this.product.selectProductSzr.products.forEach(product => {
        this.prodpreview.idERP = product.idERP;
      });
      this.prodPreviewmass.push(this.prodpreview);
    }


    console.log(this.prodPreviewmass);
    this._http.putContent(`${PROD_URL}/product/${this.product.selectProductSzr.id}`, this.prodPreviewmass[0]).subscribe(data => {
      this.szrupd.getSZR();
      this.szrupd.getSZRAll();
    });
    
    // if(formGroupSeed.nameSZRCMS.valid != false && formGroupSeed.nameSZRERP.valid != false){
      this.sidenavService.close();
      this.sidenavService.sidenavWidth = 220;
      this.sidenavService.padding = 0;
    // }
  }

  SZRForm() {
    this.formGroupSZR = new FormGroup({
      nameSZRCMS: new FormControl({value: '', disabled: true}, [Validators.required]),
      nameSZRERP: new FormControl({value: '', disabled: true}, [Validators.required])
    })
  }

  setSZR() {
    this.formGroupSZR.controls.nameSZRCMS.setValue(this.product.selectCMS.name);
    this.formGroupSZR.controls.nameSZRERP.setValue(this.product.selectProductSzr.name);
  }

  changeActivitySZR(element) {
    console.log(element);
    let prod = new Product();
    prod.id = element.id;
    prod.active = element.active;
    // const isActive = element.active;
    this._http.putContent(`${PROD_URL}/crmproduct/${prod.id}/active?is_active=${prod.active}`, null)
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
  goToReview(prodId: number) {
    this.disable = true;
    this.product.plusminusProd = true;
    this.reviewServ.id = prodId;
    this.reviewServ.sendDataId();
    this.sidenavService.sidenavWidth = 220;
    this.sidenavService.padding = 0;
    this.sidenavService.close();
    setTimeout(() => {
      this._router.navigate(['/dashbroad/reviews/product-reviews/szr-reviews']);
    }, 400);
  }

}
