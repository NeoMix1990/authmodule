import { Component, OnInit, ViewChild } from '@angular/core';
import { MessageTDO } from '../../../models/messageTDO';
import { PROD_URL } from '../../../siteurl/siteurl';
import { HttpService } from '../../services/http.service';
import { MatSort, MatPaginator, MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {

  constructor(private _http: HttpService) { }

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  ngOnInit() {
    this.getMessages();
  }
  displayedColumns: string[] = ['message', 'createDateUNIX', 'messageType', 'activeornot', 'active'];
  dataSource: MatTableDataSource<any>;

  getMessages() {
    this._http.getContent(PROD_URL + '/message/all').subscribe(data => {
      this.dataSource = new MatTableDataSource(Object(data));
      console.log(this.dataSource);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  }

  changeSeedsActivity(element) {
    console.log(element);
    let message = new MessageTDO();
    message.id = element.id;
    message.active = element.active;
    // const isActive = element.active;
    this._http.putContent(PROD_URL + '/message/' + message.id + '/condition?is_active=' + message.active, null)
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

}
