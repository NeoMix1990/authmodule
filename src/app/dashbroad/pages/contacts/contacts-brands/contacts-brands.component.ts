import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpService } from '../../../services/http.service';
import { MatDialog, MatSort, MatPaginator, MatTableDataSource, MatSidenav } from '@angular/material';
import { PROD_URL } from '../../../../siteurl/siteurl';
import { ContactformComponent } from '../contactform/contactform.component';
import { ContactTDN } from '../../../../models/contactDTN';
import { ContactService } from '../contact.service';
import { SidenavService } from '../../../services/sidenav.service';

@Component({
  selector: 'app-contacts-brands',
  templateUrl: './contacts-brands.component.html',
  styleUrls: ['./contacts-brands.component.css']
})
export class ContactsBrandsComponent implements OnInit {
  selectedRowIndex: number = -1; 

  highlight(row){ 
      this.selectedRowIndex = row.id; 
  }

  constructor(private _http: HttpService, private dialog: MatDialog, private contact: ContactService, private sidenavService: SidenavService) { }

  contacts = [];
  @ViewChild('sidenavprewiev') sidenavprewiev: MatSidenav;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  ngOnInit() {
    this.getContactsBrands();
    this.getRegions();
    this.sidenavService.setSidenav(this.sidenavprewiev);
  }
  displayedColumns: string[] = ['edit', 'name', 'position', 'brandName', 'firstPhone', 'productType', 'delete'];
  dataSource: MatTableDataSource<any>;
  
  getContactsBrands() {
    this._http.getContent(`${PROD_URL}/brand/contact`).subscribe(data => {
      this.dataSource = new MatTableDataSource(Object(data));
      console.log(this.dataSource);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  }

  

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getRegions() {
    this.contact.getAllRegion().subscribe(data => {
      console.log(data);
    })
  }

  deleteContactBrand(id: number) {
    console.log(id);
		if (id != null) {
			if (confirm('Вы уверены что хотите удалить запись?') == true) {
        this._http.deleteContent(`${PROD_URL}/brand/contact/${id}`).subscribe(
          response => {
              console.log('delete');
              this.contact.contactBrandList = this.contact.contactBrandList.filter(contacts => id !== contacts.id);
              this.getContactsBrands();
          });
			}
		} else {
			alert('Выберите запись');
		}
	}

  addNewContactModal(contact: ContactTDN) {
    this.sidenavService.sidenavWidth = 220;
    if(this.sidenavService.sidenav.opened) {
      this.sidenavService.padding = 0;
    }
    this.contact.tdnContact = false;
    this.contact.brandContact = true;
    this.sidenavService.close();
    const dialogRef = this.dialog.open(ContactformComponent,
      { data: { contact: {} }, height: '800px', width: '1000px'
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getContactsBrands();
		});
  }

  openRightSidenav(row) {
    this.sidenavService.sidenavWidth = 0;
    this.sidenavService.padding = 30;
    this.contact.selectContactBrand = row;
    console.log(this.contact.selectContactBrand);
    this.sidenavService.open();

	}

}
