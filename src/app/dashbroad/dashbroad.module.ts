import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { CommonModule } from "@angular/common";

import { CdkTableModule } from "@angular/cdk/table";
import { DashbroadRoutingModule } from "./dashbroad-routing.module";
import { AdminSidebarComponent } from "./admin-sidebar/admin-sidebar.component";
import { MatSidenavModule} from "@angular/material/sidenav";
import { MatNativeDateModule, MatSlideToggleModule, MatButtonModule, MatButtonToggleModule, MatListModule, MatInputModule, MatDialogModule, MatFormFieldModule, MatCheckboxModule, MatExpansionModule, MatIconModule, MatSelectModule, MatAutocompleteModule, MatDatepickerModule, MatTabsModule } from "@angular/material";
import { NoopAnimationsModule, BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { FooterComponent } from "./footer/footer.component";
import { NavbarComponent } from "./navbar/navbar.component";
import { UsersComponent } from "./pages/users/users.component";
import { ProductsComponent } from "./pages/products/products.component";
import { ActivityComponent } from "./pages/activity/activity.component";
import { ReviewsComponent } from "./pages/reviews/reviews.component";
import { SchemeProtectComponent } from "./pages/scheme-protect/scheme-protect.component";
import { ContactsComponent } from "./pages/contacts/contacts.component";
import { MessagesComponent } from "./pages/messages/messages.component";
import { ManualComponent } from "./pages/manual/manual.component";
import { AnalyticsComponent } from "./pages/analytics/analytics.component";
import { DevicesComponent } from "./pages/devices/devices.component";
import { SettingsComponent } from "./pages/settings/settings.component";
import { RouterModule } from "@angular/router";
import { MatTableModule } from "@angular/material/table";
import { MatSortModule } from "@angular/material/sort";
import { MatPaginatorModule } from "@angular/material/paginator";
import { HttpService } from "./services/http.service";
import { HttpClientModule } from "@angular/common/http";
import { ContactformComponent } from "./pages/contacts/contactform/contactform.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { SzrComponent } from "./pages/products/szr/szr.component";
import { SeedsComponent } from "./pages/products/seeds/seeds.component";
import { SalesComponent } from "./pages/products/sales/sales.component";
import { CommentsComponent } from "./pages/comments/comments.component";
import { ProductReviewsComponent } from "./pages/reviews/product-reviews/product-reviews.component";
import { ContactsReviewsComponent } from "./pages/reviews/contacts-reviews/contacts-reviews.component";
import { SzrReviewsComponent } from "./pages/reviews/product-reviews/szr-reviews/szr-reviews.component";
import { SeedsReviewsComponent } from "./pages/reviews/product-reviews/seeds-reviews/seeds-reviews.component";
import { ContactsTDNComponent } from "./pages/contacts/contacts-tdn/contacts-tdn.component";
import { ContactsBrandsComponent } from "./pages/contacts/contacts-brands/contacts-brands.component";
import { ContactBrandPreviewComponent } from "./pages/contacts/contacts-brands/contact-brand-preview/contact-brand-preview.component";
import { ContactTdnPreviewComponent } from "./pages/contacts/contacts-tdn/contact-tdn-preview/contact-tdn-preview.component";
import { SidenavService } from "./services/sidenav.service";
import { ContactService } from "./pages/contacts/contact.service";
import { BarRatingModule } from "ngx-bar-rating";  
import { TextMaskModule } from "angular2-text-mask";
import { ProductPreviewComponent } from "./pages/products/product-preview/product-preview.component";
import { SeedsReviewPreviewComponent } from "./pages/reviews/product-reviews/seeds-reviews/seeds-review-preview/seeds-review-preview.component";
import { SzrReviewPreviewComponent } from "./pages/reviews/product-reviews/szr-reviews/szr-review-preview/szr-review-preview.component";
import { ContactReviewsPreviewComponent } from "./pages/reviews/contacts-reviews/contact-reviews-preview/contact-reviews-preview.component";
import { ProductFormComponent } from "./pages/products/product-form/product-form.component";
import { ActivityPreviewComponent } from './pages/activity/activity-preview/activity-preview.component';
import { MessagePreviewComponent } from './pages/messages/message-preview/message-preview.component';
import { UserPreviewComponent } from './pages/users/user-preview/user-preview.component';
import { MessageFormComponent } from './pages/messages/message-form/message-form.component';
import { MatGridListModule } from '@angular/material/grid-list';


import { SatDatepickerModule, SatNativeDateModule } from 'saturn-datepicker';

import { ManualPreviewComponent } from './pages/manual/manual-preview/manual-preview.component';
import { OrdersComponent } from './pages/activity/orders/orders.component';
import {OrderPreviewComponent} from "./pages/activity/orders/order-preview/order-preview.component";
import { ProductService } from "./pages/products/product.service";
import { UserFormComponent } from './pages/users/user-form/user-form.component';

@NgModule({
  imports: [
    CommonModule,
    // DashbroadRoutingModule,
    BarRatingModule,
    TextMaskModule,
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
    MatIconModule,
    MatSelectModule,
    MatAutocompleteModule,
    SatDatepickerModule,
    SatNativeDateModule,
    MatDatepickerModule,
    MatTabsModule,
    MatGridListModule
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
    ProductReviewsComponent,
    ContactsReviewsComponent,
    ContactReviewsPreviewComponent,
    SzrReviewsComponent,
    SzrReviewPreviewComponent,
    SeedsReviewsComponent,
    SeedsReviewPreviewComponent,
    ContactsTDNComponent,
    ContactsBrandsComponent,
    ContactBrandPreviewComponent,
    ContactTdnPreviewComponent,
    ProductPreviewComponent,
    ContactReviewsPreviewComponent,
    SeedsReviewPreviewComponent,
    SzrReviewPreviewComponent,
    ProductFormComponent,
    ActivityPreviewComponent,
    MessagePreviewComponent,
    UserPreviewComponent,
    MessageFormComponent,
    ManualPreviewComponent,
    OrdersComponent,
    OrderPreviewComponent,
    UserFormComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [
    AdminSidebarComponent,
    FooterComponent,
    NavbarComponent
  ],
  providers: [HttpService, SidenavService, ContactService, ProductService],
  entryComponents: [ContactformComponent, ProductFormComponent, MessageFormComponent, UserFormComponent]
})
export class DashbroadModule { }
