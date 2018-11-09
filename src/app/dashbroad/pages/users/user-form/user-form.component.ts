import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { ProductFormComponent } from '../../products/product-form/product-form.component';
import { FormControl, FormGroup } from '@angular/forms';
import { PROD_URL } from '../../../../siteurl/siteurl';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {
  userform: FormGroup;

  constructor(private dialogRef: MatDialogRef<ProductFormComponent>) { }

  ngOnInit() {
    this.getFormUser();
  }

  getFormUser() {
    this.userform = new FormGroup({
      newLoginUser: new FormControl(''),
      newNameUser: new FormControl(''),
      newPositionUser: new FormControl(''),
      newPhoneUser: new FormControl(''),
      newGroupUser: new FormControl('')
    });
  }

  onNoClick() {
    this.dialogRef.close();
  }

  onSubmit(userform: FormGroup) {
    console.log(this.userform);
  }

}
