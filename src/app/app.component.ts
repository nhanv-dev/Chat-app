//src\app\app.component.ts
import {Component} from '@angular/core';
import {WebsocketService} from "./services/websocket.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
  providers: [WebsocketService]
})

export class AppComponent {
  title = 'App chat';
  content = '';
  received = [];
  sent = [];

  constructor(private WebsocketService: WebsocketService) {
    WebsocketService.messages.subscribe(msg => {
      // @ts-ignore
      this.received.push(msg);
      console.log("Response from websocket: " + msg);
    });
  }

  sendMsg() {
    let message = {
      action: 'onchat',
      data: {
        event: 'LOGIN',
        data: {user: 'long', pass: '12345'}
      }
    };

    // @ts-ignore
    this.sent.push(message);
    // @ts-ignore
    this.WebsocketService.messages.next(message);
  }
}
