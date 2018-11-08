import { Component, OnInit } from '@angular/core';
import { SidenavService } from '../../../../services/sidenav.service';
import { ContactService } from '../../contact.service';
import { Router } from '@angular/router';
import { HttpService } from '../../../../services/http.service';
import { FormGroup, FormControl } from '@angular/forms';
import { ContactBrand } from '../../../../../models/contactBrand';
import { PROD_URL } from '../../../../../siteurl/siteurl';

@Component({
  selector: 'app-contact-brand-preview',
  templateUrl: './contact-brand-preview.component.html',
  styleUrls: ['./contact-brand-preview.component.css']
})
export class ContactBrandPreviewComponent implements OnInit {

  constructor(private sidenavService: SidenavService, private contact: ContactService, private router: Router, private _http: HttpService) { }
  contactForm: FormGroup;
  datemask = [ '+', '3', '8', '(', /\d/,/\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, ' ', /\d/, /\d/, ' ', /\d/, /\d/];

  ngOnInit() {
    this.initContactForm();
    this.setContactBrand();
  }
  close() {
    this.sidenavService.sidenavWidth = 190;
    this.sidenavService.close();
    this.contact.getTDNContact();
  }
  url: any;

  editSubmit(contactForm) {
    let editContact = new ContactBrand();
    editContact.brandId = this.contact.selectContactBrand.brandId;
    editContact.name = contactForm.name;
    editContact.position = contactForm.position;
    editContact.email = contactForm.email;
    editContact.firstPhone = contactForm.firstPhone;
    editContact.secondPhone = contactForm.secondPhone;
    editContact.productType = "HYBRID";
    editContact.imgUrl = this.url;

    console.log(contactForm);
    console.log(this.url);
    this._http.putContent(PROD_URL + '/brand/contact/' + this.contact.selectContactBrand.id, editContact).subscribe();
    this.sidenavService.close();
    this.sidenavService.sidenavWidth = 190;
  }

  onSelectFile(event: any) {
    var reader = new FileReader();
    console.log(event.target.files[0]);
    reader.onload = (event) => {
      console.log(reader.result);
        this.url = reader.result;
    }
    reader.readAsDataURL(event.target.files[0]);
  }


  initContactForm() {
    this.contactForm = new FormGroup({
      name: new FormControl(),
      position: new FormControl(),
      email: new FormControl(),
      firstPhone: new FormControl(),
      secondPhone: new FormControl(),
      productType: new FormControl()
    })
  }
  changeContact() {
    this.sidenavService.close();
    this.setContactBrand();
  }

  setContactBrand() {
    this.contactForm.controls.name.setValue(this.contact.selectContactBrand.name);
    this.contactForm.controls.position.setValue(this.contact.selectContactBrand.position);
    this.contactForm.controls.email.setValue(this.contact.selectContactBrand.email);
    this.contactForm.controls.firstPhone.setValue(this.contact.selectContactBrand.firstPhone);
    this.contactForm.controls.secondPhone.setValue(this.contact.selectContactBrand.secondPhone);
  }

  deleteContactBrand(id: number) {
		console.log('del id is ' + id);
    this.contact.delBrandContact(id);
    this.sidenavService.sidenavWidth = 190;
    this.sidenavService.close();
	}

}
