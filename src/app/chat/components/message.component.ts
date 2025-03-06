import { NgClass } from '@angular/common';
import { Component, input, Input } from '@angular/core';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  imports: [NgClass]
})
export class MessageComponent {

  myMessage = input<boolean>(false);

  constructor() { }
}
