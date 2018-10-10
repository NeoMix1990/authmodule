import { Component, OnInit, ViewChild } from '@angular/core';
import { SidenavService } from '../../../../services/sidenav.service';
import { MatSidenav } from '@angular/material';
import { ContactService } from '../../contact.service';
import { ContactTDN } from '../../../../../models/contactDTN';

@Component({
  selector: 'app-contact-tdn-preview',
  templateUrl: './contact-tdn-preview.component.html',
  styleUrls: ['./contact-tdn-preview.component.css']
})
export class ContactTdnPreviewComponent implements OnInit {


  constructor(private sidenavService: SidenavService, private contact: ContactService) { }

  ngOnInit() {
  }
  close() {
    this.sidenavService.close();
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

}
