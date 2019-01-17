import { Component, OnInit, ViewChild } from '@angular/core';
import { SidenavService } from '../../../../services/sidenav.service';
import { MatSidenav, MatAutocompleteSelectedEvent } from '@angular/material';
import { ContactService } from '../../contact.service';
import { ContactTDN } from '../../../../../models/contactDTN';
import { PROD_URL } from '../../../../../siteurl/siteurl';
import { HttpService } from '../../../../services/http.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import { map, startWith, switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Region } from '../../../../../models/region';
import { State } from '../../../../../models/State';
import { ContactTDNput } from '../../../../../models/contactTDNput';
import { ContactsTDNComponent } from '../contacts-tdn.component';

@Component({
  selector: 'app-contact-tdn-preview',
  templateUrl: './contact-tdn-preview.component.html',
  styleUrls: ['./contact-tdn-preview.component.css']
})
export class ContactTdnPreviewComponent implements OnInit {


  constructor(private sidenavService: SidenavService, private contact: ContactService, private router: Router, private _http: HttpService, private tdncont: ContactsTDNComponent) { }

  contactForm: FormGroup;

  @ViewChild('previewFile') previewFile: any;

  disable: boolean = true;
  filteredOptionsSub: Observable<Region[]>;
  filteredOptionsObl: Observable<State[]>;

  datemask = [ '+', '3', '8', '(', /\d/,/\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, ' ', /\d/, /\d/, ' ', /\d/, /\d/];

  ngOnInit() {
    this.getPreviewContact();
    this.initContactForm();
  }
  close() {
    this.sidenavService.sidenavWidth = 220;
    this.sidenavService.padding = 0;
    this.sidenavService.close();
    this.contact.getTDNContact();
    this.url = '';
    console.log(this.previewFile.nativeElement.files);
    this.previewFile.nativeElement.value = "";
    console.log(this.previewFile.nativeElement.files);
    this.contact.selectedSubdevition = [];
    this.contact.selectedObl = [];
    this.tdncont.getRegions();
    this.contactForm.disable();
    this.disable = true;
  }

  disabled() {
    this.contactForm.disable();
    this.disable = true;
  }
  enabled() {
    this.contactForm.enable();
    this.disable = false;
  }

  getPreviewContact() {
    this.contact.getTDNContact().subscribe(data => {this.contact.contactTDNList = Object(data); console.log(this.contact.contactTDNList)})
  }

  initContactForm() {
    this.contactForm = new FormGroup({
      name: new FormControl({value: '', disabled: true}),
      subDivision: new FormControl({value: '', disabled: true}),
      oblast: new FormControl({value: '', disabled: true}),
      position: new FormControl({value: '', disabled: true}),
      email: new FormControl({value: '', disabled: true}),
      previewFile: new FormControl({value: '', disabled: true}),
      imgUrl: new FormControl({value: '', disabled: true}),
      firstPhone: new FormControl({value: '', disabled: true}),
      secondPhone: new FormControl({value: '', disabled: true}),

    })
  }

  changeContact() {
    this.filterSub();
    this.filterObl();
    this.sidenavService.close();
    this.setContactTDN();
    this.url = this.contact.selectContactTDN.imgUrl;
  }

  setContactTDN() {
    this.contactForm.controls.name.setValue(this.contact.selectContactTDN.name);
    this.contactForm.controls.position.setValue(this.contact.selectContactTDN.position);
    this.contactForm.controls.imgUrl.setValue(this.contact.selectContactTDN.imgUrl);
    this.contactForm.controls.email.setValue(this.contact.selectContactTDN.email);
    this.contactForm.controls.firstPhone.setValue(this.contact.selectContactTDN.firstPhone);
    this.contactForm.controls.secondPhone.setValue(this.contact.selectContactTDN.secondPhone);
  }
  url: any;
  reader: any;
  imagePreview: File;
  onSelectFile(event: any) {
    if(event.target.files[0] != undefined){
      this.reader = new FileReader();
      console.log(event.target.files[0]);
      this.reader.onload = (event) => {
        console.log(this.reader.result);
          this.url = this.reader.result;
      }
      this.reader.readAsDataURL(event.target.files[0]);
      this.imagePreview = event.target.files[0];
    }
  }

  // autocomplete

  filterSub() {
    console.log(this.contact.allSubdevition);
    this.filteredOptionsSub = this.contactForm.controls.subDivision.valueChanges
    .pipe(
      startWith<string | Region>(''),
      map(value => typeof value === 'string' ? value : value.name),
      map(name => name ? this._filterSub(name) : this.contact.allSubdevition.slice())
    );
  }

  displayFnSub(contact?: Region): string | undefined {
    return contact ? contact.name : undefined;
  }

  private _filterSub(name: string): Region[] {
    const filterValueSub = name.toLowerCase();

    return this.contact.allSubdevition.filter(option => option.name.toLowerCase().includes(filterValueSub));
  }

  filterObl() {
    console.log(this.contact.allOblasti);
    this.filteredOptionsObl = this.contactForm.controls.oblast.valueChanges
    .pipe(
      startWith<string | State>(''),
      map(value => typeof value === 'string' ? value : value.name),
      map(name => name ? this._filterObl(name) : this.contact.allOblasti.slice())
    );
  }

