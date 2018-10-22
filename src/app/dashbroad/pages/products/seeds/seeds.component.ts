import { Component, OnInit, ViewChild } from '@angular/core';
import { PROD_URL } from '../../../../siteurl/siteurl';
import { Product } from '../../../../models/product';
import { HttpService } from '../../../services/http.service';
import { MatTableDataSource, MatPaginator, MatSort, MatSidenav, MatDialog } from '@angular/material';
import { ProductService } from '../product.service';
import { SidenavService } from '../../../services/sidenav.service';
import { ProductFormComponent } from '../product-form/product-form.component';

@Component({
  selector: 'app-seeds',
  templateUrl: './seeds.component.html',
  styleUrls: ['./seeds.component.css']
})
export class SeedsComponent implements OnInit {

  constructor(private dialog: MatDialog, private _http: HttpService, private product: ProductService, private sidenavService: SidenavService) { }
  @ViewChild('sidenavprewiev') sidenavprewiev: MatSidenav;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  ngOnInit() {
    this.getSeeds();
    this.sidenavService.setSidenav(this.sidenavprewiev);
  }
  displayedColumns: string[] = ['name', 'brand', 'productType', 'sale', 'delete', 'active'];
  dataSource: MatTableDataSource<any>;

  getSeeds() {
    this._http.getContent(PROD_URL + '/crmproduct/hybrid/all').subscribe(data => {
      this.dataSource = new MatTableDataSource(Object(data));
      console.log(this.dataSource);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
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

  openRightSidenav(row: Product, data: any) {
    this.product.Seed = true;
    this.product.SZR = false;
    this.product.Sales = false;
    this.product.selectProductSeed = row;
    console.log(this.product.selectProductSeed);
    console.log(data);
    this.product.productListCMS = [];
    data.data.forEach(element => {
      // console.log(element);
      if (element.culture === null) {
        return;
      } else if(this.product.selectProductSeed.culture.groupName === element.culture.groupName) {
        this.product.productListCMS.push(element);
      }
    });
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

  deleteProduct(id: number) {
		console.log(id);
		if (id != null) {
			if (confirm('Вы уверены что хотите удалить запись?') == true) {
        this._http.deleteContent(PROD_URL + '/crmproduct/' + id).subscribe(
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
    const dialogRef = this.dialog.open(ProductFormComponent,
      { data: { product: {}, panelClass: 'width-height' }
    });

    dialogRef.afterClosed().subscribe(result => {
			if (result === 1) {
				this.getSeeds();
			}
		});
  }
}
