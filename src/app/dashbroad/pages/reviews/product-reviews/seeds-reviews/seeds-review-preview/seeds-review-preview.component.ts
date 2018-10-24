import { Component, OnInit } from '@angular/core';
import {SidenavService} from '../../../../../services/sidenav.service';
import {ReviewService} from '../../../contacts-reviews/review.service';
import {PROD_URL} from '../../../../../../siteurl/siteurl';
import {HttpService} from '../../../../../services/http.service';
import {SeedsReviewsComponent} from '../seeds-reviews.component';

@Component({
  selector: 'app-seeds-review-preview',
  templateUrl: './seeds-review-preview.component.html',
  styleUrls: ['./seeds-review-preview.component.css']
})
export class SeedsReviewPreviewComponent implements OnInit {

  constructor(
    private _http: HttpService,
    private sidenavService: SidenavService,
    private review: ReviewService,
    public seedsRevComponent: SeedsReviewsComponent) { }

  ngOnInit() {
  }

  close() {
    this.sidenavService.close();
    setTimeout(() => {
      this.seedsRevComponent.showCell();
    }, 300);
  }

  hideReview(id: number) {
    console.log('hide review ' + id);

    if (id != null) {
      if (confirm('Вы уверены что хотите скрыть этот отзыв?') == true) {
        this._http.putContent(PROD_URL + '/comment/' + id + '/condition?is_active=' + false, null).subscribe(
          response => {
            // alert('Отзыв скрыт');
            this.sidenavService.close();
            this.seedsRevComponent.getProductReview();
            this.seedsRevComponent.showCell();
          });
      }
    } else {
      alert('Выберите отзыв');
    }

  }

  showReview(id: number) {
    console.log("hide review " + id);

    if (id != null) {
      if (confirm('Вы уверены что хотите показать этот отзыв?') == true) {
        this._http.putContent(PROD_URL + '/comment/' + id + '/condition?is_active=' + true, null).subscribe(
          response => {
            // alert('Отзыв показан');
            this.sidenavService.close();
            this.seedsRevComponent.getProductReview();
            this.seedsRevComponent.showCell();
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
        this._http.deleteContent(PROD_URL + '/comment/' + id).subscribe(
          response => {
            console.log('delete');
            // alert('Отзыв удален');
            this.sidenavService.close();
            this.seedsRevComponent.getProductReview();
            this.seedsRevComponent.showCell();
          });
      }
    } else {
      alert('Выберите запись');
    }
  }

  updateCommentText(id: number, message: string) {
    if (id != null) {
      if (confirm('Вы уверены что хотите изменить отзыв?') == true) {
        this._http.putContent(PROD_URL + '/comment/' + id + '?message=' + message, message).subscribe(
          response => {
            console.log('edited ' + id + message);
            alert('Отзыв изменен');
            this.seedsRevComponent.getProductReview();
          });
      }
    } else {
      alert('Выберите отзыв');
    }
  }

}
