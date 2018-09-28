import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DashbroadComponent } from './dashbroad/dashbroad.component';
import { AuthGuard } from './login/auth/auth.guard';
import { ProductsComponent } from './dashbroad/pages/products/products.component';
import { ActivityComponent } from './dashbroad/pages/activity/activity.component';
import { UsersComponent } from './dashbroad/pages/users/users.component';
import { ReviewsComponent } from './dashbroad/pages/reviews/reviews.component';
import { SchemeProtectComponent } from './dashbroad/pages/scheme-protect/scheme-protect.component';
import { ContactsComponent } from './dashbroad/pages/contacts/contacts.component';
import { MessagesComponent } from './dashbroad/pages/messages/messages.component';
import { ManualComponent } from './dashbroad/pages/manual/manual.component';
import { AnalyticsComponent } from './dashbroad/pages/analytics/analytics.component';
import { DevicesComponent } from './dashbroad/pages/devices/devices.component';
import { SettingsComponent } from './dashbroad/pages/settings/settings.component';
import { SzrComponent } from './dashbroad/pages/products/szr/szr.component';
import { SeedsComponent } from './dashbroad/pages/products/seeds/seeds.component';
import { SalesComponent } from './dashbroad/pages/products/sales/sales.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },  
  { path: 'dashbroad', component: DashbroadComponent, canActivate: [AuthGuard],
    children: [
      { path: 'products',
        children: [
          { path: 'szr',   component: SzrComponent},
          { path: 'seeds', component: SeedsComponent},
          { path: 'sales', component: SalesComponent}
        ]
      },
      { path: 'users',          component: UsersComponent},
      { path: 'activity',       component: ActivityComponent},
      { path: 'reviews',        component: ReviewsComponent},
      { path: 'scheme-protect', component: SchemeProtectComponent},
      { path: 'contacts',       component: ContactsComponent},
      { path: 'messages',       component: MessagesComponent},
      { path: 'manual',         component: ManualComponent},
      { path: 'analytics',      component: AnalyticsComponent},
      { path: 'devices',        component: DevicesComponent},
      { path: 'settings',       component: SettingsComponent},
    ]
  },
  // { path: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{useHash: true, enableTracing: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
