import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { HttpService } from '../../../services/http.service';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef, MatPaginator, MatSort } from '@angular/material';


import { MessageService } from '../message.service';
import { PROD_URL } from '../../../../siteurl/siteurl';
import {ProductCMS} from "../../../../models/productCMS";

@Component({
  selector: 'app-message-form',
  templateUrl: './message-form.component.html',
  styleUrls: ['./message-form.component.css']
})
export class MessageFormComponent implements OnInit {

  messageform: FormGroup;
  salesNames: string[] = [];
  productCMSAll: ProductCMS[];

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private _http: HttpService,
              private dialogRef: MatDialogRef<MessageFormComponent>,
              private dialog: MatDialog,
              @Inject(MAT_DIALOG_DATA) private data: any,
              private message: MessageService) {
  }

  ngOnInit() {
    this.getFormMessage();
    this.getSales();
    this.getSZRAll();
  }

  getFormMessage() {
    this.messageform = new FormGroup({
      // newNameCMS: new FormControl(''),
      // newNameERP: new FormControl('')
    });
  }

  getSales() {
    this._http.getContent(PROD_URL + '/sale/all').subscribe(data => {
      for (let i = 0; i < Object(data).length; i++) {
        this.salesNames.push(Object(data[i].topic));
      }
    });
  }

  getSZRAll() {
    this._http.getContent(PROD_URL + '/crmproduct/cms/fertilizer/all').subscribe(dataCMSAll => {
      this.productCMSAll = Object(dataCMSAll);
      console.log(this.productCMSAll);
    });
  }



  onNoClick() {
    this.dialogRef.close();
  }


  onSubmit(messageform: FormGroup) {
    console.log(messageform);
    console.log("messageform");

  }
}
