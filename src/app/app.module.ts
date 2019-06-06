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
import { ListComponent } from './admin/project/list/list.component';
import { CreateComponent } from './admin/project/create/create.component';
import { UpdateComponent } from './admin/project/update/update.component';
import {AngularFireAuth, AngularFireAuthModule} from '@angular/fire/auth';
import {AngularFontAwesomeModule} from 'angular-font-awesome';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    LoginComponent,
    DashboardComponent,
    ContactComponent,
    ListComponent,
    CreateComponent,
    UpdateComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule,
    HttpClientModule,
    AngularFontAwesomeModule,
    AngularFireAuthModule,
    ReactiveFormsModule
  ],
  providers: [AngularFirestore, AngularFireAuth],
  bootstrap: [AppComponent]
})
export class AppModule { }
