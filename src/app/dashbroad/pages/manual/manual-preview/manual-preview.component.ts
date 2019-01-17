import { Component, OnInit } from '@angular/core';
import { SidenavService } from '../../../services/sidenav.service';
import { ManualComponent } from '../manual.component';
import { PROD_URL } from '../../../../siteurl/siteurl';
import { HttpService } from '../../../services/http.service';

@Component({
  selector: 'app-manual-preview',
  templateUrl: './manual-preview.component.html',
  styleUrls: ['./manual-preview.component.css']
})
export class ManualPreviewComponent implements OnInit {

  constructor(private _http: HttpService,
              private sidenavService: SidenavService,
              public manualComponent: ManualComponent) { }

  ngOnInit() {
  }

  close() {
    this.sidenavService.close();
    setTimeout(() => {
      this.manualComponent.showCell();
    }, 300);
  }

  hideManual(id: number) {
    console.log('hide review ' + id);

    if (id != null) {
      if (confirm('Вы уверены что хотите скрыть этот отзыв?') == true) {
        this._http.putContent(PROD_URL + '/manual/' + id + '/condition?is_active=' + false, null).subscribe(
          response => {
            // alert("Отзыв скрыт");
            this.sidenavService.close();
            // this.manualComponent.getManuals();
            this.manualComponent.showCell();
          });
      }
    } else {
      alert('Выберите отзыв');
    }

  }

  showManual(id: number) {
    console.log('hide review ' + id);

    if (id != null) {
      if (confirm('Вы уверены что хотите показать этот отзыв?') == true) {
        this._http.putContent(PROD_URL + '/manual/' + id + '/condition?is_active=' + true, null).subscribe(
          response => {
            // alert("Отзыв показан");
            this.sidenavService.close();
            // this.manualComponent.getManuals();
            this.manualComponent.showCell();
          });
      }
    } else {
      alert('Выберите отзыв');
    }

  }

}
