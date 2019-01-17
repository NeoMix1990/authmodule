import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpService } from '../../services/http.service';
import { MatDialog, MatPaginator, MatSidenav, MatSort, MatTableDataSource } from '@angular/material';
import { SidenavService } from '../../services/sidenav.service';
import { PROD_URL } from '../../../siteurl/siteurl';
import { ManualService } from './manual.service';
import { Manual } from '../../../models/manual';

@Component({
  selector: 'app-manual',
  templateUrl: './manual.component.html',
  styleUrls: ['./manual.component.css']
})
export class ManualComponent implements OnInit {

  @ViewChild('sidenavprewiev') sidenavprewiev: MatSidenav;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  displayedColumns: string[] = ['topic', 'admin', 'active'];
  dataSource: MatTableDataSource<any>;

  hideCell = false;
  manualAdd: Manual[];

  constructor(private _http: HttpService,
              private dialog: MatDialog,
              private sidenavService: SidenavService,
              private manual: ManualService) { }

  ngOnInit() {
    // this.getManuals();
    this.sidenavService.setSidenav(this.sidenavprewiev);
  }

  // getManuals() {
  //   this._http.getContent(PROD_URL + '/manual/all').subscribe(data => {
  //     this.dataSource = new MatTableDataSource(Object(data));
  //     console.log(this.dataSource);
  //     this.dataSource.sort = this.sort;
  //     this.dataSource.paginator = this.paginator;
  //   });
  // }

  deleteManual(id: number) {
    console.log(id);
    if (id != null) {
      if (confirm('Вы уверены что хотите удалить справочник?') == true) {
        this._http.deleteContent(PROD_URL + '/manual/' + id).subscribe(
          response => {
            console.log('delete');
            // this.getManuals();
          });
      }
    } else {
      alert('Выберите справочник');
    }
  }

  changeManualActivity(element) {
    console.log(element);
    const manual = new Manual();
    manual.id = element.id;
    manual.active = element.active;
    // const isActive = element.active;
    this._http.putContent(PROD_URL + '/manual/' + manual.id + '/condition?is_active=' + manual.active, null)
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
  //
  // openRightSidenav(row) {
  //   this.manual.selectedManual = row;
  //   console.log(this.manual.selectedManual);
  //   this.sidenavService.open();
  //   setTimeout(() => {
  //     this.hideCell = true;
  //   }, 600);
  // }


  addNewManualModal(manual: Manual) {

    // const dialogRef = this.dialog.open(ManualFormComponent,
    //   { data: { manual: this.manualAdd }, height: '600px', width: '600px'
    //   });
    //
    // dialogRef.afterClosed().subscribe(result => {
    //   if (result === 1) {
    //     this.getManuals();
    //   }
    // });

  }

  showCell() {
    // this.getManuals();
    this.hideCell = false;
  }




}
