import { Component, OnInit } from '@angular/core';
import {MessageService} from '../message.service';
import {SidenavService} from '../../../services/sidenav.service';
import {MessagesComponent} from '../messages.component';

@Component({
  selector: 'app-message-preview',
  templateUrl: './message-preview.component.html',
  styleUrls: ['./message-preview.component.css']
})
export class MessagePreviewComponent implements OnInit {

  constructor(private sidenavService: SidenavService,
              private message: MessageService,
              public messageComponent: MessagesComponent) { }

  ngOnInit() {
  }

  close() {
    this.sidenavService.close();
    this.sidenavService.sidenavWidth = 220;
    this.sidenavService.padding = 0;
  }

  getFilter() {
    this.sidenavService.close();
  }

}