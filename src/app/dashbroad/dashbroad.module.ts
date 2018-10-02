import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import {CdkTableModule} from '@angular/cdk/table';
import { DashbroadRoutingModule } from './dashbroad-routing.module';
import { AdminSidebarComponent } from './admin-sidebar/admin-sidebar.component';
import { MatSidenavModule} from '@angular/material/sidenav';
import { MatNativeDateModule, MatSlideToggleModule, MatButtonModule, MatButtonToggleModule, MatListModule, MatInputModule, MatDialogModule, MatFormFieldModule, MatCheckboxModule, MatExpansionModule, MatIconModule } from '@angular/material';
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
import { ContactformComponent } from './pages/contacts/contactform/contactform.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SzrComponent } from './pages/products/szr/szr.component';
import { SeedsComponent } from './pages/products/seeds/seeds.component';
import { SalesComponent } from './pages/products/sales/sales.component';
import { CommentsComponent } from './pages/comments/comments.component';
import { ComentsProductComponent } from './pages/comments/coments-product/coments-product.component';
import { ComentsContactsComponent } from './pages/comments/coments-contacts/coments-contacts.component';
import { SeedsComentsComponent } from './pages/comments/coments-product/seeds-coments/seeds-coments.component';
import { SzrComentsComponent } from './pages/comments/coments-product/szr-coments/szr-coments.component';
import { ProductReviewsComponent } from './pages/reviews/product-reviews/product-reviews.component';
import { ContactsReviewsComponent } from './pages/reviews/contacts-reviews/contacts-reviews.component';
import { SzrReviewsComponent } from './pages/reviews/product-reviews/szr-reviews/szr-reviews.component';
import { SeedsReviewsComponent } from './pages/reviews/product-reviews/seeds-reviews/seeds-reviews.component';

@NgModule({
  imports: [
    CommonModule,
    // DashbroadRoutingModule,
    CdkTableModule,
    RouterModule,
    MatInputModule,
    MatFormFieldModule,
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
    MatPaginatorModule,
    MatDialogModule,
    FormsModule,
    ReactiveFormsModule,
    CdkTableModule,
    MatCheckboxModule,
    MatExpansionModule,
    MatIconModule
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
    SettingsComponent,
    ContactformComponent,
    SzrComponent,
    SeedsComponent,
    SalesComponent,
    CommentsComponent,
    ComentsProductComponent,
    ComentsContactsComponent,
    SeedsComentsComponent,
    SzrComentsComponent,
    ProductReviewsComponent,
    ContactsReviewsComponent,
    SzrReviewsComponent,
    SeedsReviewsComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [
    AdminSidebarComponent,
    FooterComponent,
    NavbarComponent
  ],
  providers: [HttpService],
  entryComponents: [ContactformComponent]
})
export class DashbroadModule { }
