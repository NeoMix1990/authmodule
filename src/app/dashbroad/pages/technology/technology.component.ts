import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav, MatSort, MatPaginator, MatTableDataSource, MatDialog } from '@angular/material';
import { HttpService } from '../../services/http.service';
import { SidenavService } from '../../services/sidenav.service';
import { PROD_URL } from '../../../siteurl/siteurl';
import { TechnologyService } from './technology.service';
import { Technology } from '../../../models/technology.model';
import { mergeMap } from 'rxjs/operators';

@Component({
  selector: 'app-technology',
  templateUrl: './technology.component.html',
  styleUrls: ['./technology.component.css']
})
export class TechnologyComponent implements OnInit {

  constructor(
            private _http: HttpService,
            private dialog: MatDialog,
            private technology: TechnologyService,
            private sidenavService: SidenavService,
            ) { }

  @ViewChild('sidenavprewiev') sidenavprewiev: MatSidenav;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  displayedColumns: string[] = ['edit', 'name', 'type'];
  dataSource: MatTableDataSource<any>;


  ngOnInit() {
    this.getTechnology();
    // this.getCulture();
    this.getProductGroup();
    this.sidenavService.setSidenav(this.sidenavprewiev);
  };

  getProductGroup() {
    this._http.getContent(`${PROD_URL}/crmproduct/fertilizer/groups`).subscribe(data => {
      this.technology.fretilizerGroup = Object(data);
      // console.log(this.technology.fretilizerGroup);
    });
  }

  getTechnology() {
    this._http.getContent(`${PROD_URL}/technology/template/all`).subscribe(data => {
      this.dataSource = new MatTableDataSource(Object(data));
      // console.log(this.dataSource);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  };

  // getCulture() {
  //   this._http.getContent(`${PROD_URL}/crmproduct/cultures`).subscribe(data => {
  //     this.technology.allCulture = Object(data);
  //     // console.log(this.technology.allCulture);
  //   });
  // }

  openRightSidenav(row) {
    
    this.technology.selectedTechnology = undefined;
    this.sidenavService.sidenavWidth = 0;
    this.sidenavService.padding = 30;
    // if(this.activity.ifroadTo === true) {
    //   this.activityList.forEach(order => {
    //     if(this.activity.selectedActivity.id === order.id) {
    //       this.activity.selectedActivity = order;
    //     }
    //   });
    // } else {
      this.technology.selectedTechnology = row;
    // }

    // console.log(this.technology.selectedTechnology);
    this.sidenavService.open();
  }

  changeTechnologyActivity(element) {
    console.log(element);
    let tech = new Technology();
    // tech.id = element.id;
    // tech.active = element.active;
    // const isActive = element.active;
    // this._http.putContent(PROD_URL + '/crmproduct/' + element.id + '/active?is_active=' + prod.active, null)
        // .subscribe(() => {
            // this.successMessage = 'Активность пользователя успешно изменена';
            // this.showSuccess();
        // },
        // error => {
        //     this.initUsers();
        //     this.checkError(error)
      // }
    // );
  }

  deleteTechnology(element){
    this.technology.deleteTechnology(element.technologyId);
    this.getTechnology();
  }

  addNewTechnology() {
    this.technology.stageList = [];
    this.technology.stageListProduct = [];
    this.sidenavService.sidenavWidth = 0;
    this.sidenavService.padding = 30;
    this.sidenavService.open();
  }

  selectedRowIndex: number = -1; 

  highlight(row){ 
      this.selectedRowIndex = row.technologyId; 
  }

}
