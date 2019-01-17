import { Injectable } from '@angular/core';
import { Technology } from '../../../models/technology.model';
import { HttpService } from '../../services/http.service';
import { PROD_URL } from '../../../siteurl/siteurl';
import { Culture } from '../../../models/culture.model';
import { PhaseProducts } from '../../../models/phaseProducts.model';
import { Phases } from '../../../models/phases.model';
import { Product } from '../../../models/product';
import { ProductGroup } from '../../../models/productGroup.model';

@Injectable({
  providedIn: 'root'
})
export class TechnologyService {

  constructor(
    private _http: HttpService
    ) { }

  stageListProduct: PhaseProducts[] = [];

  stageList: Phases[] = [];

  id: any;

  openstageinfo: boolean = false;

  selectedTechnology: Technology = new Technology();
  allCulture: Culture[] = [];

  fertilizerAll: Product[] = [];
  massFilter: Product[] = [];
  fretilizerGroup: ProductGroup[] = [];
  product: any;


  deleteTechnology(id: number) {
		console.log(id);
		if (id != null) {
			if (confirm('Вы уверены что хотите удалить запись?') == true) {
        this._http.deleteContent(`${PROD_URL}/technology/${id}`).subscribe(
          response => {
              console.log('delete');
          });
			}
		} else {
			alert('Выберите запись');
		}
  }
  
  returnStageList() {
    return this.stageList;
  }

  returnProductList() {
    return this.stageListProduct;
  }
  
  randomId() {
    this.id = [];
    if(this.stageList.length > 0) {
      return this.stageList.push({phaseId: "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(c) {let r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);return v.toString(16)}), number: '0', phaseProducts: Array(0), description: undefined, phaseNumber: (this.stageList[this.stageList.length-1].phaseNumber + 1)});
    } else {
      return this.stageList.push({phaseId: "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(c) {let r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);return v.toString(16)}), number: '0', phaseProducts: Array(0), description: undefined, phaseNumber: 1});
    }
  }
}
