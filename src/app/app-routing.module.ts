import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from './admin/login/login.component';
import {HomeComponent} from './main/home/home.component';
import {ContactComponent} from './main/contact/contact.component';
import {DashboardComponent} from './admin/dashboard/dashboard.component';
import {AuthGuard} from './auth/auth.guard';
import {AdminComponent} from './admin/admin.component';
import {ProjectComponent} from './admin/project/project.component';
import {ArticleComponent} from './admin/article/article.component';
import {PagenotfoundComponent} from './main/pagenotfound/pagenotfound.component';
import {ProjUpdateComponent} from './admin/project/proj-update/proj-update.component';
import {ProjListComponent} from './admin/project/proj-list/proj-list.component';
import {ProjCreateComponent} from './admin/project/proj-create/proj-create.component';
import {ProjecthomeComponent} from './main/projecthome/projecthome.component';
import {MainComponent} from './main/main.component';
import {AdminContactComponent} from './admin/admin-contact/admin-contact.component';
import {AdminContactListComponent} from './admin/admin-contact/admin-contact-list/admin-contact-list.component';
import {AdminContactCreateComponent} from './admin/admin-contact/admin-contact-create/admin-contact-create.component';
import {AdminContactUpdateComponent} from './admin/admin-contact/admin-contact-update/admin-contact-update.component';

const routes: Routes = [
  {path: 'admin', component: AdminComponent, children: [
      {
        path: '',
        component: DashboardComponent
      },
      {
        path: 'contacts',
        component: AdminContactComponent,
        children: [
          {
            path: '',
            component: AdminContactListComponent
          },
          {
            path: 'create',
            component: AdminContactCreateComponent
          },
          {
            path: ':id',
            component: AdminContactUpdateComponent
          }
        ]
      },
      {
        path: 'projects',
        component: ProjectComponent,
        children: [
          {
            path: '',
            component: ProjListComponent
          },
          {
            path: 'create',
            component: ProjCreateComponent
          },
          {
            path: ':id',
            component: ProjUpdateComponent
          }
        ]
      },
      {
        path: 'articles',
        component: ArticleComponent
      }
    ], canActivate: [AuthGuard]},
  {path: 'login', component: LoginComponent},
  {path: '', component: MainComponent, children: [
      {
        path: '',
        component: HomeComponent
      },
      {
        path: 'projects/:id',
        component: ProjecthomeComponent
      },
      {
        path: 'contact',
        component: ContactComponent
      },
      {
        path: '**',
        component: PagenotfoundComponent
      }
    ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
