import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HeaderComponent} from "./header/header.component";
import {FooterComponent} from "./footer/footer.component";
import {MatIconModule} from "@angular/material/icon";
import {RouterModule} from "@angular/router";
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatBadgeModule } from '@angular/material/badge'

@NgModule({
  declarations: [HeaderComponent,FooterComponent],
  exports: [HeaderComponent,FooterComponent],
  imports: [
    CommonModule,
    MatIconModule,
    RouterModule,
    MatButtonModule,
    MatToolbarModule,
    MatBadgeModule
  ]
})
export class LayoutModule { }
