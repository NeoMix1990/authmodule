import { Component, OnInit, Inject } from '@angular/core';
import { HttpService } from '../../../services/http.service';
import { MatDialogRef, MatDialog, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {

  productform: FormGroup;
  constructor(private _http: HttpService ,private dialogRef: MatDialogRef<ProductFormComponent>, private dialog: MatDialog, @Inject(MAT_DIALOG_DATA) private data: any) { }

  ngOnInit() {
    this.getFormContact();
  }

  getFormContact() {
    this.productform = new FormGroup({
      Cmsname: new FormControl(),
      Erpname: new FormControl()
    });
  }

  onNoClick(){
    this.dialogRef.close();
  }
  onSubmit(objcontact: FormGroup) {
    console.log(objcontact);
  }
}
