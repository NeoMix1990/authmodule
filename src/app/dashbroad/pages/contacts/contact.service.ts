import { Injectable } from '@angular/core';
import { ContactTDN } from '../../../models/contactDTN';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  constructor() { }

  selectContactTDN: ContactTDN = new ContactTDN();
}
