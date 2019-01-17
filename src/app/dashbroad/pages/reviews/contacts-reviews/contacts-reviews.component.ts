import {AfterViewInit, Component, Input, OnChanges, OnInit, ViewChild} from '@angular/core';
import { ContactReview } from '../../../../models/contact-review';
import { HttpService } from '../../../services/http.service';
import {MatSort, MatPaginator, MatTableDataSource, MatDialog, MatSidenav} from '@angular/material';
import { PROD_URL } from '../../../../siteurl/siteurl';
import { SidenavService } from '../../../services/sidenav.service';
import {ProductReview} from '../../../../models/product-review';
import {ContactReviewsPreviewComponent} from './contact-reviews-preview/contact-reviews-preview.component';
import { ReviewService } from '../review.service';

@Component({
  selector: 'app-contacts-reviews',
  templateUrl: './contacts-reviews.component.html',
  styleUrls: ['./contacts-reviews.component.css']
})
export class ContactsReviewsComponent implements OnInit {
  selectedRowIndex: number = -1; 

  highlight(row){ 
      this.selectedRowIndex = row.id; 
  }

  constructor(private _http: HttpService,
              private dialog: MatDialog,
              private sidenavService: SidenavService,
              private review: ReviewService) { }

  @ViewChild('sidenavprewiev') sidenavprewiev: MatSidenav;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;


  ngOnInit() {
    this.getContactReview();
    this.sidenavService.setSidenav(this.sidenavprewiev);
    if(this.review.ifroadTo === true) {
      this.getContactReviewId();
    }
  }

  displayedColumns: string[] = ['edit', 'fio', 'brand', 'position', 'date', 'delete', 'whostay'];
  dataSource: MatTableDataSource<any>;

  openRightSidenav(row) {
    this.review.selectProductContactReview = row;
    // console.log(this.review.selectProductContactReview);
      this.sidenavService.sidenavWidth = 0;
      this.sidenavService.padding = 30;
    this.sidenavService.open();
  }

  ngOnDestroy() {
    this.review.ifroadTo = false;
  }

  getContactReview() {
    this._http.getContent(`${PROD_URL}/brand/contact/comment/all`).subscribe(data => {
      this.dataSource = new MatTableDataSource(Object(data));
      console.log(this.dataSource);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  }

  getContactReviewId() {
    this._http.getContent(`${PROD_URL}/brand/contact/${this.review.contactId}/comment`).subscribe(data => {
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
    // console.log(element);
    let contreview = new ContactReview();
    contreview.id = element.id;
    contreview.active = element.active;
    // const isActive = element.active;
    this._http.putContent(`${PROD_URL}/brand/contact/comment/${contreview.id}/condition?is_active=${contreview.active}`, null)
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
        this._http.deleteContent(`${PROD_URL}/brand/contact/comment/${id}`).subscribe(
          response => {
              console.log('delete');
              this.getContactReview();
          });
			}
		} else {
			alert('Выберите запись');
		}
	}


}
