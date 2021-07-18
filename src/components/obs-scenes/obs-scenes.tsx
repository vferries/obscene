import { Component, h, State } from '@stencil/core';
import OBSWebSocket from 'obs-websocket-js/dist/obs-websocket';

@Component({
  tag: 'obs-scenes',
  styleUrl: 'obs-scenes.css',
  shadow: true,
})
export class ObsScenes {
  @State() scenes = [];
  obs: OBSWebSocket;
  componentWillLoad() {
    this.obs = new OBSWebSocket();
    this.obs.connect({
      address: 'localhost:4444',
    });

    this.obs.on('ConnectionOpened', () => {
      this.obs.send('GetSceneList').then(data => {
        console.log('Received data', data);
        this.scenes = data.scenes;
      });
    });
  }

  switchScene(name: String) {
    this.obs.send('SetCurrentScene', {
      'scene-name': name
    });
  }

  render() {
    return (
      <div class='obs-scenes'>
        {this.scenes.map(scene =>
          <div class='scene' onClick={() => this.switchScene(scene.name)}>
            {scene.name}
          </div>,
        )}
      </div>
    );
  }
}
