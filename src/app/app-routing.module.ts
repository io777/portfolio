import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from './admin/login/login.component';
import {HomeComponent} from './home/home.component';
import {ContactComponent} from './contact/contact.component';
import {DashboardComponent} from './admin/dashboard/dashboard.component';
import {AuthGuard} from './auth/auth.guard';
import {AdminComponent} from './admin/admin.component';
import {ProjectComponent} from './admin/project/project.component';
import {ArticleComponent} from './admin/article/article.component';
import {PagenotfoundComponent} from './pagenotfound/pagenotfound.component';
import {ProjUpdateComponent} from './admin/project/proj-update/proj-update.component';
import {ProjListComponent} from './admin/project/proj-list/proj-list.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'contact', component: ContactComponent},
  {path: 'admin', component: AdminComponent, children: [
      {
        path: '',
        component: DashboardComponent
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
  {path: '**', component: PagenotfoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
