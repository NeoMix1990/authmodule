import {Component, Input, OnDestroy, OnInit, Output, ViewChild} from '@angular/core';
import { SidenavService } from '../../../../services/sidenav.service';
import { HttpService } from '../../../../services/http.service';
import { ContactReview } from '../../../../../models/contact-review';
import {PROD_URL} from '../../../../../siteurl/siteurl';
import {MatDialog, MatSidenav, MatTableDataSource} from '@angular/material';
import {ProductReview} from '../../../../../models/product-review';
import {ReviewService} from '../review.service';
import {ContactsReviewsComponent} from '../contacts-reviews.component';
import {HttpHeaders} from '@angular/common/http';
import {SecurityService} from '../../../../../login/auth-service/security.service';

@Component({
  selector: 'app-contact-reviews',
  templateUrl: './contact-reviews-preview.component.html',
  styleUrls: ['./contact-reviews-preview.component.css']
})

export class ContactReviewsPreviewComponent implements OnInit {


  constructor(private _http: HttpService,
              private sidenavService: SidenavService,
              private review: ReviewService,
              public contactRevComponent: ContactsReviewsComponent) { }

  ngOnInit() {
  }

  close() {
    this.sidenavService.close();
    setTimeout(() => {
      this.contactRevComponent.showCell();
    }, 300);
  }

  hideReview(id: number) {
    console.log('hide review ' + id);

    if (id != null) {
      if (confirm('Вы уверены что хотите скрыть этот отзыв?') == true) {
        this._http.putContent(PROD_URL + '/brand/contact/comment/' + id + '/condition?is_active=' + false, null).subscribe(
          response => {
            // alert("Отзыв скрыт");
            this.sidenavService.close();
            this.contactRevComponent.getContactReview();
            this.contactRevComponent.showCell();
          });
      }
    } else {
      alert('Выберите отзыв');
    }

  }

  showReview(id: number) {
    console.log('hide review ' + id);

    if (id != null) {
      if (confirm('Вы уверены что хотите показать этот отзыв?') == true) {
        this._http.putContent(PROD_URL + '/brand/contact/comment/' + id + '/condition?is_active=' + true, null).subscribe(
          response => {
            // alert("Отзыв показан");
            this.sidenavService.close();
            this.contactRevComponent.getContactReview();
            this.contactRevComponent.showCell();
          });
      }
    } else {
      alert('Выберите отзыв');
    }

  }

  deleteReview(id: number) {
    console.log(id);
    if (id != null) {
      if (confirm('Вы уверены что хотите удалить отзыв?') == true) {
        this._http.deleteContent(PROD_URL + '/brand/contact/comment/' + id).subscribe(
          response => {
            console.log('delete');
            // alert("Отзыв удален");
            this.sidenavService.close();
            this.contactRevComponent.getContactReview();
            this.contactRevComponent.showCell();
          });
      }
    } else {
      alert('Выберите запись');
    }
  }

  updateCommentText(id: number, message: string) {
    if (id != null) {
      if (confirm('Вы уверены что хотите изменить отзыв?') == true) {
        this._http.putContent(PROD_URL + '/brand/contact/comment/' + id + '?message=' + message, message).subscribe(
          response => {
            console.log('edited ' + id + message);
            alert('Отзыв изменен');
            this.contactRevComponent.getContactReview();
          });
      }
    } else {
      alert('Выберите отзыв');
    }
  }

}
