import { Component, OnInit, ViewChild } from '@angular/core';
import { SidenavService } from '../../../services/sidenav.service';
import { TechnologyService } from '../technology.service';
import { FormGroup, FormControl } from '@angular/forms';
import { Phases } from '../../../../models/phases.model';
import { PhaseProducts } from '../../../../models/phaseProducts.model';
import { MatTableDataSource, MatSort, MatDialog } from '@angular/material';
import{ AddTechnologyProductComponent } from './add-technology-product/add-technology-product.component'
import { HttpService } from '../../../services/http.service';
import { PROD_URL } from '../../../../siteurl/siteurl';
import { Technology } from '../../../../models/technology.model';
import { TechnologyComponent } from '../technology.component';

@Component({
  selector: 'app-technology-addtech-preview',
  templateUrl: './technology-addtech-preview.component.html',
  styleUrls: ['./technology-addtech-preview.component.css']
})
export class TechnologyAddtechPreviewComponent implements OnInit {

  formGroupTeachnology: FormGroup;

  constructor(
      private sidenavService: SidenavService,
      private technology: TechnologyService,
      private dialog: MatDialog,
      private _http: HttpService,
      private techComp: TechnologyComponent
    ) { }

  @ViewChild(MatSort) sort: MatSort;

  selectedRowIndex: number = -1; 

  bgcChange(row){
    // console.log(row);
    this.selectStage = row;
    this.technology.openstageinfo = true;
    this.selectedRowIndex = row.phaseId; 
    this.formGroupTeachnology.controls.stagerevo.setValue(this.selectStage.number);
    this.formGroupTeachnology.controls.stagename.setValue(this.selectStage.description);
  }

  ngOnInit() {
    this.initTechnologyForm();
    this.getFertilizer();
    this.selectedRowIndex = -1; 
  }

  displayedColumns: string[] = ['crmProductName', 'fertilizerGroup.fertilizerGroupName', 'brand.brandName', 'norm', 'delete'];
  dataSource: MatTableDataSource<any>;

  initTechnologyForm() {
    this.formGroupTeachnology = new FormGroup({
      name: new FormControl(''),
      cultureName: new FormControl(''),
      stagerevo: new FormControl(''),
      stagename: new FormControl('')
    })
  }

  getFilter() {
    this.selectPhases();
    this.setTechnology();
    this.formGroupTeachnology.controls.stagerevo.setValue('');
    this.formGroupTeachnology.controls.stagename.setValue('');
    this.sidenavService.close();
    this.technology.openstageinfo = false;
    this.selectedRowIndex = -1; 
  }

  newTechnology() {
    this.technology.selectedTechnology.technologyId = undefined;
    this.sidenavService.close();
    this.technology.openstageinfo = false;
    this.selectedRowIndex = -1; 
    this.formGroupTeachnology.reset();
  }

  addStage() {
    if(this.technology.stageList.length < 1){
      this.technology.openstageinfo = false;
      this.technology.stageListProduct = [];
      this.technology.randomId();
      this.formGroupTeachnology.controls.stagerevo.setValue('');
      this.formGroupTeachnology.controls.stagename.setValue('');
    }
    else if(this.technology.stageList[this.technology.stageList.length-1].description != undefined){
      this.technology.openstageinfo = false;
      this.selectedRowIndex = -1;
      this.technology.stageListProduct = [];
      this.setProduct(this.technology.stageListProduct);
      this.technology.randomId();
      this.formGroupTeachnology.controls.stagerevo.setValue('');
      this.formGroupTeachnology.controls.stagename.setValue('');
    } else {
      this.formGroupTeachnology.controls.stagerevo.setValue('');
      this.formGroupTeachnology.controls.stagename.setValue('');
    }
  }

  

  saveStage(number?, name?){
    console.log(number);
    console.log(name);
    // console.log(this.technology.stageListProduct);
    let newStage = Object();
    newStage.description = name;
    if(name == null) {
      newStage.description = '';
    } else {
      newStage.description = name;
    }
    newStage.number = number;
    newStage.phaseId = this.selectStage.phaseId;
    newStage.phaseNumber = this.selectStage.phaseNumber;
    newStage.phaseProducts = this.technology.stageListProduct;
    // console.log(newStage);
    this.technology.stageList.forEach(stage => {
      if(stage.phaseId === newStage.phaseId) {
        let updateItem = this.technology.stageList.find(this.findIndexToUpdate, newStage.phaseId);

        let index = this.technology.stageList.indexOf(updateItem);


        this.technology.stageList[index] = newStage;
      }
    });
    // console.log(this.technology.stageList);
    this.technology.openstageinfo = false;
  }

