import { Component, OnInit } from '@angular/core';
import { SidenavService } from '../../../../services/sidenav.service';
import { ContactService } from '../../contact.service';
import { Router } from '@angular/router';
import { HttpService } from '../../../../services/http.service';
import { FormGroup, FormControl } from '@angular/forms';
import { ContactBrand } from '../../../../../models/contactBrand';
import { PROD_URL } from '../../../../../siteurl/siteurl';
import { ContactsBrandsComponent } from '../contacts-brands.component';
import { ReviewService } from '../../../reviews/review.service';

@Component({
  selector: 'app-contact-brand-preview',
  templateUrl: './contact-brand-preview.component.html',
  styleUrls: ['./contact-brand-preview.component.css']
})
export class ContactBrandPreviewComponent implements OnInit {

  constructor(
              private sidenavService: SidenavService,
              private contact: ContactService,
              private router: Router,
              private reviewServ: ReviewService,
              private _http: HttpService,
              private brandcont: ContactsBrandsComponent
              ) { }
  contactForm: FormGroup;
  disable: boolean = true;
  datemask = [ '+', '3', '8', '(', /\d/,/\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, ' ', /\d/, /\d/, ' ', /\d/, /\d/];

  ngOnInit() {
    this.initContactForm();
    this.setContactBrand();
  }
  close() {

    this.contactForm.disable();
    this.disable = true;
    this.sidenavService.sidenavWidth = 220;
    this.sidenavService.padding = 0;
    this.sidenavService.close();
    this.contact.getTDNContact();
  }


  disabled() {
    this.contactForm.disable();
    this.disable = true;
  }
  enabled() {
    this.contactForm.enable();
    this.disable = false;
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
    editContact.productType = contactForm.productType;
    editContact.imgUrl = this.url;
    console.log(contactForm);
    console.log(this.url);
    this._http.putContent(`${PROD_URL}/brand/contact/${this.contact.selectContactBrand.id}`, editContact).subscribe(data => {
      this.brandcont.getContactsBrands();
    });

    this.contactForm.disable();
    this.disable = true;
    this.sidenavService.close();
    this.sidenavService.sidenavWidth = 220;
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
      name: new FormControl({value: '', disabled: true}),
      position: new FormControl({value: '', disabled: true}),
      email: new FormControl({value: '', disabled: true}),
      firstPhone: new FormControl({value: '', disabled: true}),
      secondPhone: new FormControl({value: '', disabled: true}),
      productType: new FormControl({value: '', disabled: true})
    })
  }
  changeContact() {
    this.sidenavService.close();
    this.setContactBrand();
  }

  setContactBrand() {
    this.contactForm.controls.name.setValue(this.contact.selectContactBrand.name);
    this.contactForm.controls.position.setValue(this.contact.selectContactBrand.position);
    this.contactForm.controls.productType.setValue(this.contact.selectContactBrand.productType);
    this.contactForm.controls.email.setValue(this.contact.selectContactBrand.email);
    this.contactForm.controls.firstPhone.setValue(this.contact.selectContactBrand.firstPhone);
    this.contactForm.controls.secondPhone.setValue(this.contact.selectContactBrand.secondPhone);
  }

  deleteContactBrand(id: number) {
		console.log('del id is ' + id);
    if (id != null) {
			if (confirm('Вы уверены что хотите удалить запись?') == true) {
        this._http.deleteContent(`${PROD_URL}/brand/contact/${id}`).subscribe(
          response => {
              console.log('delete');
              this.contact.contactBrandList = this.contact.contactBrandList.filter(contacts => id !== contacts.id);
              this.brandcont.getContactsBrands();
          });
			}
		} else {
			alert('Выберите запись');
		}
    this.sidenavService.sidenavWidth = 220;
    this.sidenavService.padding = 0;
    this.sidenavService.close();
  }
  
  goToReview(contact) {
    // console.log(contact.id);
    this.disable = true;
    this.reviewServ.ifroadTo = true;
    this.reviewServ.contactId = contact.id;
    this.reviewServ.sendContactId();
    this.sidenavService.sidenavWidth = 220;
    this.sidenavService.padding = 0;
    this.sidenavService.close();
    setTimeout(() => {
      this.router.navigate(['/dashbroad/reviews/contacts-reviews']);
    }, 400);
  }

}
