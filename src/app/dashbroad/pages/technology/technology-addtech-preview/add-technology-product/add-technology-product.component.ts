import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { Observable } from 'rxjs';
import { Product } from '../../../../../models/product';
import { startWith, map } from 'rxjs/operators';
import { FormGroup, FormControl } from '@angular/forms';
import { TechnologyService } from '../../technology.service';
import { PhaseProducts } from '../../../../../models/phaseProducts.model';
import { TechnologyAddtechPreviewComponent } from '../technology-addtech-preview.component';

@Component({
  selector: 'app-add-technology-product',
  templateUrl: './add-technology-product.component.html',
  styleUrls: ['./add-technology-product.component.css']
})
export class AddTechnologyProductComponent implements OnInit {

  constructor(
    private technology: TechnologyService,
    private dialogRef: MatDialogRef<TechnologyAddtechPreviewComponent>
  ) { }

  productTechnology: FormGroup;
  
  filteredOptionsCMS: Observable<Product[]>;

  ngOnInit() {
    this.startFilter();
    this.setProduct();
    this.filterCMS();
  }

  onNoClick(){
    this.dialogRef.close();
  }

  startFilter() {
    this.technology.stageListProduct.forEach(stageprod => {
      this.technology.fertilizerAll.forEach((allprod, i) => {
        if(stageprod.crmProductId == allprod.id) {
          this.technology.fertilizerAll.splice(i, 1);
        }
      });
    });
    this.technology.massFilter = this.technology.fertilizerAll;
  }

  onChangeMin(event) {
    // console.log(event);
    let clean = event.target.value.replace(/[^-0-9\.]/g, '');
    let decimalCheck = clean.split('.');
      if (decimalCheck[1] != undefined) {
        decimalCheck[1] = decimalCheck[1].slice(0, 3);
        clean = decimalCheck[0] + '.' + decimalCheck[1];
      }
    this.productTechnology.controls.newMin.setValue(clean);
  }
  onChangeMax(event) {
    // console.log(event);
    let clean = event.target.value.replace(/[^-0-9\.]/g, '');
    let decimalCheck = clean.split('.');
      if (decimalCheck[1] != undefined) {
        decimalCheck[1] = decimalCheck[1].slice(0, 3);
        clean = decimalCheck[0] + '.' + decimalCheck[1];
      }
    this.productTechnology.controls.newMax.setValue(clean);
  }

  setProduct() {
    this.productTechnology = new FormGroup({
      newtype: new FormControl(),
      newProd: new FormControl(),
      newMin: new FormControl(),
      newMax: new FormControl(),
      target: new FormControl(),
      comment: new FormControl()
    });
  }

  changeList(event) {
    console.log(event);
    this.technology.massFilter = [];
    this.technology.fertilizerAll.forEach((prod) => {
      if(event.id == prod.fertilizerGroup.id) {
        this.technology.massFilter.push(prod);
      }
    });
    console.log(this.technology.massFilter);
    this.productTechnology.controls.newProd.setValue('');
    this.filterCMS();
  }

  filterCMS() {
    console.log(this.technology.massFilter);
    this.filteredOptionsCMS = this.productTechnology.controls.newProd.valueChanges
    .pipe(
      startWith<string | Product>(''),
      map(value => typeof value === 'string' ? value : value.name),
      map(name => name ? this._filterCMS(name) : this.technology.massFilter.slice())
    );
  }

  newDisplayFnCMS(product?: Product): string | undefined {
    return product ? product.name : undefined;
  }

  private _filterCMS(name: string): Product[] {
    const filterValueCMS = name.toLowerCase();

    return this.technology.massFilter.filter(option => option.name.toLowerCase().includes(filterValueCMS));
  }

  onSubmit(productTechnology) {
    let newProduct = Object();
    console.log(productTechnology);
    newProduct.max = productTechnology.newMax;
    newProduct.min = productTechnology.newMin;
    newProduct.phaseProductId = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(c) {let r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);return v.toString(16)});
    newProduct.crmProductId = productTechnology.newProd.products[0].idCRM;
    newProduct.crmProductName = productTechnology.newProd.name;
    newProduct.brand = productTechnology.newProd.brand;
    newProduct.fertilizerGroup = productTechnology.newProd.fertilizerGroup;
    if(productTechnology.comment == null) {
      newProduct.comment = '';
    } else {
      newProduct.comment = productTechnology.comment;
    }
    if(productTechnology.target == null) {
      newProduct.target = '';
    } else {
      newProduct.target = productTechnology.target;
    }
    this.technology.stageListProduct.push(newProduct);
    this.technology.returnProductList();
  }

}
