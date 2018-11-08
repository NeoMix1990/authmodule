import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpService } from '../../../services/http.service';
import { MatPaginator, MatSort, MatTableDataSource, MatSidenav, MatDialog } from '@angular/material';
import { PROD_URL } from '../../../../siteurl/siteurl';
import { Product } from '../../../../models/product';
import { SaleDTO } from '../../../../models/saleDTO';
import { ProductService } from '../product.service';
import { SidenavService } from '../../../services/sidenav.service';
import { ProductFormComponent } from '../product-form/product-form.component';

@Component({
  selector: 'app-sales',
  templateUrl: './sales.component.html',
  styleUrls: ['./sales.component.css']
})
export class SalesComponent implements OnInit {

  constructor(private dialog: MatDialog, private _http: HttpService, private product: ProductService, private sidenavService: SidenavService) { }
  @ViewChild('sidenavprewiev') sidenavprewiev: MatSidenav;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  ngOnInit() {
    this.getSales();
    this.getProductAll();
    this.sidenavService.setSidenav(this.sidenavprewiev);
  }
  displayedColumns: string[] = ['name', 'date', 'status', 'delete', 'active'];
  dataSource: MatTableDataSource<any>;

  getSales() {
    this.product.getSale().subscribe(data => {
      this.dataSource = new MatTableDataSource(Object(data));
      console.log(this.dataSource);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  }
  getProductAll() {
    this.product.getAllProducts();
  }

  addNewSale(sale: SaleDTO) {
    this.product.SZR = false;
    this.product.Seed = false;
    this.product.Sales = true;
    console.log(this.product.Sales);
    const dialogRef = this.dialog.open(ProductFormComponent,
      { data: { product: this.product.allProducts }, height: '600px', width: '800px'
    });

    dialogRef.afterClosed().subscribe(result => {
        this.getSales();
        this.product.plusminusProd = false;
		});
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  openRightSidenav(row: SaleDTO, data: any) {
    this.product.Sales = true;
    this.product.Seed = false;
    this.product.SZR = false;
    this.product.selectSale = row;
    this.sidenavService.sidenavWidth = 3;
    console.log(this.product.selectSale);
    console.log(this.product.allProducts);
    this.sidenavService.open();
	}
  changeSeedsActivity(element) {
    console.log(element);
    let sale = new SaleDTO();
    sale.id = element.id;
    sale.blocked = element.blocked;
    // const isActive = element.active;
    this._http.putContent(PROD_URL + '/sale/' + sale.id + '/block?is_blocked=' + sale.blocked, null)
        .subscribe(() => {
            // this.successMessage = 'Активность пользователя успешно изменена';
            // this.showSuccess();
            // this.getSales();
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
        this._http.deleteContent(PROD_URL + '/sale/' + id).subscribe(
          response => {
              console.log('delete');
              this.getSales();
          });
			}
		} else {
			alert('Выберите запись');
		}
	}

}
