import { Injectable } from '@angular/core';
import { ActivityTDO } from "../../../models/activityDTO";

@Injectable({
  providedIn: 'root'
})
export class ActivityService {

  constructor() {   }

  selectedActivity: ActivityTDO = new ActivityTDO();

}
