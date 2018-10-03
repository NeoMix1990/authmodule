import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpService } from '../../../../services/http.service';
import { MatSort, MatPaginator, MatTableDataSource } from '@angular/material';
import { PROD_URL } from '../../../../../siteurl/siteurl';
import { ProductReview } from '../../../../../models/product-review';

@Component({
  selector: 'app-seeds-reviews',
  templateUrl: './seeds-reviews.component.html',
  styleUrls: ['./seeds-reviews.component.css']
})
export class SeedsReviewsComponent implements OnInit {

  constructor(private _http: HttpService) { }

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  ngOnInit() {
    this.getProductReview();
  }
  displayedColumns: string[] = ['whostay', 'product', 'brand', 'group' , 'position', 'date', 'delete'];
  dataSource: MatTableDataSource<any>;

  getProductReview() {
    this._http.getContent(PROD_URL + '/comment/all/hybrid').subscribe(data => {
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
    let prodreview = new ProductReview();
    prodreview.id = element.id;
    prodreview.active = element.active;
    // const isActive = element.active;
    this._http.putContent(PROD_URL + '/comment/' + prodreview.id + '/condition?is_active=' + prodreview.active, null)
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
        this._http.deleteContent(PROD_URL + '/comment/' + id).subscribe(
          response => {
              console.log('delete');
              this.getProductReview();
          });
			}
		} else {
			alert('Выберите запись');
		}
	}

}
