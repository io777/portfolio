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
import { HomeComponent } from './main/home/home.component';
import { HeaderComponent } from './main/header/header.component';
import { FooterComponent } from './main/footer/footer.component';
import { LoginComponent } from './admin/login/login.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import {AngularFireAuth, AngularFireAuthModule} from '@angular/fire/auth';
import {AngularFontAwesomeModule} from 'angular-font-awesome';
import { ArticleComponent } from './admin/article/article.component';
import { AdminHeaderComponent } from './admin/admin-header/admin-header.component';
import {AdminComponent} from './admin/admin.component';
import { ProjectComponent } from './admin/project/project.component';
import { ProjCreateComponent } from './admin/project/proj-create/proj-create.component';
import { ProjUpdateComponent } from './admin/project/proj-update/proj-update.component';
import { PagenotfoundComponent } from './main/pagenotfound/pagenotfound.component';
import { ProjListComponent } from './admin/project/proj-list/proj-list.component';
import {CommonModule} from '@angular/common';
import {CKEditorModule} from '@ckeditor/ckeditor5-angular';
import {SimpleNotificationsModule} from 'angular2-notifications';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AngularFireStorage} from '@angular/fire/storage';
import { SearchPipe } from './_pipe/serach/search.pipe';
import { ProjecthomeComponent } from './main/projecthome/projecthome.component';
import { MainComponent } from './main/main.component';
import { AdminContactComponent } from './admin/admin-contact/admin-contact.component';
import { AdminContactListComponent } from './admin/admin-contact/admin-contact-list/admin-contact-list.component';
import { AdminContactUpdateComponent } from './admin/admin-contact/admin-contact-update/admin-contact-update.component';
import { AdminContactCreateComponent } from './admin/admin-contact/admin-contact-create/admin-contact-create.component';
import { ContactComponent } from './main/contact/contact.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    LoginComponent,
    DashboardComponent,
    ArticleComponent,
    AdminHeaderComponent,
    AdminComponent,
    ProjectComponent,
    ProjCreateComponent,
    ProjUpdateComponent,
    PagenotfoundComponent,
    ProjListComponent,
    SearchPipe,
    ProjecthomeComponent,
    MainComponent,
    AdminContactComponent,
    AdminContactListComponent,
    AdminContactUpdateComponent,
    AdminContactCreateComponent,
    ContactComponent
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
    CKEditorModule,
    BrowserAnimationsModule,
    SimpleNotificationsModule.forRoot({position: ['top', 'right'], timeOut: 2000})
  ],
  providers: [AngularFirestore, AngularFireAuth, AngularFireStorage],
  bootstrap: [AppComponent]
})
export class AppModule { }
