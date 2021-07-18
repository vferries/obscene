import { Component, h } from '@stencil/core';

@Component({
  tag: 'obs-root',
  styleUrl: 'obs-root.css',
  shadow: true,
})
export class ObsRoot {
  render() {
    return (
      <div>
        <main>
          <stencil-router>
            <stencil-route-switch scrollTopOffset={0}>
              <stencil-route url="/" component="obs-home" exact={true} />
              <stencil-route url="/scenes" component="obs-scenes" />
              <stencil-route url="/chat" component="obs-twitch-chat" />
            </stencil-route-switch>
          </stencil-router>
        </main>
      </div>
    );
  }
}
