import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashbroadRoutingModule } from './dashbroad-routing.module';
import { AdminSidebarComponent } from './admin-sidebar/admin-sidebar.component';
import { MatSidenavModule} from '@angular/material/sidenav';
import { MatNativeDateModule, MatSlideToggleModule, MatButtonModule, MatButtonToggleModule, MatListModule } from '@angular/material';
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

@NgModule({
  imports: [
    CommonModule,
    // DashbroadRoutingModule,
    RouterModule,
    NoopAnimationsModule,
    MatSidenavModule,
    MatButtonModule,
    BrowserAnimationsModule,
    MatNativeDateModule,
    MatButtonToggleModule,
    MatSlideToggleModule,
    MatListModule
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
  ]
})
export class DashbroadModule { }