  displayFnObl(contact?: State): string | undefined {
    return contact ? contact.name : undefined;
  }

  private _filterObl(name: string): State[] {
    const filterValueObl = name.toLowerCase();

    return this.contact.allOblasti.filter(option => option.name.toLowerCase().includes(filterValueObl));
  }

  onSelectionSubdivision(event: MatAutocompleteSelectedEvent) {
    console.log(event.option.value);
    this.contact.selectedSubdevition.push(event.option.value);
    this.contact.getSelectSubDevition();
    this.contact.selectedSubdevition.forEach(regionsel => {
      this.contact.allSubdevition.forEach((allreg, i) => {
        if(regionsel.id === allreg.id) {
          this.contact.allSubdevition.splice(i, 1);
        }
      })
    });
    this.contactForm.controls.subDivision.setValue('');
    this.filterSub();
  }
  onSelectionOblast(event: MatAutocompleteSelectedEvent) {
    console.log(event.option.value);
    this.contact.selectedObl.push(event.option.value);
    this.contact.getSelectObl();
    this.contact.selectedObl.forEach(stateDTO => {
      this.contact.allOblasti.forEach((allreg, i) => {
        if(stateDTO.id === allreg.id) {
          this.contact.allOblasti.splice(i, 1);
        }
      })
    });
    this.contactForm.controls.oblast.setValue('');
    this.filterObl();
  }

  delSub(sub: any) {
    console.log(sub);
    this.contact.delSelectionSub(sub.id);
    this.contact.getSelectSubDevition();
    this.contact.allSubdevition.push(sub);
    this.filterSub();
  }
  delObl(obl: any) {
    console.log(obl);
    this.contact.delSelectionObl(obl.id);
    this.contact.getSelectObl();
    this.contact.allOblasti.push(obl);
    this.filterObl();
  }

  // autocomplete //

  editSubmit(contactForm) {
    let editContact = new ContactTDNput();
    editContact.name = contactForm.name;
    editContact.position = contactForm.position;
    editContact.email = contactForm.email;
    editContact.firstPhone = contactForm.firstPhone;
    editContact.secondPhone = contactForm.secondPhone;
    let id = [];
    // editContact.truncatedRegionDTOs = Object(this.contact.selectedSubdevition);
    this.contact.selectedObl.forEach(obl => {
      id.push(obl.id);
    })
    console.log(id);
    editContact.states = Object(id);

    // console.log(contactForm);
    // console.log(this.imagePreview);

    // this._http.putContent(PROD_URL + '/tdncontact/' + this.contact.selectContactTDN.id, editContact).subscribe(data => {
    //     console.log('Добавлен новый Контакт ТДН');
    //     if(this.imagePreview != undefined) {
    //       this._http.putContentFormData(PROD_URL + '/tdncontact/' + this.contact.selectContactTDN.id + '/image', this.imagePreview).subscribe( image => {
    //         console.log('image send');
    //         this.tdncont.getContactsTDN();
    //         this.tdncont.getRegions();
    //       });
    //     }
    //     this.tdncont.getContactsTDN();
    //     this.tdncont.getRegions();
    // });
    if(this.imagePreview == undefined) {
      this._http.putContent(`${PROD_URL}/tdncontact/${this.contact.selectContactTDN.id}`, editContact).subscribe(res => {
        this.tdncont.getContactsTDN();
        this.tdncont.getRegions();
        this.contact.selectedSubdevition = [];
        this.contact.selectedObl = [];

        this.contactForm.disable();
        this.disable = true;
        this.sidenavService.close();
        this.sidenavService.sidenavWidth = 220;
        this.sidenavService.padding = 0;
      });
    } else {
      this._http.putContent(`${PROD_URL}/tdncontact/${this.contact.selectContactTDN.id}`, editContact).pipe(
        switchMap(idComeFromServer => {
            return this._http.putContentFormData(`${PROD_URL}/tdncontact/${Object(idComeFromServer).id}/image`, this.imagePreview);
        })
      ).subscribe(res => {
        this.tdncont.getContactsTDN();
        this.tdncont.getRegions();
        console.log(this.previewFile.nativeElement.files);
        this.previewFile.nativeElement.value = "";
        console.log(this.previewFile.nativeElement.files);
        this.contact.selectedSubdevition = [];
        this.contact.selectedObl = [];

        this.contactForm.disable();
        this.disable = true;
        this.sidenavService.close();
        this.sidenavService.sidenavWidth = 220;
        this.sidenavService.padding = 0;
      });
    }
  }

  deleteContactTDN(id: number) {
		console.log('del id is ' + id);
    if (id != null) {
			if (confirm('Вы уверены что хотите удалить запись?') == true) {
        this._http.deleteContent(`${PROD_URL}/tdncontact/${id}`).subscribe(
          response => {
              console.log('delete');
              this.contact.contactTDNList = this.contact.contactTDNList.filter(contacts => id !== contacts.id);
              this.getPreviewContact();
              this.tdncont.getContactsTDN();
              this.contactForm.disable();
              this.disable = true;
              this.sidenavService.sidenavWidth = 0;
              this.sidenavService.padding = 30;
              this.sidenavService.close();
          });
			}
		} else {
			alert('Выберите запись');
		}
	}

}
