import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA, LOCALE_ID } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashbroadComponent } from './dashbroad/dashbroad.component';
import { LoginComponent } from './login/login.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { MatCardModule, MatInputModule, MatProgressSpinnerModule, MatButtonModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AuthGuard } from './login/auth/auth.guard';
import { UserService } from './login/auth-service/user.service';
import { DashbroadModule } from './dashbroad/dashbroad.module';
import { AdminSidebarComponent } from './dashbroad/admin-sidebar/admin-sidebar.component';
import { registerLocaleData } from '@angular/common';
import ru  from '@angular/common/locales/ru';
registerLocaleData(ru);

@NgModule({
  declarations: [
    AppComponent,
    DashbroadComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule, 
    MatProgressSpinnerModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    DashbroadModule
  ],
  providers: [UserService, AuthGuard, { provide: LOCALE_ID, useValue: "ru" }],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
