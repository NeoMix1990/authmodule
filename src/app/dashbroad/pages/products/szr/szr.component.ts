import { Component, OnInit, ViewChild } from '@angular/core';
import { PROD_URL } from '../../../../siteurl/siteurl';
import { HttpService } from '../../../services/http.service';
import { MatSort, MatPaginator, MatTableDataSource } from '@angular/material';
import { Product } from '../../../../models/product';

@Component({
  selector: 'app-szr',
  templateUrl: './szr.component.html',
  styleUrls: ['./szr.component.css']
})
export class SzrComponent implements OnInit {

  constructor(private _http: HttpService) { }
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  ngOnInit() {
    this.getSZR();
  }

  displayedColumns: string[] = ['name', 'brand', 'productType', 'delete', 'active'];
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
  changeSZRActivity(element) {
    console.log(element);
    let prod = new Product();
    prod.id = element.id;
    prod.active = element.active;
    // const isActive = element.active;
    this._http.putContent(PROD_URL + '/crmproduct/' + element.id + '/active', prod)
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
        this._http.deleteContent(PROD_URL + '/crmproduct/' + id);
        this.getSZR();
			}
		} else {
			alert('Выберите запись');
		}
	}

}
