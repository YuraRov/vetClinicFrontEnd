import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MessagingPageComponent } from './components/messaging-page/messaging-page.component';
import { MessageComponent } from './components/message/message.component';
import { ChatWindowComponent } from './components/chat-window/chat-window.component';
import { ChatPreviewComponent } from './components/chat-preview/chat-preview.component';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatBadgeModule } from '@angular/material/badge';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MessagingRoutingModule } from './messaging-routing.module';
import { ObserveVisibilityDirective } from 'src/app/attribute-directives/observe-visibility.directive'


@NgModule({
  declarations: [
    MessagingPageComponent,
    ChatWindowComponent,
    MessageComponent,
    ChatPreviewComponent,
    ObserveVisibilityDirective
  ],
  imports: [
    CommonModule,
    FormsModule,
    MatIconModule,
    MatBadgeModule,
    MessagingRoutingModule,
    MatDividerModule,
    MatInputModule,
    MatButtonModule
  ]
})
export class MessagingModule { }
