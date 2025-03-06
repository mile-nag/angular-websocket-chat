import { Component, inject } from '@angular/core';
import { MessageComponent } from './components/message.component';
import { WebsocketService } from '../websocket.service';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-chat',
  imports: [MessageComponent, ReactiveFormsModule],
  templateUrl: './chat.component.html',

})
export default class ChatComponent {

  private websocketService = inject(WebsocketService);
  messages = this.websocketService.messages;

  messageControl = new FormControl('');

  username = this.websocketService.username;

  sendMessage() {
    const value = this.messageControl.value;

    if (!value) return;

    this.websocketService.sendChatMessage(value);
    this.messageControl.setValue('');

  }

  logout() {
    this.websocketService.logOut();
  }
}
