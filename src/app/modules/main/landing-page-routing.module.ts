import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingPageComponent } from './landing-page.component';
import { AboutComponent } from './components/about/about.component';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HomeComponent } from './components/home/home.component';
import { DataComponent } from './components/data/data.component';
import { ImportComponent } from './components/import/import.component';
import { ViewComponent } from './components/view/view.component';
import { authGuard } from 'src/app/guards/auth.guard';
import { ContactusComponent } from './components/contactus/contactus.component';

const routes: Routes = [
  {
    path: '', component: LandingPageComponent,
    children: [
      { path: 'home', component: HomeComponent },
      { path: 'data', component: DataComponent },
      { path: 'dashboard', component: DashboardComponent, 
        canActivate: [authGuard]
      },
      { path: 'login', component: LoginComponent },
      { path: 'about', component: AboutComponent },
      { path: 'contact-us', component: ContactusComponent },
      { path: 'import', component: ImportComponent },
      { path: 'view', component: ViewComponent },
      { path: '**', redirectTo: 'home' }
    ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LandingPageRoutingModule { }
