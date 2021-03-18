import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import {FormsModule} from '@angular/forms'
import {HttpClientModule} from '@angular/common/http';
import { JwtHelperService, JWT_OPTIONS } from "@auth0/angular-jwt";
import { LoginComponent } from './login/login.component';
import { ListEmployeesComponent } from './list-employees/list-employees.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { ViewEmployeeDetailsComponent } from './view-employee-details/view-employee-details.component'

@NgModule({
  declarations: [
    AppComponent,
    SignUpComponent,
    LoginComponent,
    ListEmployeesComponent,
    NavbarComponent,
    SidebarComponent,
    ViewEmployeeDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [{ provide: JWT_OPTIONS, useValue: JWT_OPTIONS }, JwtHelperService],
  bootstrap: [AppComponent]
})
export class AppModule { }
