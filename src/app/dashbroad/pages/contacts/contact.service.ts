import { Injectable } from '@angular/core';
import { ContactTDN } from '../../../models/contactDTN';
import { HttpService } from '../../services/http.service';
import { MatTableDataSource } from '@angular/material';
import { PROD_URL } from '../../../siteurl/siteurl';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  constructor(private _http: HttpService) { }

  selectContactTDN: ContactTDN = new ContactTDN();
  contactList: ContactTDN[] = [];


  getTDNContact() {
    return this._http.getContent(PROD_URL + '/tdncontact');
  }


  delTDNContact(id: any) {
    this.contactList = this.contactList.filter(contacts => id !== contacts.id);
    // if (id != null) {
		// 	if (confirm('Вы уверены что хотите удалить запись?') == true) {
    //     this._http.deleteContent(PROD_URL + '/tdncontact/' + id).subscribe(
    //       response => {
    //           this.getTDNContact();
    //           console.log('delete');
    //       });
		// 	}
		// } else {
		// 	alert('Выберите запись');
		// }
  }
}
