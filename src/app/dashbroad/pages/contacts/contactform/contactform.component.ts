import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, FormArray } from '@angular/forms';
import { MatDialogRef, MatDialog, MAT_DIALOG_DATA } from '@angular/material';
import { HttpService } from '../../../services/http.service';

@Component({
  selector: 'app-contactform',
  templateUrl: './contactform.component.html',
  styleUrls: ['./contactform.component.css']
})
export class ContactformComponent implements OnInit {


  contactform: FormGroup;
  constructor(private _http: HttpService ,private dialogRef: MatDialogRef<ContactformComponent>, private dialog: MatDialog, @Inject(MAT_DIALOG_DATA) private data: any) { }

  ngOnInit() {
    this.getFormContact();
    // this.contactform.valueChanges.subscribe(data => {console.log(data)});
  }


  getFormContact() {
    this.contactform = new FormGroup({
      name: new FormControl(),
      position: new FormControl(),
      firstPhone: new FormControl(),
      secondPhone: new FormControl(),
      states:  new FormArray([
        new FormControl(),
        new FormControl(),
        new FormControl()
      ]),
      imgUrl: new FormControl(),
      email: new FormControl(),
    });
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
