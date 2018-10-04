import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator, MatDialog } from '@angular/material';
import { HttpService } from '../../../services/http.service';
import { PROD_URL } from '../../../../siteurl/siteurl';
import { ContactTDN } from '../../../../models/contactDTN';
import { ContactformComponent } from '../contactform/contactform.component';


@Component({
  selector: 'app-contacts-tdn',
  templateUrl: './contacts-tdn.component.html',
  styleUrls: ['./contacts-tdn.component.css']
})
export class ContactsTDNComponent implements OnInit {

  constructor(private _http: HttpService, private dialog: MatDialog) { }

  contacts = [];
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  ngOnInit() {
    this.getContactsTDN();
  }
  displayedColumns: string[] = ['FIO', 'position', 'firstPhone', 'subdivision', 'delete'];
  dataSource: MatTableDataSource<any>;
  
  getContactsTDN() {
    this._http.getContent(PROD_URL + '/tdncontact').subscribe(data => {
      this.dataSource = new MatTableDataSource(Object(data));
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
		if (id != null) {
			if (confirm('Вы уверены что хотите удалить запись?') == true) {
        this._http.deleteContent(PROD_URL + '/tdncontact/' + id).subscribe(
          response => {
              console.log('delete');
              this.getContactsTDN();
          });
			}
		} else {
			alert('Выберите запись');
		}
	}

}
