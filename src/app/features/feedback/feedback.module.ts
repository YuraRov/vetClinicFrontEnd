import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeedbacksComponent } from './feedbacks/feedbacks.component';
import { FeedbackAddComponent } from './feedback-add/feedback-add.component';
import {FeedbackRoutingModule} from "./feedback-routing-module";
import {MatTableModule} from "@angular/material/table";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatRadioModule} from "@angular/material/radio";
import {MatIconModule} from "@angular/material/icon";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {MatExpansionModule} from "@angular/material/expansion";
import {MatPaginatorModule} from "@angular/material/paginator";



@NgModule({
  declarations: [
    FeedbacksComponent,
    FeedbackAddComponent
  ],
    imports: [
        CommonModule,
        FeedbackRoutingModule,
        MatTableModule,
        FormsModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatRadioModule,
        MatIconModule,
        MatInputModule,
        MatButtonModule,
        MatExpansionModule,
        MatPaginatorModule
    ]
})
export class FeedbackModule { }
