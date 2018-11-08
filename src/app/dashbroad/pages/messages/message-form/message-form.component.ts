import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { HttpService } from '../../../services/http.service';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef, MatPaginator, MatSort, MatTableDataSource, MatTabsModule } from '@angular/material';
import { MessageService } from '../message.service';
import { PROD_URL } from '../../../../siteurl/siteurl';
import { ProductCMS } from '../../../../models/productCMS';
import {ProductDTO} from '../../../../models/productDTO';
import {MessageTDO} from '../../../../models/messageTDO';
import {MessagesComponent} from '../messages.component';
import {Product} from '../../../../models/product';
import { MessageTDOAdd } from '../../../../models/messageTDOAdd';
import { Observable } from 'rxjs';
import { MatAutocompleteSelectedEvent } from '@angular/material';
import { startWith, map } from 'rxjs/operators';
import {SaleDTO} from '../../../../models/saleDTO';
import {ContactBrand} from '../../../../models/contactBrand';


@Component({
  selector: 'app-message-form',
  templateUrl: './message-form.component.html',
  styleUrls: ['./message-form.component.css']
})
export class MessageFormComponent implements OnInit {

  messageform: FormGroup;

  productCMSAll: ProductCMS[] = [];
  productSeeds: ProductCMS[];

  messageText = '';
  messageProductSZR = '';
  messageProduct = '';
  messageSale = new SaleDTO();
  messageBrands = '';
  messageContacts = '';

  productSZRControl = new FormControl();
  productSeedsControl = new FormControl();
  productBrandsControl = new FormControl();
  productContactsControl = new FormControl();
  // messageText = new FormControl();

  salesAll: string[] = [];
  productSZRName: string[] = [];
  productSeedsName: string[] = [];
  productBrandsName: string[] = [];
  productContactsName: string[] = [];

  filteredSZR: Observable<string[]>;
  filteredSeeds: Observable<string[]>;
  filteredBrands: Observable<string[]>;
  filteredContacts: Observable<string[]>;

  selectedSZR: Product[] = [];
  // selectedSZR: Product[] = [];
  // selectedSZR = new ProductCMS();

  selectedSZRIDs: number[] = [];
  selectedSeeds: string[] = [];
  selectedBrands: string[] = [];
  selectedContacts: string[] = [];

  selectedSaleID: number[];

  saleSubjectIds = [];
  contactID: number[];


  contactBrandAll = new ContactBrand();

  sendNewMessageDTO = new MessageTDOAdd();
  // productListCMS: ProductCMS[] = [];


