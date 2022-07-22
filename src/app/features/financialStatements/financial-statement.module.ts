import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from "../../shared/shared.module";
import { MatTableModule } from '@angular/material/table'
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatPaginatorModule } from '@angular/material/paginator';
import { FileSaverModule } from 'ngx-filesaver';


import { FinancialStatementRoutingModule } from './financial-statement-routing.module';
import { FinancialStatementPageComponent } from './Components/financial-statement-page/financial-statement-page.component';
import { FinancialStatementResultComponent } from './Components/financial-statement-result/financial-statement-result.component';


@NgModule({
  declarations: [
    FinancialStatementPageComponent,
    FinancialStatementResultComponent
  ],
  imports: [
    CommonModule,
    FinancialStatementRoutingModule,
    SharedModule,
    MatDatepickerModule,
    MatNativeDateModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatTableModule,
    MatListModule,
    MatExpansionModule,
    MatPaginatorModule,
    FileSaverModule
  ]
})
export class FinancialStatementModule { }
