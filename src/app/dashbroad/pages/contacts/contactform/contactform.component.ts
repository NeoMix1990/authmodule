import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-contactform',
  templateUrl: './contactform.component.html',
  styleUrls: ['./contactform.component.css']
})
export class ContactformComponent implements OnInit {


  contactform: FormGroup;
  constructor() { }

  ngOnInit() {
    this.getFormContact();
    this.contactform.valueChanges.subscribe(data => {console.log(data)});
  }


  getFormContact() {
    this.contactform = new FormGroup({
      truncatedRegionDTOs: new FormControl(),
      name: new FormControl(),
      position: new FormControl(),
      phone: new FormControl(),
      stateDTOs: new FormControl(),
      imgUrl: new FormControl(),
      email: new FormControl(),
    });
  }
}
