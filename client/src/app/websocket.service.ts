import { inject, Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';

export interface ChatMessage {
  type: 'message' | 'join' | 'leave';
  user: string;
  content: string;
  timestamp: number;
}

@Injectable({
  providedIn: 'root',
})
export class WebsocketService {
  private socket: WebSocket | null = null;

  username = signal<string>('');

  messages = signal<ChatMessage[]>([]);

  constructor(private router: Router) {
    this.loadSession();
  }

  private loadSession() {
    const savedUsername = localStorage.getItem('username');

    if (savedUsername) {

      this.connect(savedUsername);

      this.loadChatMessages();
    } else {
      this.router.navigate(['/']);
    }
  }

  loadChatMessages() {
    const savedMessages = localStorage.getItem('messages');
    if (savedMessages) {
      this.messages.set(JSON.parse(savedMessages));
    }
  }

  connect(username: string) {
    localStorage.setItem('username', username);
    this.username.set(username);
    this.socket = new WebSocket('ws://localhost:8080');

    this.socket.onopen = () => {
      this.joinChat();
    };

    this.socket.onmessage = (event) => {
      const message = JSON.parse(event.data) as ChatMessage;

      this.messages.update((oldMessages) => {
        const messages = [...oldMessages, message];

        localStorage.setItem('messages', JSON.stringify(messages));

        return messages;
      });
    };

    this.socket.onclose = () => {
      this.socket = null;
      console.log('WebSocket connection closed');
    };
  }

  sendChatMessage(content: string) {
    const message: ChatMessage = {
      type: 'message',
      user: this.username(),
      content,
      timestamp: Date.now(),
    };

    this.sendMessage(message);
  }

  private joinChat() {
    const joinMessage: ChatMessage = {
      type: 'join',
      user: this.username(),
      timestamp: Date.now(),
      content: `${this.username()} se unió al chat`,
    };

    this.sendMessage(joinMessage);
  }

  private sendMessage(message: ChatMessage) {
    if (this.socket && this.socket.readyState === WebSocket.OPEN) {
      this.socket.send(JSON.stringify(message));
    }
  }

  logOut() {
    if (this.socket) {
      this.socket.close();
      this.username.set('');
      this.router.navigateByUrl('/');
      this.messages.set([]);
      localStorage.removeItem('username');
      localStorage.removeItem('messages');
    }
  }
}
