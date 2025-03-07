import { CanvasHookCallbacks } from "../lib/types/acoriPTypes";

function hookUp(canvasCallbacks: CanvasHookCallbacks): void {
        Hooks.on("canvasReady", canvas => {
            canvasCallbacks.ready.tokens(...config(canvas))
        });
}

function config(_: Canvas): TokenDocument[] {
    return loadTokenServices(_);
}

function loadTokenServices(_: Canvas): TokenDocument[] {
    return game.scenes?.current?.tokens.map(token => token);
}

export default {hookUp}