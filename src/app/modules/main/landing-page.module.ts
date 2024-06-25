import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LandingPageRoutingModule } from './landing-page-routing.module';
import { LandingPageComponent } from './landing-page.component';
import { LoginComponent } from './components/login/login.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/assets/material.module';
import { HomeComponent } from './components/home/home.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ImportComponent } from './components/import/import.component';
import { ViewComponent } from './components/view/view.component';
import { ContactusComponent } from './components/contactus/contactus.component';


@NgModule({
  declarations: [
    LandingPageComponent,
    LoginComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    DashboardComponent,
    ImportComponent,
    ViewComponent,
    ContactusComponent
  ],
  imports: [
    CommonModule,
    LandingPageRoutingModule,
    ReactiveFormsModule,
    MaterialModule,
    FormsModule
  ]
})
export class LandingPageModule { }
