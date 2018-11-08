import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, FormArray } from '@angular/forms';
import { MatDialogRef, MatDialog, MAT_DIALOG_DATA, MatAutocompleteSelectedEvent } from '@angular/material';
import { HttpService } from '../../../services/http.service';
import { ContactService } from '../contact.service';
import { State } from '../../../../models/State';

import { map, startWith } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Region } from '../../../../models/region';

@Component({
  selector: 'app-contactform',
  templateUrl: './contactform.component.html',
  styleUrls: ['./contactform.component.css']
})
export class ContactformComponent implements OnInit {


  addtdn: FormGroup;

  filteredOptionsaddSub: Observable<Region[]>;
  filteredOptionsaddObl: Observable<State[]>;
  constructor(private _http: HttpService ,private dialogRef: MatDialogRef<ContactformComponent>, private dialog: MatDialog, @Inject(MAT_DIALOG_DATA) private data: any, private contact: ContactService) { }

  ngOnInit() {
    this.getFormContact();
    console.log(this.data);
    this.infoParse();
    this.filteraddObl();
    this.filteraddSub();
    // this.contactform.valueChanges.subscribe(data => {console.log(data)});
  }

  // info parse

  infoParse() {
    this.contact.allOblasti = [];
    this.contact.selectedSubdevition = [];
    this.contact.selectedObl = [];
    this.contact.allSubdevition = [];
    this.contact.allSubdevition = this.data.region;
    console.log(this.contact.allSubdevition);
    this.contact.allSubdevition.forEach(element => {
      element.states.forEach(state => {
        this.contact.allOblasti.push(state);
      });
      
    });

    // this.contact.selectContactTDN.truncatedRegionDTOs.forEach(regionsel => {
    //   this.contact.allSubdevition.forEach((allreg, i) => {
    //     if(regionsel.id === allreg.id) {
    //       this.contact.allSubdevition.splice(i, 1);
    //     }
    //   })
    // });

    // this.contact.selectContactTDN.stateDTOs.forEach(stateDTO => {
    //   this.contact.allOblasti.forEach((allreg, i) => {
    //     if(stateDTO.id === allreg.id) {
    //       this.contact.allOblasti.splice(i, 1);
    //     }
    //   })
    // });
    console.log(this.contact.allSubdevition);
    
    console.log(this.contact.allOblasti);

  }


  // filter

  filteraddSub() {
    console.log(this.contact.allSubdevition);
    this.filteredOptionsaddSub = this.addtdn.controls.addsubDivision.valueChanges
    .pipe(
      startWith<string | Region>(''),
      map(value => typeof value === 'string' ? value : value.name),
      map(name => name ? this._filteraddSub(name) : this.contact.allSubdevition.slice())
    );
  }

  displayFnaddSub(contact?: Region): string | undefined {
    return contact ? contact.name : undefined;
  }

  private _filteraddSub(name: string): Region[] {
    const filterValueSub = name.toLowerCase();

    return this.contact.allSubdevition.filter(option => option.name.toLowerCase().indexOf(filterValueSub) === 0);
  }

  filteraddObl() {
    console.log(this.contact.allOblasti);
    this.filteredOptionsaddObl = this.addtdn.controls.addoblast.valueChanges
    .pipe(
      startWith<string | State>(''),
      map(value => typeof value === 'string' ? value : value.name),
      map(name => name ? this._filteraddObl(name) : this.contact.allOblasti.slice())
    );
  }

  displayFnaddObl(contact?: State): string | undefined {
    return contact ? contact.name : undefined;
  }

  private _filteraddObl(name: string): State[] {
    const filterValueObl = name.toLowerCase();

    return this.contact.allOblasti.filter(option => option.name.toLowerCase().indexOf(filterValueObl) === 0);
  }

  onSelectionaddSubdivision(event: MatAutocompleteSelectedEvent) {
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
    this.addtdn.controls.addsubDivision.setValue('');
    this.filteraddSub();
  }
  onSelectionaddOblast(event: MatAutocompleteSelectedEvent) {
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
    this.addtdn.controls.addoblast.setValue('');
    this.filteraddObl();
  }

  delSub(sub: any) {
    console.log(sub);
    this.contact.delSelectionSub(sub.id);
    this.contact.getSelectSubDevition();
    this.contact.allSubdevition.push(sub);
    this.filteraddSub();
  }
  delObl(obl: any) {
    console.log(obl);
    this.contact.delSelectionObl(obl.id);
    this.contact.getSelectObl();
    this.contact.allOblasti.push(obl);
    this.filteraddObl();
  }

  // filter //

  


  getFormContact() {
    this.addtdn = new FormGroup({
      name: new FormControl(),
      position: new FormControl(),
      addsubDivision: new FormControl(),
      addoblast: new FormControl(),
      firstPhone: new FormControl(),
      secondPhone: new FormControl(),
      addTdnFile: new FormControl(),
      imgUrl: new FormControl(),
      email: new FormControl(),
      protoType: new FormControl(),
    });
  }

  urltdn: any;
  onSelectFileFoto(event: any) {
    let reader = new FileReader();
    console.log(event.target.files[0]);
    reader.onload = (event) => {
      console.log(reader.result);
        this.urltdn = reader.result;
    }
    reader.readAsDataURL(event.target.files[0]);
  }

  getState() {

  }

  onNoClick(){
    this.dialogRef.close();
  }
  onSubmit(objcontact: FormGroup) {
    console.log(objcontact);
  }
}
