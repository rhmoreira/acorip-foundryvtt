import { TokenService } from "../lib/service/TokenService";
import { CanvasHookCallbacks } from "../lib/types/acoriPTypes";

function hookUp(canvasCallbacks: CanvasHookCallbacks): void {
        Hooks.on("canvasReady", canvas => {
            canvasCallbacks.ready.tokenServices(config(canvas))
        });
}

function config(_: Canvas): TokenService[] {
    return loadTokenServices(_);
}

function loadTokenServices(_: Canvas): TokenService[] {
    let tokenServices: TokenService[];
    let currentUser = game.users?.current;
    let userCharacter = currentUser?.character;
    
    if (currentUser?.isGM)
        tokenServices = game.scenes?.current?.tokens?.map(token => new TokenService(token));
    else if (currentUser?.hasPlayerOwner && !!userCharacter)
        tokenServices = game.scenes?.current?.tokens
            ?.filter(token => token.actor?.id === userCharacter.id)
            .map(token => new TokenService(token));
    
    return tokenServices;
}

export default {hookUp}