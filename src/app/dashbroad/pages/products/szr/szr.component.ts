import { Component, OnInit, ViewChild, EventEmitter, Output } from '@angular/core';
import { PROD_URL } from '../../../../siteurl/siteurl';
import { HttpService } from '../../../services/http.service';
import { MatSort, MatPaginator, MatTableDataSource, MatSidenav, MatDialog } from '@angular/material';
import { Product } from '../../../../models/product';
import { SidenavService } from '../../../services/sidenav.service';
import { ProductService } from '../product.service';
import { ProductFormComponent } from '../product-form/product-form.component';
import { ProductCMS } from '../../../../models/productCMS';

@Component({
  selector: 'app-szr',
  templateUrl: './szr.component.html',
  styleUrls: ['./szr.component.css']
})
export class SzrComponent implements OnInit {

  productCMSAll: ProductCMS[];
  productCMS: Product[];
  constructor(private dialog: MatDialog, private _http: HttpService, private sidenavService: SidenavService, private product: ProductService) { }
  @ViewChild('sidenavprewiev') sidenavprewiev: MatSidenav;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  ngOnInit() {
    this.getSZR();
    this.getSZRAll();
    this.product.getProductERP();
    this.sidenavService.setSidenav(this.sidenavprewiev);
  }

  displayedColumns: string[] = ['name', 'brandName', 'fertilizerGroupName', 'sale', 'createDateUNIX', 'active'];
  dataSource: MatTableDataSource<any>;

  getSZR() {
    this._http.getContent(PROD_URL + '/crmproduct/fertilizer/all').subscribe(dataCMS => {
      this.dataSource = new MatTableDataSource(Object(dataCMS));
      this.productCMS = Object(dataCMS);
      console.log(this.productCMS);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  }
  getSZRAll() {
    this._http.getContent(PROD_URL + '/crmproduct/cms/fertilizer/all').subscribe(dataCMSAll => {
      this.productCMSAll = Object(dataCMSAll);
      console.log(this.productCMSAll);
    });
  }

  addNewProductModal(product: Product) {
    this.product.Seed = false;
    this.product.Sales = false;
    this.product.SZR = true;
    const dialogRef = this.dialog.open(ProductFormComponent,
      { data: { product: this.productCMSAll }, height: '600px', width: '600px'
    });

    dialogRef.afterClosed().subscribe(result => {
			if (result === 1) {
				this.getSZR();
			}
		});
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  openRightSidenav(row: Product, data: any) {
    this.product.SZR = true;
    this.product.Seed = false;
    this.product.Sales = false;
    this.product.selectProductSzr = row;
    this.product.productListERP.forEach(element => {
      let cmsid;
      this.product.selectProductSzr.products.forEach(data => {
        cmsid = data;
      });
      if(cmsid.idERP == element.erpId) {
        this.product.selectERP = element;
      }
    })
    // console.log(this.product.selectProductSzr);
    // console.log(data);
    // console.log(this.product.selectERP);
    this.product.productListCMS = [];
    this.productCMSAll.forEach(element => {
      // console.log(element);
      if (element.fertilizerGroupName === null) {
        return;
      } else if(this.product.selectProductSzr.fertilizerGroup.fertilizerGroupName === element.fertilizerGroupName) {
        this.product.productListCMS.push(element);
      }
    });
    // console.log(this.product.productListCMS);
    // this.productCMS.forEach(element => {
    //   console.log(element);
    //   if (element.fertilizerGroup === null) {
    //     return;
    //   } else if(this.product.selectProductSzr.fertilizerGroup.name === element.fertilizerGroup.name) {
    //     this.product.productListCMS.push(element);
    //   }
    // });
    this.sidenavService.open();
	}
  changeSZRActivity(element) {
    console.log(element);
    let prod = new Product();
    prod.id = element.id;
    prod.active = element.active;
    // const isActive = element.active;
    this._http.putContent(PROD_URL + '/crmproduct/' + element.id + '/active?is_active=' + prod.active, null)
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
  deleteProduct(id: number) {
		console.log(id);
		if (id != null) {
			if (confirm('Вы уверены что хотите удалить запись?') == true) {
        this._http.deleteContent(PROD_URL + '/crmproduct/' + id).subscribe(
          response => {
              console.log('delete');
              this.getSZR();
          });
			}
		} else {
			alert('Выберите запись');
		}
	}

}
