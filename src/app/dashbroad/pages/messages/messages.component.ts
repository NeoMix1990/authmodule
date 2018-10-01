import { Component, OnInit, ViewChild } from '@angular/core';
import { MessageTDO } from '../../../models/messageTDO';
import { PROD_URL } from '../../../siteurl/siteurl';
import { HttpService } from '../../services/http.service';
import { MatSort, MatPaginator, MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {

  constructor(private _http: HttpService) { }

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  ngOnInit() {
    this.getSeeds();
  }
  displayedColumns: string[] = ['name', 'brand', 'productType', 'delete', 'active'];
  dataSource: MatTableDataSource<any>;

  getSeeds() {
    this._http.getContent(PROD_URL + '/crmproduct/hybrid/all').subscribe(data => {
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
  changeSeedsActivity(element) {
    console.log(element);
    let message = new MessageTDO();
    message.id = element.id;
    // message.active = element.active;
    // const isActive = element.active;
    this._http.putContent(PROD_URL + '/crmproduct/' + element.id + '/active?is_active=', null)
        .subscribe(() => {
            // this.successMessage = 'Активность пользователя успешно изменена';
            // this.showSuccess();
        },
        // error => {
        //     this.initUsers();
        //     this.checkError(error)
      // }
    );
  }

  deleteProduct(id: number) {
		console.log(id);
		if (id != null) {
			if (confirm('Вы уверены что хотите удалить запись?') == true) {
        this._http.deleteContent(PROD_URL + '/crmproduct/' + id).subscribe(
          response => {
              console.log('delete');
              this.getSeeds();
          });
			}
		} else {
			alert('Выберите запись');
		}
	}

}
