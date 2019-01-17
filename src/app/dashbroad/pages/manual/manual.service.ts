import { Injectable } from '@angular/core';
import { Manual } from '../../../models/manual';

@Injectable({
  providedIn: 'root'
})
export class ManualService {

  constructor() { }

  selectedManual: Manual = new Manual();

}
