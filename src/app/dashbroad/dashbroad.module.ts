import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import {CdkTableModule} from '@angular/cdk/table';
import { DashbroadRoutingModule } from './dashbroad-routing.module';
import { AdminSidebarComponent } from './admin-sidebar/admin-sidebar.component';
import { MatSidenavModule} from '@angular/material/sidenav';
import { MatNativeDateModule, MatSlideToggleModule, MatButtonModule, MatButtonToggleModule, MatListModule, MatInputModule } from '@angular/material';
import { NoopAnimationsModule, BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FooterComponent } from './footer/footer.component';
import { NavbarComponent } from './navbar/navbar.component';
import { UsersComponent } from './pages/users/users.component';
import { ProductsComponent } from './pages/products/products.component';
import { ActivityComponent } from './pages/activity/activity.component';
import { ReviewsComponent } from './pages/reviews/reviews.component';
import { SchemeProtectComponent } from './pages/scheme-protect/scheme-protect.component';
import { ContactsComponent } from './pages/contacts/contacts.component';
import { MessagesComponent } from './pages/messages/messages.component';
import { ManualComponent } from './pages/manual/manual.component';
import { AnalyticsComponent } from './pages/analytics/analytics.component';
import { DevicesComponent } from './pages/devices/devices.component';
import { SettingsComponent } from './pages/settings/settings.component';
import { RouterModule } from '@angular/router';
import {MatTableModule} from '@angular/material/table';
import {MatSortModule} from '@angular/material/sort';
import {MatPaginatorModule} from '@angular/material/paginator';
import { HttpService } from './services/http.service';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [
    CommonModule,
    // DashbroadRoutingModule,
    CdkTableModule,
    RouterModule,
    MatInputModule,
    NoopAnimationsModule,
    MatSidenavModule,
    MatButtonModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatNativeDateModule,
    NoopAnimationsModule,
    MatButtonToggleModule,
    MatSlideToggleModule,
    MatListModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule
  ],
  declarations: [
    AdminSidebarComponent,
    FooterComponent,
    NavbarComponent,
    UsersComponent,
    ProductsComponent,
    ActivityComponent,
    ReviewsComponent,
    SchemeProtectComponent,
    ContactsComponent,
    MessagesComponent,
    ManualComponent,
    AnalyticsComponent,
    DevicesComponent,
    SettingsComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [
    AdminSidebarComponent,
    FooterComponent,
    NavbarComponent
  ],
  providers: [HttpService]
})
export class DashbroadModule { }