  findIndexToUpdate(stage) { 
    return stage.phaseId === this;
  }



  getFertilizer() {
    this._http.getContent(`${PROD_URL}/crmproduct/fertilizer/all`).subscribe(data => {
      this.technology.fertilizerAll = Object(data);
      // console.log(this.technology.fertilizerAll);
    })
  }

  setTechnology() {
    this.formGroupTeachnology.controls.name.setValue(this.technology.selectedTechnology.name);
    this.formGroupTeachnology.controls.cultureName.setValue(this.technology.selectedTechnology.cultureName);
  }
  setProduct(prodlist) {
    this.dataSource = new MatTableDataSource(Object(prodlist));
    this.dataSource.sortingDataAccessor = (item, property) => {
      switch(property) {
        case 'brand.brandName': return item.brand.brandName;
        case 'fertilizerGroup.fertilizerGroupName': return item.fertilizerGroup.fertilizerGroupName;
        default: return item[property];
      }
    };
    this.dataSource.sort = this.sort;
  }

  selectPhases() {
    this.technology.stageList = [];
    let arr = [];
    this.technology.selectedTechnology.phases.forEach(phases => {
 
      arr.push(phases);
    });
    this.technology.stageList = arr.slice().sort((a, b) => {
      if (a.phaseNumber > b.phaseNumber) {
        return 1;
      } else if (b.phaseNumber > a.phaseNumber) {
        return -1;
      } else {
        return 0;
      }});
      console.log(this.technology.stageList);
  }


  selectStage: any;
  selectPhasesProducts(stage) {
    this.technology.stageListProduct = [];
    // console.log(stage);
    this.selectStage = stage;
    if(stage.phaseProducts != undefined && stage.phaseProducts != Array(0)){
      this.technology.stageList.forEach(stagels => {
        stagels.phaseProducts.forEach(prodstage => {
          if(stage.phaseId === stagels.phaseId){
            this.technology.stageListProduct.push(prodstage);
          }
        })
      });
    }
    let list = this.technology.stageListProduct;
    // console.log(this.technology.stageListProduct);
    this.setProduct(list);
  }

  mainSubmit(form) {
    // console.log(form);
    this.techComp.getTechnology();
    let technology = new Technology();
    if(this.technology.selectedTechnology.technologyId != undefined) {
      technology.technologyId = this.technology.selectedTechnology.technologyId;
      // console.log('defined');
    } else {
      technology.technologyId = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(c) {let r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);return v.toString(16)});
      this.technology.selectedTechnology.technologyId = technology.technologyId;
      // console.log(undefined);
    }
    technology.name = form.name;
    // technology.cultureName = form.cultureName;
    // this.technology.allCulture.forEach(culture => {
    //   if(form.cultureName === culture.cultureName) {
    //     technology.cultureId = culture.id;
    //   }
    // });
    if(technology.cultureName === undefined) {
      technology.cultureName = this.technology.selectedTechnology.cultureName;
    }
    if(technology.cultureId === undefined) {
      technology.cultureId = this.technology.selectedTechnology.cultureId;
    }

    this.technology.stageList.forEach(element => {
      if(element.description == null) {
        element.description = '';
      }
    })
    technology.phases = this.technology.stageList;
    // console.log(technology);
    this._http.postContent(`${PROD_URL}/technology`, technology).subscribe(data => {
      console.log(data);
      this.techComp.getTechnology();
    });
    this.techComp.highlight(technology);
  }

  addTechnologyProduct() {
    const dialogRef = this.dialog.open(AddTechnologyProductComponent,
      { data: {}, height: '600px', width: '600px'
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getFertilizer();
      const list = this.technology.stageListProduct;
      this.setProduct(list);
    });
  }

  close() {
    this.sidenavService.close();
    this.sidenavService.padding = 0;
    this.sidenavService.sidenavWidth = 220;
  }

  deleteProduct(element){
    let index = this.technology.stageListProduct.indexOf(element);
    if (index > -1) {
      this.technology.stageListProduct.splice(index, 1);
    }
    this.setProduct(this.technology.stageListProduct);
  }

  deleteStage(element) {
    let index = this.technology.stageList.indexOf(element);
    if (index > -1) {
      this.technology.stageList.splice(index, 1);
    }
    this.technology.returnStageList();
    this.technology.openstageinfo = false;
  }

  deleteTechnology(technology) {
    this.technology.deleteTechnology(technology.technologyId);
    this.sidenavService.close();
    this.sidenavService.padding = 0;
    this.sidenavService.sidenavWidth = 220;
    this.techComp.getTechnology();
  }
  
}
