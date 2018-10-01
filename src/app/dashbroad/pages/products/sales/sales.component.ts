import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpService } from '../../../services/http.service';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { PROD_URL } from '../../../../siteurl/siteurl';
import { Product } from '../../../../models/product';
import { SaleDTO } from '../../../../models/saleDTO';

@Component({
  selector: 'app-sales',
  templateUrl: './sales.component.html',
  styleUrls: ['./sales.component.css']
})
export class SalesComponent implements OnInit {

  constructor(private _http: HttpService) { }

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  ngOnInit() {
    this.getSales();
  }
  displayedColumns: string[] = ['name', 'date', 'status', 'delete', 'blocked'];
  dataSource: MatTableDataSource<any>;

  getSales() {
    this._http.getContent(PROD_URL + '/sale/all').subscribe(data => {
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
