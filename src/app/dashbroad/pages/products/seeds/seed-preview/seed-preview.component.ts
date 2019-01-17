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
import { SeedsComponent } from '../seeds.component';
import { ReviewService } from '../../../reviews/review.service';

@Component({
  selector: 'app-seed-preview',
  templateUrl: './seed-preview.component.html',
  styleUrls: ['./seed-preview.component.css']
})
export class SeedPreviewComponent implements OnInit {

  constructor(private reviewServ: ReviewService,private seedupd: SeedsComponent, private _http: HttpService, private sidenavService: SidenavService, private product: ProductService, private _router: Router) { }

  disable: boolean = true;
  formGroupSeed: FormGroup;
  saleProductList: SaleDTO[] = [];
  filteredOptionsERP: Observable<ProductERP[]>;
  filteredOptionsCMS: Observable<ProductCMS[]>;

  ngOnInit() {
    this.SeedForm();
    if(this.product.teleportBool === true) {
      setTimeout(() => {
        this.setSeed();
        this.getFilter();
      }, 1000);
    }
  }


  prodPreviewmass: ProductsAdd[] = [];
  prodpreview = new ProductsAdd();

  close() {
    this.product.plusminusProd = false;
    this.sidenavService.close();
    this.formGroupSeed.disable();
    this.disable = true;
    this.product.plusminusProd = true;
    this.seedupd.getSeeds();
    this.seedupd.getSeedsAll();
    this.sidenavService.sidenavWidth = 220;
    this.sidenavService.padding = 0;
  }

  disabled() {
      this.formGroupSeed.disable();
      this.disable = true;
      this.product.plusminusProd = true;
  }

  enabled() {
      this.formGroupSeed.enable();
      this.disable = false;
      this.product.plusminusProd = true;
  }

  getFilter() {
    console.log(this.product.selectCMS);
    this.setSeed();
    this.formGroupSeed.disable();
    this.product.plusminusProd = true;
    this.disable = true;
    // console.log(this.product.productListCMS);
    this.filterSeedERP();
    this.filterSeedCMS();
    this.sidenavService.close();
    // this.productsCMS = this.productsCMSold.filter(data => {data.fertilizerGroup.name === this.product.selectProductSzr.fertilizerGroup.name})
    this.saleListinProduct();
  }

  displayFnCMS(product?: Product): string | undefined {
    return product ? product.name : undefined;
  }

  filterSeedERP() {
    // console.log(this.product.productListERP);
    this.formGroupSeed.controls.nameSeedERP.setValue('');
    if(this.formGroupSeed.controls.nameSeedERP.value == '') {
      this.formGroupSeed.controls.nameSeedERP.setValue(this.product.selectProductSeed);
      this.filteredOptionsERP = this.formGroupSeed.controls.nameSeedERP.valueChanges
      .pipe(
        startWith<string | Product>(''),
        map(value => typeof value === 'string' ? value : value.name),
        map(name => name ? this._filterERP(name) : this.product.productListERP.slice())
      );
    }
  }

  filterSeedCMS() {
    // console.log(this.product.productListCMS);
    this.formGroupSeed.controls.nameSeedCMS.setValue('');
    if(this.formGroupSeed.controls.nameSeedCMS.value == '') {
      this.formGroupSeed.controls.nameSeedCMS.setValue(this.product.selectCMS);
      this.filteredOptionsCMS = this.formGroupSeed.controls.nameSeedCMS.valueChanges
      .pipe(
        startWith<string | Product>(''),
        map(value => typeof value === 'string' ? value : value.name),
        map(name => name ? this._filterCMS(name) : this.product.productListCMS.slice())
      );
    }
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
    this.product.selectProductSeed.products.forEach(prod => {
      prod.sales.forEach(sale => {
        this.sameSale.push(sale);
      });
    });
  }

  previewSubmitSeed(formGroupSeed) {
    console.log(formGroupSeed.nameSeedCMS);
    console.log(formGroupSeed.nameSeedERP);
    this.prodPreviewmass = [];
    this.prodpreview.idCMS = formGroupSeed.nameSeedCMS.id;
    this.prodpreview.idCRM = this.product.selectProductSeed.id;

    if(!formGroupSeed.nameSeedERP.products) {
      this.prodpreview.idERP = formGroupSeed.nameSeedERP.erpId;
      this.prodPreviewmass.push(this.prodpreview);
    } else {
      this.product.selectProductSeed.products.forEach(product => {
        this.prodpreview.idERP = product.idERP;
      });
      this.prodPreviewmass.push(this.prodpreview);
    }

    this._http.putContent(`${PROD_URL}/product/${this.product.selectProductSeed.id}`, this.prodPreviewmass[0]).subscribe(data => {
      this.seedupd.getSeeds();
      this.seedupd.getSeedsAll();
    });
      console.log(this.prodPreviewmass);
    // if(formGroupSeed.nameSeedCMS.valid != false && formGroupSeed.nameSeedERP.valid != false){
      this.sidenavService.close();
      this.sidenavService.sidenavWidth = 220;
      this.sidenavService.padding = 0;
    // }
  }

  SeedForm() {
    this.formGroupSeed = new FormGroup({
      nameSeedCMS: new FormControl({value: '', disabled: true}, [Validators.required]),
      nameSeedERP: new FormControl({value: '', disabled: true}, [Validators.required])
    })
  }

  setSeed() {
    this.formGroupSeed.controls.nameSeedCMS.setValue(this.product.selectCMS.name);
    this.formGroupSeed.controls.nameSeedERP.setValue(this.product.selectProductSeed.name);
  }

  changeActivity(element) {
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
    this.sidenavService.close();
    this.sidenavService.sidenavWidth = 220;
    this.sidenavService.padding = 0;
    setTimeout(() => {
      this._router.navigate(['/dashbroad/reviews/product-reviews/seeds-reviews']);
    }, 400);
  }

}
