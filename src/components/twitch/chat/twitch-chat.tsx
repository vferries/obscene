import { Component, h, State } from '@stencil/core';
import tmi from 'tmi.js';
import { TMI_OAUTH_TOKEN, TMI_USER } from '../../../global/constants';

type Message = { user: string, message: string };

// Define configuration options
const opts = {
  identity: {
    username: TMI_USER,
    password: TMI_OAUTH_TOKEN,
  },
  channels: ['enveillecode'],
};

@Component({
  tag: 'obs-twitch-chat',
  styleUrl: 'twitch-chat.css',
  shadow: true,
})
export class MyComponent {
  @State() messages: Message[];
  client: tmi.Client;

  onMessageHandler(_target: string, context: any, msg: any, self: boolean) {
    if (self) {
      return;
    } // Ignore messages from the bot

    console.log('Received one new message', _target, context, msg, self, this.getMessageHTML(msg.trim(), context.emotes));
    // Remove whitespace from chat message
    const user = context['display-name'];
    const { emotes } = context;
    this.messages = [...this.messages, { message: this.getMessageHTML(msg.trim(), emotes), user: user }];
  }

  onConnectedHandler(addr: string, port: string) {
    console.log(`* Connected to ${addr}:${port}`);
  }

  componentWillLoad() {
    this.messages = [];
    // Create a client with our options
    this.client = new tmi.client(opts);

    // Register our event handlers (defined below)
    this.client.on('message', this.onMessageHandler.bind(this));
    this.client.on('connected', this.onConnectedHandler.bind(this));

    // Connect to Twitch:
    this.client.connect();
  }

  getMessageHTML(message, emotes) {
    if (!emotes) return message;

    // store all emote keywords
    // ! you have to first scan through
    // the message string and replace later
    const stringReplacements = [];

    // iterate of emotes to access ids and positions
    for (let id of Object.keys(emotes)) {
      // use only the first position to find out the emote key word
      const positions = emotes[id];
      const position = positions[0];
      const [start, end] = position.split('-');
      const stringToReplace = message.substring(
        parseInt(start, 10),
        parseInt(end, 10) + 1,
      );

      stringReplacements.push({
        stringToReplace: stringToReplace,
        replacement: `<img src='https://static-cdn.jtvnw.net/emoticons/v1/${id}/3.0' alt='${stringToReplace}'>`,
      });
    }

    // generate HTML and replace all emote keywords with image elements
    return stringReplacements.reduce(
      (acc, { stringToReplace, replacement }) => {
        // obs browser doesn't seam to know about replaceAll
        return acc.split(stringToReplace).join(replacement);
      },
      message,
    );
  }

  render() {
    return (<div>
      {this.messages.map(message =>
        <p class='message'>
          {message.user}: <span innerHTML={message.message} />
        </p>,
      )}
    </div>);
  }
}

