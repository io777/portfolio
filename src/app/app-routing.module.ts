import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from './admin/login/login.component';
import {HomeComponent} from './home/home.component';
import {ContactComponent} from './contact/contact.component';
import {DashboardComponent} from './admin/dashboard/dashboard.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'contact', component: ContactComponent},
  {path: 'admin', component: DashboardComponent},
  {path: 'login', component: LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
