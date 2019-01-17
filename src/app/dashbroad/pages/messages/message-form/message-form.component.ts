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
import {Brand} from '../../../../models/brand';
import {ProductService} from '../../products/product.service';


@Component({
  selector: 'app-message-form',
  templateUrl: './message-form.component.html',
  styleUrls: ['./message-form.component.css']
})
export class MessageFormComponent implements OnInit {

  messageform: FormGroup;

  productCMSAll: Product[] = [];
  productSeeds: ProductCMS[];

  messageText = '';
  messageType = '';
  messageProductSZR = '';
  messageProduct = '';
  messageSale = new SaleDTO();
  messageBrands = '';
  messageContacts = '';

  salesAll: string[] = [];

  productSZRName: string[] = [];
  productSZRAll: Product[] = [];
  productSeedsAll: Product[] = [];
  productBrandsAll: ContactBrand[] = [];
  productSeedsName: string[] = [];
  productBrandsName: string[] = [];
  productContactsName: string[] = [];

  filteredSZR: Observable<Product[]>;
  filteredSeeds: Observable<Product[]>;
  filteredBrands: Observable<Brand[]>;
  filteredContacts: Observable<string[]>;

  selectedSZR: Product[] = [];
  selectedSeeds: Product[] = [];
  selectedSZRIDs: number[] = [];
  selectedSeedsIDs: number[] = [];
  selectedBrandsIDs: number[] = [];
  selectedContactsIDs: number[] = [];
  selectedSZRandSeedsIDs: number[] = [];
  selectedBrands: string[] = [];
  selectedContacts: string[] = [];
  selectedSaleID: number[];
  saleSubjectIds = [];

