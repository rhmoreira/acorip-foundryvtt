import { CanvasHookCallbacks } from "../lib/types/acoriPTypes";

function hookUp(canvasCallbacks: CanvasHookCallbacks = {}): void {
    Hooks.on("canvasReady", canvas => {
        canvasCallbacks.ready?.(canvas)
        canvasCallbacks.tokens?.(...loadTokenServices(canvas))
    });
}

function loadTokenServices(_: Canvas): TokenDocument[] {
    return game.scenes?.current?.tokens.map(token => token);
}

export default {hookUp}