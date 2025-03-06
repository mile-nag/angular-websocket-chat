import { WebsocketService } from './../websocket.service';
import { Component, inject } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',

})

export default class LoginComponent {

  username = new FormControl('');

  constructor(
    private websocketService: WebsocketService,
    private route: Router
  ) { }

  goToChat() {
    const username = this.username.value;
    if (!username) return;
    this.websocketService.connect(username);
    this.route.navigate(['/chat']);
  }
}