  sendNewMessageDTO = new MessageTDOAdd();

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private _http: HttpService,
              private dialogRef: MatDialogRef<MessageFormComponent>,
              private dialog: MatDialog,
              private message: MessageService,
              private product: ProductService,
              @Inject(MAT_DIALOG_DATA) private data: any) { }

  ngOnInit() {
    this.getFormMessage();
    this.getSales();
    this.getSZRAll();
    this.getSeeds();
    this.getContacts();
    this.allFiltered();
    this.messageSale = null;
  }

  allFiltered() {
    this.filteredSZR = this.messageform.controls.productSZRControl.valueChanges
        .pipe(
            startWith<string | Product>(''),
            map(value => typeof value === 'string' ? value : value.name),
            map(name => name ? this._filterSZR(name) : this.productCMSAll.slice())
        );

    this.filteredSeeds = this.messageform.controls.productSeedsControl.valueChanges
        .pipe(
            startWith<string | Product>(''),
            map(value => typeof value === 'string' ? value : value.name),
            map(name => name ? this._filterSeeds(name) : this.productSeedsAll.slice())
        );

    this.filteredBrands = this.messageform.controls.productBrandsControl.valueChanges
        .pipe(
            startWith<string | Brand>(''),
            map(value => typeof value === 'string' ? value : value.brandName),
            map(brandName => brandName ? this._filterBrands(brandName) : this.productBrandsAll.slice())
        );
  }

  private _filterSZR(name: string): Product[] {
    const filterValue = name.toLowerCase();

    return this.productCMSAll.filter(option => option.name.toLowerCase().indexOf(filterValue) === 0);
  }

  private _filterSeeds(name: string): Product[] {
    const filterValue = name.toLowerCase();

    return this.productSeedsAll.filter(productSeedsName => productSeedsName.name.toLowerCase().indexOf(filterValue) === 0);
  }

  private _filterBrands(brandName: string): Brand[] {
    const filterValue = brandName.toLowerCase();

    return this.productBrandsAll.filter(productBrandsName => productBrandsName.brandName.toLowerCase().indexOf(filterValue) === 0);
  }

  getFormMessage() {
    this.messageform = new FormGroup({
      messageTopic: new FormControl(''),
      messageText: new FormControl(''),
      messageSale: new FormControl(''),
      productSZRControl: new FormControl(''),
      productSeedsControl: new FormControl(''),
      productBrandsControl: new FormControl(''),
      productContactsControl: new FormControl('')
    });
  }

  getSales() {
    this._http.getContent(`${PROD_URL}/sale/all`).subscribe(data => {
      for (let i = 0; i < Object(data).length; i++) {
        this.salesAll.push(Object(data[i]));
      }
      console.log('sales');
      console.log(this.salesAll);
    });
  }

  getSZRAll() {
    this._http.getContent(`${PROD_URL}/crmproduct/fertilizer/all`).subscribe(dataCMSAll => {
      this.productCMSAll = Object(dataCMSAll);

      for (let i = 0; i < Object(dataCMSAll).length; i++) {
        this.productSZRAll.push(Object(this.productCMSAll[i]));
      }

      for (let i = 0; i < Object(dataCMSAll).length; i++) {
        this.productSZRName.push(Object(this.productCMSAll[i].name));
      }
    });
  }

  getSeeds() {
    this._http.getContent(`${PROD_URL}/crmproduct/hybrid/all`).subscribe(dataSeeds => {
      this.productSeeds = Object(dataSeeds);
      for (let i = 0; i < Object(dataSeeds).length; i++) {
        this.productSeedsAll.push(Object(dataSeeds[i]));
      }
    });
  }

  getContacts() {
    this._http.getContent(`${PROD_URL}/brand/contact`).subscribe(data => {

      this.productBrandsAll = Object(data);

      for (let i = 0; i < Object(data).length; i++) {
        this.productContactsName.push(Object(data[i].name));
      }

      for (let i = 0; i < Object(data).length; i++) {
        this.productBrandsName.push(Object(data[i].brandName));
        this.productContactsName.push(Object(data[i].name));
      }
    });
  }

  displayFnSZR(product?: Product): string | undefined {
    return product ? product.name : undefined;
  }

  displayFnBrand(brand?: ContactBrand): string | undefined {
    return brand ? brand.brandName : undefined;
  }

  displayFnContact(contact?: ContactBrand): string | undefined {
    return contact ? contact.name : undefined;
  }

  onNoClick() {
    this.dialogRef.close();
  }

  onClickTab() {
    this.messageProduct = '';
    this.messageBrands = '';
    this.messageContacts = '';
    this.selectedSaleID = [];
    this.messageSale = null;
    this.selectedSZR = [];
    this.selectedSeeds = [];
    this.selectedSZRIDs = [];
    this.selectedSeedsIDs = [];
    this.selectedSZRandSeedsIDs = [];
    this.messageform.controls.productSZRControl.setValue('');
    this.messageform.controls.productSeedsControl.setValue('');
    this.selectedContactsIDs = [];
    this.messageform.controls.productBrandsControl.setValue('');
    this.messageform.controls.productContactsControl.setValue('');
  }

  optionSelectedSZR(event: MatAutocompleteSelectedEvent) {
    this.selectedSZRIDs.push(event.option.value.id);
    this.selectedSZR.push(event.option.value);
    this.messageform.controls.productSZRControl.setValue('');
    // return this.productCMSAll = this.productCMSAll.filter(option => option.id !== event.option.value.id);
  }

  optionSelectedSeeds(event: MatAutocompleteSelectedEvent) {
    this.selectedSeeds.push(event.option.value);
    this.selectedSeedsIDs.push(event.option.value.id);
    this.messageform.controls.productSeedsControl.setValue('');
  }

  optionSelectedBrands(event: MatAutocompleteSelectedEvent) {
    this.selectedBrands.push(event.option.value);
    this.selectedBrandsIDs.push(event.option.value.id);
    this.messageform.controls.productContactsControl.setValue('');
  }

  optionSelectedContacts(event: MatAutocompleteSelectedEvent) {
    this.selectedContacts.push(event.option.value);
    this.selectedContactsIDs.push(event.option.value.id);
  }

  optionSelectedSale(event: MatAutocompleteSelectedEvent) {
    this.selectedSaleID.push(event.option.value);
  }

  deleteProductMessage(id) {
    // this.getSZRAll();
    this.selectedSZRIDs = this.selectedSZRIDs.filter(option => option !== id);
    return this.selectedSZR = this.selectedSZR.filter(option => option.id !== id);
  }

  deleteSeedMessage(id) {
    this.selectedSeedsIDs = this.selectedSeedsIDs.filter(option => option !== id);
    return this.selectedSeeds = this.selectedSeeds.filter(option => option.id !== id);
  }

  onSubmit(messageform: FormGroup) {
    this.sendNewMessageDTO.topic = this.messageform.value.messageTopic;
    this.sendNewMessageDTO.message = this.messageform.value.messageText;

      if (this.messageform) {
        if (this.messageSale != null) {
            this.sendNewMessageDTO.messageType = 'SALE';
            this.saleSubjectIds.push(this.messageSale.id);
            this.sendNewMessageDTO.subjectIds = this.saleSubjectIds;
        }
        if (this.selectedSZR.length || this.selectedSeeds.length) {
            this.sendNewMessageDTO.messageType = 'CRM_PRODUCT';
        }
        if (this.selectedSZR.length || this.selectedSeeds.length) {
            this.selectedSZRandSeedsIDs = this.selectedSZRIDs.concat(this.selectedSeedsIDs);
            this.sendNewMessageDTO.subjectIds = this.selectedSZRandSeedsIDs;
        }
        if (this.selectedBrands.length) {
            this.sendNewMessageDTO.messageType = 'BRAND_CONTACT';
            this.sendNewMessageDTO.subjectIds = this.selectedContactsIDs;
        }
        if (this.selectedContacts.length) {
            this.sendNewMessageDTO.messageType = 'BRAND_CONTACT';
        }
        if (!this.messageSale && !this.selectedSZR.length && !this.selectedSeeds.length
            && !this.selectedBrands.length && !this.selectedSeeds.length && !this.selectedContacts.length) {
            this.sendNewMessageDTO.messageType = 'MESSAGE';
        }
      }

    // console.log(this.sendNewMessageDTO);

    this._http.postContent(`${PROD_URL}/message`, this.sendNewMessageDTO)
      .subscribe(response => {
        alert('Сообщение добавлено');
    });

  }

}
