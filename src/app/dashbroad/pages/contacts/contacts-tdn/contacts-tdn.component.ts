import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator, MatDialog, MatSidenav } from '@angular/material';
import { HttpService } from '../../../services/http.service';
import { PROD_URL } from '../../../../siteurl/siteurl';
import { ContactTDN } from '../../../../models/contactDTN';
import { ContactformComponent } from '../contactform/contactform.component';
import { SidenavService } from '../../../services/sidenav.service';
import { ContactTdnPreviewComponent } from '../contacts-tdn/contact-tdn-preview/contact-tdn-preview.component';
import { ContactService } from '../contact.service';
import { Region } from '../../../../models/region';
import { State } from '../../../../models/State';

@Component({
  selector: 'app-contacts-tdn',
  templateUrl: './contacts-tdn.component.html',
  styleUrls: ['./contacts-tdn.component.css']
})
export class ContactsTDNComponent implements OnInit {


  constructor( private dialog: MatDialog, private sidenavService: SidenavService, private contact: ContactService) { }

  @ViewChild('sidenavprewiev') sidenavprewiev: MatSidenav;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngOnInit() {
    this.getContactsTDN();
    this.sidenavService.setSidenav(this.sidenavprewiev);
    this.getRegions();
  }

  region: Region[];

  displayedColumns: string[] = ['FIO', 'position', 'firstPhone', 'subdivision', 'delete'];
  dataSource: MatTableDataSource<any>;


  openRightSidenav(row) {
    this.contact.selectContactTDN = row;
    console.log(this.contact.selectContactTDN);
    this.contact.allOblasti = [];
    this.contact.selectedSubdevition = [];
    this.contact.selectedObl = [];
    this.contact.allSubdevition = this.region;
    this.region.forEach(element => {
      element.states.forEach(state => {
        this.contact.allOblasti.push(state);
      });
      
    });

    this.contact.selectContactTDN.truncatedRegionDTOs.forEach(sub => {
      this.contact.selectedSubdevition.push(sub);
    });
    this.contact.selectContactTDN.stateDTOs.forEach(state => {
      this.contact.selectedObl.push(state);
    });
    console.log(this.contact.allOblasti);
    this.sidenavService.sidenavWidth = 3;
    this.sidenavService.open();

	}
  
  getContactsTDN() {
    // if(this.dataSource == undefined || this.dataSource == null){
      this.contact.getTDNContact().subscribe(data => {
        this.contact.contactTDNList = Object(data);
        console.log('hi');
        this.dataSource = new MatTableDataSource(Object(this.contact.contactTDNList));
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      });
    // } else {
    //   console.log('don"t hi');
    //   this.dataSource = new MatTableDataSource(Object(this.contact.contactTDNList));
    //   this.dataSource.sort = this.sort;
    //   this.dataSource.paginator = this.paginator;
    // }
  }

  

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getRegions() {
    this.contact.getAllRegion().subscribe(data => {
      this.region = Object(data);
      console.log(this.region);
    });
  }

  addNewContactModal(contact: ContactTDN) {
    const dialogRef = this.dialog.open(ContactformComponent, { data: { contact: {} }});

    dialogRef.afterClosed().subscribe(result => {
			if (result === 1) {
				this.getContactsTDN();
			}
		});
  }
  deleteContactTDN(id: number) {
		console.log(id);
		this.contact.delTDNContact(id);
    this.getContactsTDN();
	}

}