  // getAllProducts()



  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private _http: HttpService,
              private dialogRef: MatDialogRef<MessageFormComponent>,
              private dialog: MatDialog,
              @Inject(MAT_DIALOG_DATA) private data: any,
              private message: MessageService) { }

  ngOnInit() {
    this.getFormMessage();
    this.getSales();
    this.getSZRAll();
    this.getSeeds();
    this.getContacts();
    this.allFiltered();
  }


  allFiltered() {
    this.filteredSZR = this.productSZRControl.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filterSZR(value))
      );

    this.filteredSeeds = this.productSeedsControl.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filterSeeds(value))
      );

    this.filteredBrands = this.productBrandsControl.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filterBrands(value))
      );

    this.filteredContacts = this.productContactsControl.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filterContacts(value))
      );
  }


  private _filterSZR(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.productSZRName.filter(productSZRName => productSZRName.toLowerCase().indexOf(filterValue) === 0);
  }

  private _filterSeeds(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.productSeedsName.filter(productSeedsName => productSeedsName.toLowerCase().indexOf(filterValue) === 0);
  }

  private _filterBrands(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.productBrandsName.filter(productBrandsName => productBrandsName.toLowerCase().indexOf(filterValue) === 0);
  }

  private _filterContacts(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.productContactsName.filter(productContactsName => productContactsName.toLowerCase().indexOf(filterValue) === 0);
  }

  getFormMessage() {
    this.messageform = new FormGroup({
      messageTopicName: new FormControl(''),
      nameCRM: new FormControl('')
    });
  }

  getSales() {
    this._http.getContent(PROD_URL + '/sale/all').subscribe(data => {
      for (let i = 0; i < Object(data).length; i++) {
        this.salesAll.push(Object(data[i]));
      }
      console.log('sales');
      console.log(this.salesAll);
    });
  }

  getSZRAll() {
    this._http.getContent(PROD_URL + '/crmproduct/cms/fertilizer/all').subscribe(dataCMSAll => {
      this.productCMSAll = Object(dataCMSAll);


      // this.productListCMS = Object(dataCMSAll);

      console.log("this.productCMSAll ");
      console.log(this.productCMSAll);


      for (let i = 0; i < Object(dataCMSAll).length; i++) {
        this.productSZRName.push(Object(this.productCMSAll[i].name));

      }
      console.log("this.productSZRName " + this.productSZRName);


      for (let i = 0; i < Object(dataCMSAll).length; i++) {
        this.selectedSZRIDs.push(Object(dataCMSAll[i].id));
      }

      console.log('this.selectedSZRIDs ');
      console.log(this.selectedSZRIDs);
    });
  }

  getSeeds() {
    this._http.getContent(PROD_URL + '/crmproduct/hybrid/all').subscribe(dataSeeds => {
      this.productSeeds = Object(dataSeeds);
      for (let i = 0; i < Object(dataSeeds).length; i++) {
        this.productSeedsName.push(Object(dataSeeds[i].name));
      }
    });
  }

  getContacts() {
    this._http.getContent(PROD_URL + '/brand/contact').subscribe(data => {

      for (let i = 0; i < Object(data).length; i++) {
        this.productContactsName.push(Object(data[i].name));
      }

      for (let i = 0; i < Object(data).length; i++) {
        // this.messageContactsBrands.push(Object(data[i].brandName));
        this.productBrandsName.push(Object(data[i].brandName));
        // this.messageContactsContacts.push(Object(data[i].name));
        this.productContactsName.push(Object(data[i].name));
      }
    });
  }

  onNoClick() {
    this.dialogRef.close();
  }

  onClickTab() {
    this.messageText = '';
    // this.messageSale = '';
    this.messageProduct = '';
    this.messageBrands = '';
    this.messageContacts = '';
    this.selectedSZR = [];
    this.selectedSeeds = [];
    this.messageform.reset();
  }

  optionSelectedSZR(event: MatAutocompleteSelectedEvent) {
    this.selectedSZR.push(event.option.value);
    console.log(this.selectedSZR);
  }

  deleteProductMessage(option) {
    this.selectedSZR.splice(option);
    console.log("продукт удален" + option, this.selectedSZR);
    // return this.productSZRName = this.productSZRName.filter(element => element.id != id);
    // return this.selectedSZR = this.selectedSZR.splice(id);
  }


  optionSelectedSeeds(event: MatAutocompleteSelectedEvent) {
    this.selectedSeeds.push(event.option.value);
    console.log(this.selectedSeeds);
  }

  optionSelectedBrands(event: MatAutocompleteSelectedEvent) {
    this.selectedBrands.push(event.option.value);
    console.log(this.selectedBrands);
  }

  optionSelectedContacts(event: MatAutocompleteSelectedEvent) {
    this.selectedContacts.push(event.option.value);
    console.log(this.selectedContacts);
  }

  optionSelectedSale(event: MatAutocompleteSelectedEvent) {
    this.selectedSaleID.push(event.option.value);
    console.log('this.selectedSaleID');
    console.log(this.selectedSaleID);
  }

  onSubmit(messageform: FormGroup) {

    this.sendNewMessageDTO.topic = this.messageform.value.messageTopicName;
    console.log(this.messageProductSZR);
    console.log(messageform);

    if (this.messageText) {
        this.sendNewMessageDTO.messageType = 'MESSAGE';
        this.sendNewMessageDTO.message = this.messageText;
    }

    if (this.selectedSZR.length && !this.selectedSeeds.length) {
        this.sendNewMessageDTO.messageType = 'CRM_PRODUCT';
        this.sendNewMessageDTO.message = 'Продукт СЗР ' + this.selectedSZR;
    }

    if (this.selectedSeeds.length && !this.selectedSZR.length) {
        this.sendNewMessageDTO.messageType = 'CRM_PRODUCT';
        this.sendNewMessageDTO.message = 'Семена ' + this.selectedSeeds;
    }

    if (this.selectedSZR.length && this.selectedSeeds.length) {
        this.sendNewMessageDTO.messageType = 'CRM_PRODUCT';
        this.sendNewMessageDTO.message = 'Продукт СЗР ' + this.selectedSZR + '; Семена ' + this.selectedSeeds;
    }

    if (this.messageSale.id) {
        this.sendNewMessageDTO.messageType = 'SALE';
        this.sendNewMessageDTO.message = this.messageSale.topic;
        this.saleSubjectIds.push(this.messageSale.id);
        this.sendNewMessageDTO.subjectIds = this.saleSubjectIds;
    }

    // if (this.productBrandsName.length && !this.productContactsName.length) {
    //     this.sendNewMessageDTO.messageType = 'TDN_CONTACT';
    //     this.sendNewMessageDTO.message = 'Бренд ' + this.selectedBrands;
    //   // this.contactID.push(selectedContacts.id)
    //   //   this.sendNewMessageDTO.subjectIds = this.contactID;
    // }
    //
    // if (!this.productBrandsName.length  && this.productContactsName.length) {
    //     this.sendNewMessageDTO.messageType = 'TDN_CONTACT';
    //     this.sendNewMessageDTO.message = 'контакт ' + this.selectedContacts;
    //   // this.contactID.push(selectedContacts.id)
    //   //   this.sendNewMessageDTO.subjectIds = this.contactID;
    // }
    //
    // if (this.productBrandsName.length && this.productContactsName.length) {
    //   this.sendNewMessageDTO.messageType = 'TDN_CONTACT';
    //   this.sendNewMessageDTO.message = 'Бренд ' + this.selectedBrands + ', контакт ' + this.selectedContacts;
    // }

    // if (!this.productBrandsName.length && !this.productContactsName.length) {
    //     alert('Выберите бренд и контакт');
    // }

    // if (this.productBrandsName.length && !this.productContactsName.length) {
    //     alert('Выберите контакт');
    // }

    // if (!this.productBrandsName.length && this.productContactsName.length) {
    //     alert('Выберите бренд');
    // }


    console.log(this.sendNewMessageDTO);

    // this._http.postContent(PROD_URL + '/message', this.sendNewMessageDTO)
    //   .subscribe(response => {
    //     alert('Сообщение добавлено');
    //   // this.messageComponent.getMessages();
    // });

  }


}
