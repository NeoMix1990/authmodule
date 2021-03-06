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
  selectedRowIndex: number = -1; 

  highlight(row){ 
      this.selectedRowIndex = row.id; 
  }

  constructor(private _http: HttpService, private dialog: MatDialog, private sidenavService: SidenavService, private contact: ContactService) { }

  @ViewChild('sidenavprewiev') sidenavprewiev: MatSidenav;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngOnInit() {
    this.getContactsTDN();
    this.sidenavService.setSidenav(this.sidenavprewiev);
    this.getRegions();
  }

  region: Region[];

  displayedColumns: string[] = ['edit', 'name', 'position', 'firstPhone', 'subdivision', 'delete'];
  dataSource: MatTableDataSource<any>;


  openRightSidenav(row) {
    this.getRegions();
    this.getContactsTDN();
    this.contact.selectContactTDN = row;
    console.log(this.contact.selectContactTDN);
    this.contact.allOblasti = [];
    this.contact.selectedSubdevition = [];
    this.contact.selectedObl = [];
    this.contact.allSubdevition = [];
    this.contact.allSubdevition = this.region;
    this.region.forEach(element => {
      element.states.forEach(state => {
        this.contact.allOblasti.push(state);
      });
      
    });

    this.contact.selectContactTDN.truncatedRegionDTOs.forEach(regionsel => {
      this.contact.allSubdevition.forEach((allreg, i) => {
        if(regionsel.id === allreg.id) {
          this.contact.allSubdevition.splice(i, 1);
        }
      })
    });

    this.contact.selectContactTDN.stateDTOs.forEach(stateDTO => {
      this.contact.allOblasti.forEach((allreg, i) => {
        if(stateDTO.id === allreg.id) {
          this.contact.allOblasti.splice(i, 1);
        }
      })
    });

    this.contact.selectContactTDN.truncatedRegionDTOs.forEach(sub => {
      this.contact.selectedSubdevition.push(sub);
    });
    this.contact.selectContactTDN.stateDTOs.forEach(state => {
      this.contact.selectedObl.push(state);
    });
    console.log(this.contact.allSubdevition);
    
    console.log(this.contact.allOblasti);
    this.sidenavService.sidenavWidth = 0;
    this.sidenavService.padding = 30;
    this.sidenavService.open();

  }
  
  
  getContactsTDN() {
    // if(this.dataSource == undefined || this.dataSource == null){
      this.contact.getTDNContact().subscribe(data => {
        this.contact.contactTDNList = Object(data);
        console.log('hi');
        this.dataSource = new MatTableDataSource(Object(data));
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
    this.sidenavService.sidenavWidth = 220;
    if(this.sidenavService.sidenav.opened) {
      this.sidenavService.padding = 0;
    }
    this.sidenavService.close();
    this.getRegions();
    this.contact.brandContact = false;
    this.contact.tdnContact = true;
    const dialogRef = this.dialog.open(ContactformComponent,
      { data: { region: this.region }, height: '800px', width: '1000px'
    });

    dialogRef.afterClosed().subscribe(result => {
        this.getContactsTDN();
        this.contact.selectedObl = [];
        this.contact.selectedSubdevition = [];
        this.getRegions();
		});
  }
  deleteContactTDN(id: number) {
		console.log(id);
		if (id != null) {
			if (confirm('Вы уверены что хотите удалить запись?') == true) {
        this._http.deleteContent(`${PROD_URL}/tdncontact/${id}`).subscribe(
          response => {
              console.log('delete');
              this.contact.contactTDNList = this.contact.contactTDNList.filter(contacts => id !== contacts.id);
              this.getContactsTDN();
          });
			}
		} else {
			alert('Выберите запись');
		}
	}

}
