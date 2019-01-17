import { Component, OnInit, ViewChild } from '@angular/core';
import { PROD_URL } from '../../../../siteurl/siteurl';
import { Product } from '../../../../models/product';
import { HttpService } from '../../../services/http.service';
import { MatTableDataSource, MatPaginator, MatSort, MatSidenav, MatDialog } from '@angular/material';
import { ProductService } from '../product.service';
import { SidenavService } from '../../../services/sidenav.service';
import { ProductFormComponent } from '../product-form/product-form.component';
import { ProductCMS } from '../../../../models/productCMS';
import { ElementInstructionMap } from '@angular/animations/browser/src/dsl/element_instruction_map';
import { merge, Observable, of as observableOf } from 'rxjs';
import { startWith, switchMap, catchError } from 'rxjs/operators';

@Component({
  selector: 'app-seeds',
  templateUrl: './seeds.component.html',
  styleUrls: ['./seeds.component.css']
})
export class SeedsComponent implements OnInit {
  selectedRowIndex: number = -1; 

  highlight(row){ 
      this.selectedRowIndex = row.id; 
  }

  productCMSAll: ProductCMS[];
  productCMS: Product[];
  isLoading: boolean;

  constructor(private dialog: MatDialog, private _http: HttpService, private product: ProductService, private sidenavService: SidenavService) { }
  @ViewChild('sidenavprewiev') sidenavprewiev: MatSidenav;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  ngOnInit() {
    this.getSeeds();
    this.getSeedsAll();
    this.product.getProductERP();
    this.sidenavService.setSidenav(this.sidenavprewiev);
    if(this.product.teleportBool === true) {
      setTimeout(() => {
        console.log('say hi mf');
        this.openRightSidenav(this.product.selectProductSeed);
      }, 1000);
    }
  }
  displayedColumns: string[] = ['edit', 'name', 'brand.brandName', 'culture.cultureName', 'sale', 'createDateUNIX', 'active'];
  dataSource: MatTableDataSource<any>;

  getSeeds() {
    // this.product.getSeed().subscribe(dataCMS => {
    //   this.productCMS = Object(dataCMS);
    //   // console.log(this.productCMS);
    //   this.dataSource = new MatTableDataSource(Object(dataCMS));
    //   this.dataSource.sortingDataAccessor = (item, property) => {
    //     switch(property) {
    //       case 'brand.brandName': return item.brand.brandName;
    //       case 'culture.cultureName': return item.culture.cultureName;
    //       default: return item[property];
    //     }
    //   };
    //   this.dataSource.sort = this.sort;
    //   this.dataSource.paginator = this.paginator;
    // });
    merge()
      .pipe(
        startWith({}),
        switchMap(() => {
          this.isLoading = true;
          return this.product.getSeed()}),
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
  }

  getSeedsAll() {
    this._http.getContent(`${PROD_URL}/crmproduct/cms/hybrid/all`).subscribe(dataCMSAll => {
      this.productCMSAll = Object(dataCMSAll);
      // console.log(this.productCMSAll);
    });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  changeSeedsActivity(element) {
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

  openRightSidenav(row: Product) {
    this.product.selectCMS = new ProductCMS();
    this.product.selectCMS.name = "";
    this.product.Seed = true;
    this.product.SZR = false;
    this.product.Sales = false;
    this.product.teleportBool = false;
    this.product.selectProductSeed = row;
    console.log(this.product.selectProductSeed);
    
    // console.log(this.product.selectProductSeed);
    // console.log(data);
    // console.log(this.product.selectERP);
    this.product.productListCMS = [];
    this.productCMSAll.forEach(element => {
      // console.log(element);
      if(this.product.selectProductSeed.culture.groupName === element.cultureGroupName) {
				this.product.productListCMS.push(element);
			}
		});
		
		this.product.productListCMS.forEach(cms => {
			this.product.selectProductSeed.products.forEach(data => {
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

  deleteProduct(id: number) {
		console.log(id);
		if (id != null) {
			if (confirm('Вы уверены что хотите удалить запись?') == true) {
        this._http.deleteContent(`${PROD_URL}/crmproduct/${id}`).subscribe(
          response => {
              console.log('delete');
              this.getSeeds();
          });
			}
		} else {
			alert('Выберите запись');
		}
  }
  
  addNewProductModal(product: Product) {
    this.product.SZR = false;
    this.product.Sales = false;
    this.product.Seed = true;
    console.log(this.product.Seed);
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
          this.getSeeds();
      });
    }, 400);
  }
}
