import { Component, OnInit, ViewChild, EventEmitter, Output } from '@angular/core';
import { PROD_URL } from '../../../../siteurl/siteurl';
import { HttpService } from '../../../services/http.service';
import { MatSort, MatPaginator, MatTableDataSource, MatSidenav } from '@angular/material';
import { Product } from '../../../../models/product';
import { SidenavService } from '../../../services/sidenav.service';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-szr',
  templateUrl: './szr.component.html',
  styleUrls: ['./szr.component.css']
})
export class SzrComponent implements OnInit {

  constructor(private _http: HttpService, private sidenavService: SidenavService, private product: ProductService) { }
  @ViewChild('sidenavprewiev') sidenavprewiev: MatSidenav;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  ngOnInit() {
    this.getSZR();
    this.sidenavService.setSidenav(this.sidenavprewiev);
  }

  displayedColumns: string[] = ['edit', 'name', 'brand', 'productType', 'delete', 'active'];
  dataSource: MatTableDataSource<any>;

  getSZR() {
      this._http.getContent(PROD_URL + '/crmproduct/fertilizer/all').subscribe(data => {
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

  openRightSidenav(row: Product) {
    this.product.selectProductSzr = row;
    console.log(this.product.selectProductSzr);

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
