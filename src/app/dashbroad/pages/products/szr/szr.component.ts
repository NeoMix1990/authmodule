import { Component, OnInit, ViewChild, EventEmitter, Output } from '@angular/core';
import { PROD_URL } from '../../../../siteurl/siteurl';
import { HttpService } from '../../../services/http.service';
import { MatSort, MatPaginator, MatTableDataSource, MatSidenav, MatDialog } from '@angular/material';
import { Product } from '../../../../models/product';
import { SidenavService } from '../../../services/sidenav.service';
import { ProductService } from '../product.service';
import { ProductFormComponent } from '../product-form/product-form.component';
import { ProductCMS } from '../../../../models/productCMS';
import { Router, ActivatedRoute, Event} from '@angular/router';
import { merge, Observable, of as observableOf } from 'rxjs';
import { startWith, switchMap, map, catchError } from 'rxjs/operators';

@Component({
  selector: 'app-szr',
  templateUrl: './szr.component.html',
  styleUrls: ['./szr.component.css']
})
export class SzrComponent implements OnInit {
  selectedRowIndex: number = -1; 

  highlight(row){ 
      this.selectedRowIndex = row.id; 
  }

  productCMSAll: ProductCMS[];
  productCMS: Product[];
  constructor(private route: ActivatedRoute, private router: Router,private dialog: MatDialog, private _http: HttpService, private sidenavService: SidenavService, private product: ProductService) { 
    this.route.queryParams.subscribe(data => console.log(data));
    // this.router.events.subscribe((event: Event) => {
    //   console.log(event);
    // });
   }

  isLoading: boolean;
  @ViewChild('sidenavprewiev') sidenavprewiev: MatSidenav;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  ngOnInit() {
    this.isLoading = true;
    console.log(this.product.selectProductSzr);
    this.getSZR();
    this.getSZRAll();
    this.product.getProductERP();
    this.sidenavService.setSidenav(this.sidenavprewiev);
    if(this.product.teleportBool === true) {
      setTimeout(() => {
        this.openRightSidenav(this.product.selectProductSzr);
      }, 1000);
    }
  }

  displayedColumns: string[] = ['edit', 'name', 'brand.brandName', 'fertilizerGroup.fertilizerGroupName', 'sale', 'createDateUNIX', 'active'];
  dataSource: MatTableDataSource<any>;

  getSZR() {
    // this.product.getSzr().subscribe(dataCMS => {
    //   this.productCMS = Object(dataCMS);
    //   // console.log(this.productCMS);
    //   setTimeout(() => {
        // this.dataSource = new MatTableDataSource(Object(dataCMS));
        // this.dataSource.sortingDataAccessor = (item, property) => {
        //   switch(property) {
        //     case 'brand.brandName': return item.brand.brandName;
        //     case 'fertilizerGroup.fertilizerGroupName': return item.fertilizerGroup.fertilizerGroupName;
        //     default: return item[property];
        //   }
        // };
        // this.dataSource.sort = this.sort;
        // this.dataSource.paginator = this.paginator;
        // this.isLoading = false;
    //   }, 500);

      merge()
      .pipe(
        startWith({}),
        switchMap(() => {
          this.isLoading = true;
          return this.product.getSzr()}),
        catchError(() => {
          this.isLoading = false;
          return observableOf([]);
        })
      ).subscribe(dataCMS => {
        this.productCMS = Object(dataCMS);
        this.dataSource = new MatTableDataSource(Object(dataCMS));
        this.dataSource.sortingDataAccessor = (item, property) => {
          switch(property) {
            case 'brand.brandName': return item.brand.brandName;
            case 'fertilizerGroup.fertilizerGroupName': return item.fertilizerGroup.fertilizerGroupName;
            default: return item[property];
          }
        };
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        this.isLoading = false;
    });
    // });
  }
  getSZRAll() {
    this._http.getContent(`${PROD_URL}/crmproduct/cms/fertilizer/all`).subscribe(dataCMSAll => {
      this.productCMSAll = Object(dataCMSAll);
      this.product.productListCMS = Object(dataCMSAll);
      // console.log(this.productCMSAll);
    });
  }

  addNewProductModal(product: Product) {
    this.product.Seed = false;
    this.product.Sales = false;
    this.product.SZR = true;
    this.sidenavService.sidenavWidth = 220;
    if(this.sidenavService.sidenav.opened) {
      this.sidenavService.padding = 0;
    }
    this.sidenavService.close();
    setTimeout(() => {
      const dialogRef = this.dialog.open(ProductFormComponent,
        { data: { product: this.productCMSAll }, height: '600px', width: '600px'
      });

      dialogRef.afterClosed().subscribe(result => {
        this.getSZR();
      });
    },400)
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  openRightSidenav(row: Product) {

    this.product.selectCMS = new ProductCMS();
    this.product.selectCMS.name = "";
    this.product.SZR = true;
    this.product.Seed = false;
    this.product.Sales = false;
    this.product.teleportBool = false;
    this.product.selectProductSzr = row;
    console.log(this.product.selectProductSzr);
    
    this.product.productListCMS = [];
    this.productCMSAll.forEach(element => {
      if(this.product.selectProductSzr.fertilizerGroup.fertilizerGroupName === element.fertilizerGroupName) {
				this.product.productListCMS.push(element);
			}
    });
    console.log(this.product.productListCMS);
		this.product.productListCMS.forEach(cms => {
			this.product.selectProductSzr.products.forEach(data => {
        if(data.idCMS == cms.id) {
          this.product.selectCMS = cms;
        }
			});
			
		});
    // this.productCMS.forEach(element => {
    //   console.log(element);
    //   if (element.fertilizerGroup === null) {
    //     return;
    //   } else if(this.product.selectProductSzr.fertilizerGroup.name === element.fertilizerGroup.name) {
    //     this.product.productListCMS.push(element);
    //   }
    // });
    this.sidenavService.sidenavWidth = 0;
    this.sidenavService.padding = 30;
    this.sidenavService.open();
	}
  changeSZRActivity(element) {
    console.log(element);
    let prod = new Product();
    prod.id = element.id;
    prod.active = element.active;
    // const isActive = element.active;
    this._http.putContent(`${PROD_URL}/crmproduct/${element.id}/active?is_active=${prod.active}`, null)
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
        this._http.deleteContent(`${PROD_URL}/crmproduct/${id}`).subscribe(
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
