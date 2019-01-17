import { Component, OnInit, ViewChild } from '@angular/core';
import { MessageTDO } from '../../../models/messageTDO';
import { PROD_URL } from '../../../siteurl/siteurl';
import { HttpService } from '../../services/http.service';
import {MatSort, MatPaginator, MatTableDataSource, MatSidenav, MatDialog, MatSortable} from '@angular/material';
import { SidenavService } from '../../services/sidenav.service';
import { MessageService } from './message.service';
import {Product} from "../../../models/product";
import {MessageFormComponent} from "./message-form/message-form.component";
import {ProductCMS} from "../../../models/productCMS";
import {ProductFormComponent} from "../products/product-form/product-form.component";

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {
  selectedRowIndex: number = -1; 

  highlight(row){ 
      this.selectedRowIndex = row.id; 
  }

  constructor(private _http: HttpService,
              private dialog: MatDialog,
              private sidenavService: SidenavService,
              private message: MessageService) { }

  @ViewChild('sidenavprewiev') sidenavprewiev: MatSidenav;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  messageTDOAll: MessageTDO[];

  ngOnInit() {
    this.getMessages();
    this.sidenavService.setSidenav(this.sidenavprewiev);
    this.sort.sort(<MatSortable>({id: 'createDateUNIX', start: 'desc'}));
  }

  displayedColumns: string[] = ['edit', 'message', 'createDateUNIX', 'messageType', 'active'];
  dataSource: MatTableDataSource<any>;

  getMessages() {
    this._http.getContent(`${PROD_URL}/message/all`).subscribe(data => {
      this.dataSource = new MatTableDataSource(Object(data));
      console.log('Сообщения>>');
      console.log(this.dataSource);

      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  }

  openRightSidenav(row) {
    this.message.selectedMessage = row;
    console.log(this.message.selectedMessage);
    this.sidenavService.sidenavWidth = 0;
    this.sidenavService.padding = 30;
    this.sidenavService.open();
  }

  changeSeedsActivity(element) {
    console.log(element);
    const message = new MessageTDO();
    message.id = element.id;
    message.active = element.active;
    // const isActive = element.active;
    this._http.putContent(`${PROD_URL}/message/${message.id}/condition?is_active='${message.active}`, null)
        .subscribe(() => {
            // this.successMessage = 'Активность сообщения успешно изменена';
            // this.showSuccess();
        },
        // error => {
        //     this.initUsers();
        //     this.checkError(error)
      // }
    );
  }


  addNewMessageModal(message: MessageTDO) {

    const dialogRef = this.dialog.open(MessageFormComponent,
      { data: { message: this.messageTDOAll }, height: '600px', width: '600px'
      });

    dialogRef.afterClosed().subscribe(result => {
        this.getMessages();
    });

  }

}
