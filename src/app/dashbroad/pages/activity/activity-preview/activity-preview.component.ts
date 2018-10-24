import { Component, Input, OnInit } from "@angular/core";
import { ActivityService } from "../activity.service";
import { SidenavService } from "../../../services/sidenav.service";
import { ActivityComponent } from "../activity.component";

@Component({
  selector: 'app-activity-preview',
  templateUrl: './activity-preview.component.html',
  styleUrls: ['./activity-preview.component.css']
})
export class ActivityPreviewComponent implements OnInit {

  constructor(private sidenavService: SidenavService,
              private activity: ActivityService,
              public activityComponent: ActivityComponent) { }

  ngOnInit() {
  }

  close() {
    this.sidenavService.close();
    setTimeout(() => {
      this.activityComponent.showCell();
    }, 300);
  }

}
