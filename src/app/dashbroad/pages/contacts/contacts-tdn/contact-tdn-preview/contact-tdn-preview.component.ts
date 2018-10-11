import { Component, OnInit, ViewChild } from '@angular/core';
import { SidenavService } from '../../../../services/sidenav.service';
import { MatSidenav } from '@angular/material';
import { ContactService } from '../../contact.service';
import { ContactTDN } from '../../../../../models/contactDTN';
import { PROD_URL } from '../../../../../siteurl/siteurl';
import { HttpService } from '../../../../services/http.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-contact-tdn-preview',
  templateUrl: './contact-tdn-preview.component.html',
  styleUrls: ['./contact-tdn-preview.component.css']
})
export class ContactTdnPreviewComponent implements OnInit {


  constructor(private sidenavService: SidenavService, private contact: ContactService, private router: Router) { }

  contactForm: FormGroup;

  datemask = [ '+', '3', '8', '(', /\d/,/\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, ' ', /\d/, /\d/, ' ', /\d/, /\d/];

  ngOnInit() {
    this.getPreviewContact();
    this.initContactForm();
  }
  close() {
    this.sidenavService.close();
    this.contact.getTDNContact();
  }

  getPreviewContact() {
    this.contact.getTDNContact().subscribe(data => {this.contact.contactList = Object(data); console.log(this.contact.contactList)})
  }

  initContactForm() {
    this.contactForm = new FormGroup({
      name: new FormControl(),
      position: new FormControl(),
      email: new FormControl(),
      firstPhone: new FormControl(),
      secondPhone: new FormControl()
    })
  }
  
  url: any;
  onSelectFile(event: any) {
    var reader = new FileReader();
    console.log(event.target.files[0]);
    reader.onload = (event) => {
      console.log(reader.result);
        this.url = reader.result;
    }
    reader.readAsDataURL(event.target.files[0]);
  }

  editSubmit(contactForm: FormGroup) {
    console.log(contactForm);
  }

  deleteContactTDN(id: number) {
		console.log(id);
    this.contact.delTDNContact(this.contact.selectContactTDN.id);
    this.sidenavService.close();
	}

}
