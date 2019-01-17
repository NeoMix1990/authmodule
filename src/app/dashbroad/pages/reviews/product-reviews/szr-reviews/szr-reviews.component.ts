import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { HttpService } from '../../../../services/http.service';
import {MatSort, MatPaginator, MatTableDataSource, MatSidenav, MatDialog} from '@angular/material';
import { PROD_URL } from '../../../../../siteurl/siteurl';
import { ProductReview } from '../../../../../models/product-review';
import {SidenavService} from '../../../../services/sidenav.service';
import { ProductService } from '../../../products/product.service';
import { ReviewService } from '../../review.service';

@Component({
  selector: 'app-szr-reviews',
  templateUrl: './szr-reviews.component.html',
  styleUrls: ['./szr-reviews.component.css']
})
export class SzrReviewsComponent implements OnInit, OnDestroy {
  selectedRowIndex: number = -1; 

  highlight(row){ 
      this.selectedRowIndex = row.id; 
  }

  productID: any;
  mainReviewMassive: any;
  constructor(private _http: HttpService,
              private dialog: MatDialog,
              private sidenavService: SidenavService,
              private reviewService: ReviewService) { }
  @ViewChild('sidenavprewiev') sidenavprewiev: MatSidenav;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngOnInit() {
    this.getProductReview();
    this.sidenavService.setSidenav(this.sidenavprewiev);
    
  }

  ngOnDestroy() {
    this.reviewService.id = undefined;
  }
  displayedColumns: string[] = ['edit', 'whostay', 'product', 'brand', 'group' , 'position', 'date', 'delete'];
  dataSource: MatTableDataSource<any>;

  openRightSidenav(row) {
    this.reviewService.selectProductContactReview = row;
    console.log(this.reviewService.selectProductContactReview);
    this.sidenavService.sidenavWidth = 0;
    this.sidenavService.padding = 30;
    this.sidenavService.open();
  }

  getProdReviewID(id) {
    this._http.getContent(`${PROD_URL}/comment/admin/${id}`).subscribe(data => {
      this.dataSource = new MatTableDataSource(Object(data));
      console.log(this.dataSource);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  }

  getProductReview() {
    this._http.getContent(`${PROD_URL}/comment/all/fertilizer`).subscribe(data => {
      this.mainReviewMassive = Object(data);
      this.productID = this.reviewService.id;
      console.log(this.mainReviewMassive);
      console.log(this.productID);
      this.mainReviewMassive.forEach(element => {
        if(this.productID == element.crmProductId) {
          this.productID = element.crmProductId;
        }
      });
      if(this.productID != undefined) {
        this.getProdReviewID(this.productID);
      } else {
        this.dataSource = new MatTableDataSource(Object(this.mainReviewMassive));
        console.log(this.dataSource);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      }
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
    this._http.putContent(`${PROD_URL}/comment/${prodreview.id}/condition?is_active=${prodreview.active}`, null)
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
        this._http.deleteContent(`${PROD_URL}/comment/${id}`).subscribe(
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
