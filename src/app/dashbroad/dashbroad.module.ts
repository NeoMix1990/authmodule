import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashbroadRoutingModule } from './dashbroad-routing.module';
import { AdminSidebarComponent } from './admin-sidebar/admin-sidebar.component';
import { MatSidenavModule} from '@angular/material/sidenav';
import { MatNativeDateModule, MatSlideToggleModule, MatButtonModule, MatButtonToggleModule } from '@angular/material';
import { NoopAnimationsModule, BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FooterComponent } from './footer/footer.component';
import { NavbarComponent } from './navbar/navbar.component';

@NgModule({
  imports: [
    CommonModule,
    DashbroadRoutingModule,
    NoopAnimationsModule,
    MatSidenavModule,
    MatButtonModule,
    BrowserAnimationsModule,
    MatNativeDateModule,
    MatButtonToggleModule,
    MatSlideToggleModule
  ],
  declarations: [
    AdminSidebarComponent,
    FooterComponent,
    NavbarComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [
    AdminSidebarComponent,
    FooterComponent,
    NavbarComponent
  ]
})
export class DashbroadModule { }
