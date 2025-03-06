import { Component } from '@angular/core';
import { MessageComponent } from './components/message.component';

@Component({
  selector: 'app-chat',
  imports: [MessageComponent],
  templateUrl: './chat.component.html',

})
export default class ChatComponent {

}
