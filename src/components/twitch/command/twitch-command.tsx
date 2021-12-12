import {Component, h, State} from '@stencil/core';
import tmi from 'tmi.js';
import OBSWebSocket from 'obs-websocket-js/dist/obs-websocket';

type Message = { user: string, message: string };

// Define configuration options
const opts = {
  identity: {
    username: process.env.TMI_USER,
    password: process.env.TMI_OAUTH_TOKEN,
  },
  channels: ['enveillecode'],
};

@Component({
  tag: 'obs-twitch-command',
  styleUrl: 'twitch-command.css',
  shadow: true,
})
export class MyComponent {
  @State() messages: Message[];
  @State() sceneItems = [];
  client: tmi.Client;
  obs: OBSWebSocket;

  onMessageHandler(_target: string, context: any, msg: any, self: boolean) {
    if (self) {
      return;
    } // Ignore messages from the bot

    console.log('Received one new message', _target, context, msg, self);

    if (msg === '!commands') {
      console.log('On tente de répondre...');
      this.client.say('enveillecode', 'You can use !ide or !browser to switch from one view to the other.')
        .then(() => console.log('sent'));
    }
    if (msg === '!ide') {
      this.obs.send('SetSceneItemProperties', {item: 'IDEA', visible: true});
      this.obs.send('SetSceneItemProperties', {item: 'Navigateur', visible: false});
    }
    if (msg === '!navigateur' || msg === '!browser') {
      this.obs.send('SetSceneItemProperties', {item: 'IDEA', visible: false});
      this.obs.send('SetSceneItemProperties', {item: 'Navigateur', visible: true});
    }
  }

  onConnectedHandler(addr: string, port: string) {
    console.log(`* Connected to ${addr}:${port}`);
  }

  componentWillLoad() {
    // Create a client with our options
    this.client = new tmi.client(opts);

    // Register our event handlers (defined below)
    this.client.on('message', this.onMessageHandler.bind(this));
    this.client.on('connected', this.onConnectedHandler.bind(this));

    // Connect to Twitch:
    this.client.connect();

    this.obs = new OBSWebSocket();
    this.obs.connect({
      address: 'localhost:4444',
    });

    this.obs.on('ConnectionOpened', () => {
      //https://github.com/obsproject/obs-websocket/blob/4.x-current/docs/generated/protocol.md#sceneitem render
      this.obs.send('GetSceneItemList').then(data => {
        console.log('Received data', data);
        this.sceneItems = data.sceneItems;
      });
    });
  }

  render() {
    return (<div class='obs-commands'>
      <ul>
        {this.sceneItems.map(sceneItem =>
          <li>
            {sceneItem.sourceName}
          </li>)}
      </ul>
    </div>);
  }
}

