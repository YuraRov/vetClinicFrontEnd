import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule} from "@angular/material/icon";
import { MatTabsModule} from "@angular/material/tabs";
import { ReactiveFormsModule } from "@angular/forms";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatButtonModule } from "@angular/material/button";
import { MatInputModule } from "@angular/material/input";
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { UserProfileRoutingModule } from "./user-profile-routing.module";

import { UserProfileInfoComponent } from './components/user-profile-info/user-profile-info.component';
import { UserBaseEditComponent } from './components/user-profile-edit/user-base-edit.component';
import { UserAddressEditComponent } from './components/user-profile-edit/user-address-edit/user-address-edit.component';
import { UserPortfolioEditComponent } from './components/user-profile-edit/user-portfolio-edit/user-portfolio-edit.component';

import { ConfirmDeletionDialogComponent } from './components/user-profile-edit/confirm-deletion-dialog/confirm-deletion-dialog.component';
import { MatDialogModule } from "@angular/material/dialog";

import { AnimalModule } from "../animal/animal.module";
import {SharedModule} from "../../shared/shared.module";

@NgModule({
  declarations: [
    UserProfileInfoComponent,
    UserBaseEditComponent,
    UserAddressEditComponent,
    UserPortfolioEditComponent,
    ConfirmDeletionDialogComponent
  ],
  imports: [
    CommonModule,
    MatIconModule,
    MatTabsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatButtonModule,
    MatInputModule,
    MatSnackBarModule,
    UserProfileRoutingModule,
    MatDialogModule,
    AnimalModule,
    SharedModule
  ]
})
export class UserProfileModule { }
