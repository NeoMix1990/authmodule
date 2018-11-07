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
  displayedColumns: string[] = ['FIO', 'position', 'brand', 'firstPhone', 'productType', 'delete'];
  dataSource: MatTableDataSource<any>;
  
  getContactsBrands() {
    this._http.getContent(PROD_URL + '/brand/contact').subscribe(data => {
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
    this.contact.delTDNContact(id);
    this.getContactsBrands();
		// if (id != null) {
		// 	if (confirm('Вы уверены что хотите удалить запись?') == true) {
    //     this._http.deleteContent(PROD_URL + '/brand/contact/' + id).subscribe(
    //       response => {
    //           console.log('delete');
    //           this.getContactsBrands();
    //       });
		// 	}
		// } else {
		// 	alert('Выберите запись');
		// }
	}

  addNewContactModal(contact: ContactTDN) {
    const dialogRef = this.dialog.open(ContactformComponent, { data: { contact: {} }});

    dialogRef.afterClosed().subscribe(result => {
			if (result === 1) {
				this.getContactsBrands();
			}
		});
  }

  openRightSidenav(row) {
    this.contact.selectContactBrand = row;
    console.log(this.contact.selectContactBrand);
    this.sidenavService.sidenavWidth = 3;
    this.sidenavService.open();

	}

}
