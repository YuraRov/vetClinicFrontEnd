import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ProceduresPageComponent } from './shared/components/procedureComponents/procedures-page/procedures-page.component';
import { LayoutModule } from "./layout/layout.module";
import { SharedModule } from "./shared/shared.module";

import { ExceptionPageComponent } from './shared/components/exceptionComponents/exception-page/exception-page.component';
import { ExceptionDetailPageComponent } from './shared/components/exceptionComponents/exception-detail-page/exception-detail-page.component';
import { AuthInterceptor } from './core/interceptors/auth.interceptor';
import { RolesGuard } from './helpers/roles-guard/roles.guard';
import { AuthGuard } from './helpers/auth-guard/auth.guard';
import { LoginComponent } from './shared/components/authComponents/login-page/login.component';
import { SignupComponent } from './shared/components/authComponents/signup-page/signup.component';
import { UnauthGuard } from './helpers/unauth-guard/unauth.guard';
import { SalaryPageComponent } from './shared/components/financeComponents/salary-page/salary-page.component';

import { MainAnimalComponent } from "./shared/components/animalComponents/main-animal/main-animal.component";

import {AboutComponent} from "./shared/about/about.component";
import {HomeComponent} from "./shared/home/home.component";
import {
  SpecializationListComponent
} from "./shared/components/specializationComponent/specialization-list/specialization-list.component";


const appRoutes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'procedures',
    component: ProceduresPageComponent,
  },
  {
    path: 'specializations',
    component: SpecializationListComponent,
    canActivate: [RolesGuard],
    data: {allowedRoles: ['Admin']}
  },
  {
    path: 'exceptions',
    component: ExceptionPageComponent,
    canActivate: [RolesGuard],
    data: {allowedRoles: ['Admin']}
  },
  {
    path: 'exceptions/:id',
    component:  ExceptionDetailPageComponent,
    canActivate: [RolesGuard],
    data: {allowedRoles: ['Admin']}
  },
  {
    path: 'auth/login',
    component: LoginComponent,
    canActivate: [UnauthGuard]
  },
  {
    path: 'auth/signup',
    component: SignupComponent,
    canActivate: [UnauthGuard]
  },
  {
    path: 'animals',
    component: MainAnimalComponent,
    canActivate: [AuthGuard]
  },
  {
    path:'about',
    component: AboutComponent
  },
  {
    path: 'salaries',
    component: SalaryPageComponent,
    canActivate: [RolesGuard],
    data: { allowedRoles: ['Accountant'] }
  }
];

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(appRoutes),
    HttpClientModule,
    LayoutModule,
    SharedModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
