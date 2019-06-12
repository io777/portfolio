import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { environment } from '../environments/environment';

import { HttpClientModule } from '@angular/common/http';
import { AngularFirestore } from '@angular/fire/firestore';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { LoginComponent } from './admin/login/login.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { ContactComponent } from './contact/contact.component';
import {AngularFireAuth, AngularFireAuthModule} from '@angular/fire/auth';
import {AngularFontAwesomeModule} from 'angular-font-awesome';
import { ArticleComponent } from './admin/article/article.component';
import { AdminHeaderComponent } from './admin/admin-header/admin-header.component';
import {AdminComponent} from './admin/admin.component';
import { ProjectComponent } from './admin/project/project.component';
import { ProjCreateComponent } from './admin/project/proj-create/proj-create.component';
import { ProjUpdateComponent } from './admin/project/proj-update/proj-update.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { ProjListComponent } from './admin/project/proj-list/proj-list.component';
import {CommonModule} from '@angular/common';
import {CKEditorModule} from '@ckeditor/ckeditor5-angular';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    LoginComponent,
    DashboardComponent,
    ContactComponent,
    ArticleComponent,
    AdminHeaderComponent,
    AdminComponent,
    ProjectComponent,
    ProjCreateComponent,
    ProjUpdateComponent,
    PagenotfoundComponent,
    ProjListComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule,
    HttpClientModule,
    AngularFontAwesomeModule,
    AngularFireAuthModule,
    ReactiveFormsModule,
    CKEditorModule
  ],
  providers: [AngularFirestore, AngularFireAuth],
  bootstrap: [AppComponent]
})
export class AppModule { }
