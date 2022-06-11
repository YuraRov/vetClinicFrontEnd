import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatRadioModule} from '@angular/material/radio'
import { MatIconModule } from '@angular/material/icon';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { ProceduresPageComponent } from './components/procedureComponents/procedures-page/procedures-page.component';
import { SpecializationListComponent } from './components/specilizationComponents/specialization-list/specialization-list.component';
import {MatExpansionModule} from "@angular/material/expansion";
import { SpecializationItemComponent } from './components/specilizationComponents/specialization-item/specialization-item.component';

const appRoutes: Routes = [
  {
    path: '',
    component: ProceduresPageComponent
  },
  {
    path: 'procedures',
    component: ProceduresPageComponent
  },

  {
    path:'specializations',
    component: SpecializationListComponent
  }
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    ProceduresPageComponent,
    SpecializationListComponent,
    SpecializationItemComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    RouterModule.forRoot(appRoutes),
    MatRadioModule,
    MatIconModule,
    HttpClientModule,
    MatExpansionModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
