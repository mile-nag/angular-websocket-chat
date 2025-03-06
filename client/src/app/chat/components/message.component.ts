import { NgClass } from '@angular/common';
import { Component, input, Input } from '@angular/core';
import { ChatMessage } from '../../websocket.service';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  imports: [NgClass]
})
export class MessageComponent {

  myMessage = input<boolean>(false);

  message = input.required<ChatMessage>();

  constructor() { }
}
