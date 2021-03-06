import { Injectable } from '@angular/core';
import { ContactTDN } from '../../../models/contactDTN';
import { HttpService } from '../../services/http.service';
import { MatTableDataSource } from '@angular/material';
import { PROD_URL } from '../../../siteurl/siteurl';
import { ContactBrand } from '../../../models/contactBrand';
import { Region } from '../../../models/region';
import { State } from '../../../models/State';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  constructor(private _http: HttpService) { }
  allSubdevition: Region[] = [];
  allOblasti = [];
  selectedObl = [];
  brandContact: boolean = false;
  tdnContact: boolean = false;
  selectedSubdevition: Region[] = [];
  selectContactTDN: ContactTDN = new ContactTDN();
  contactTDNList: ContactTDN[] = [];
  selectContactBrand: ContactBrand = new ContactBrand();
  contactBrandList: ContactBrand[] = [];


  getTDNContact() {
    return this._http.getContent(`${PROD_URL}/tdncontact`);
  }
  getBrandContact() {
    return this._http.getContent(`${PROD_URL}/brand/contact`);
  }
  getAllRegion() {
    return this._http.getContent(`${PROD_URL}/tdncontact/region/all`);
  }

  getBrand() {
    return this._http.getContent(`${PROD_URL}/brand`);
  }

  getSelectSubDevition() {
    return this.selectedSubdevition;
  }

  getSelectObl() {
    return this.selectedObl;
  }

  delSelectionSub(id: any) {
    return this.selectedSubdevition = this.selectedSubdevition.filter(subdev => subdev.id != id);
  }
  delSelectionObl(id: any) {
    return this.selectedObl = this.selectedObl.filter(obl => obl.id != id);
  }

  delBrandContact(id:any) {
    this.contactBrandList = this.contactBrandList.filter(contacts => id !== contacts.id);
  }
}
