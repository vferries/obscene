/* eslint-disable */
/* tslint:disable */
/**
 * This is an autogenerated file created by the Stencil compiler.
 * It contains typing information for all components that exist in this project.
 */
import { HTMLStencilElement, JSXBase } from "@stencil/core/internal";
export namespace Components {
    interface ObsHome {
    }
    interface ObsRoot {
    }
    interface ObsScenes {
    }
    interface ObsTwitchChat {
    }
}
declare global {
    interface HTMLObsHomeElement extends Components.ObsHome, HTMLStencilElement {
    }
    var HTMLObsHomeElement: {
        prototype: HTMLObsHomeElement;
        new (): HTMLObsHomeElement;
    };
    interface HTMLObsRootElement extends Components.ObsRoot, HTMLStencilElement {
    }
    var HTMLObsRootElement: {
        prototype: HTMLObsRootElement;
        new (): HTMLObsRootElement;
    };
    interface HTMLObsScenesElement extends Components.ObsScenes, HTMLStencilElement {
    }
    var HTMLObsScenesElement: {
        prototype: HTMLObsScenesElement;
        new (): HTMLObsScenesElement;
    };
    interface HTMLObsTwitchChatElement extends Components.ObsTwitchChat, HTMLStencilElement {
    }
    var HTMLObsTwitchChatElement: {
        prototype: HTMLObsTwitchChatElement;
        new (): HTMLObsTwitchChatElement;
    };
    interface HTMLElementTagNameMap {
        "obs-home": HTMLObsHomeElement;
        "obs-root": HTMLObsRootElement;
        "obs-scenes": HTMLObsScenesElement;
        "obs-twitch-chat": HTMLObsTwitchChatElement;
    }
}
declare namespace LocalJSX {
    interface ObsHome {
    }
    interface ObsRoot {
    }
    interface ObsScenes {
    }
    interface ObsTwitchChat {
    }
    interface IntrinsicElements {
        "obs-home": ObsHome;
        "obs-root": ObsRoot;
        "obs-scenes": ObsScenes;
        "obs-twitch-chat": ObsTwitchChat;
    }
}
export { LocalJSX as JSX };
declare module "@stencil/core" {
    export namespace JSX {
        interface IntrinsicElements {
            "obs-home": LocalJSX.ObsHome & JSXBase.HTMLAttributes<HTMLObsHomeElement>;
            "obs-root": LocalJSX.ObsRoot & JSXBase.HTMLAttributes<HTMLObsRootElement>;
            "obs-scenes": LocalJSX.ObsScenes & JSXBase.HTMLAttributes<HTMLObsScenesElement>;
            "obs-twitch-chat": LocalJSX.ObsTwitchChat & JSXBase.HTMLAttributes<HTMLObsTwitchChatElement>;
        }
    }
}
