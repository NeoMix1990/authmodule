import { Component, OnInit } from '@angular/core';
import {HttpService} from '../../../../../services/http.service';
import {SidenavService} from '../../../../../services/sidenav.service';
import {ReviewService} from '../../../contacts-reviews/review.service';
import {PROD_URL} from '../../../../../../siteurl/siteurl';

@Component({
  selector: 'app-szr-review-preview',
  templateUrl: './szr-review-preview.component.html',
  styleUrls: ['./szr-review-preview.component.css']
})
export class SzrReviewPreviewComponent implements OnInit {

  constructor(private _http: HttpService, private sidenavService: SidenavService, private review: ReviewService) { }


  ngOnInit() {
  }

  close() {
    this.sidenavService.close();
  }

  hideReview(id: number) {
    console.log("hide review " + id);

    if (id != null) {
      if (confirm('Вы уверены что хотите скрыть этот отзыв?') == true) {
        this._http.putContent(PROD_URL + '/comment/' + id + '/condition?is_active=' + false, null).subscribe(
          response => {
            alert("Отзыв скрыт");
            this.sidenavService.close();
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
            alert("Отзыв показан");
            this.sidenavService.close();
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
            alert("Отзыв удален");
            // this.getContactReview();
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
            alert("Отзыв изменен");
          });
      }
    } else {
      alert('Выберите отзыв');
    }
  }

}
