import { Component, h } from '@stencil/core';

@Component({
  tag: 'obs-home',
  styleUrl: 'obs-home.css',
  shadow: true,
})
export class ObsHome {
  render() {
    return (
      <div class="obs-home">
        <p>
          Welcome to the Stencil App Starter. You can use this starter to build entire apps all with web components using Stencil! Check out our docs on{' '}
          <a href="https://stenciljs.com">stenciljs.com</a> to get started.
        </p>

        <stencil-route-link url="/scenes">
          <button>OBS Scenes</button>
        </stencil-route-link>

        <stencil-route-link url="/chat">
          <button>Twitch chat</button>
        </stencil-route-link>

        <stencil-route-link url="/command">
          <button>Twitch command</button>
        </stencil-route-link>
      </div>
    );
  }
}
