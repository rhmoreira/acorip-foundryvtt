import { PlayerTokenManager } from "../feats/TokenManager";
import { RHM } from "../RHM";

function hookUp(){
    Hooks.on("canvasReady", config)
}

function config(_: Canvas) {
    loadTokenHandlers(_);
}

function loadTokenHandlers(_: Canvas): void {
    let tokenHandlers: PlayerTokenManager[];
    let currentUser = game.users?.current;
    let userCharacter = currentUser?.character;
    
    if (currentUser?.isGM)
        tokenHandlers = game.scenes?.current?.tokens?.map(token => new PlayerTokenManager(token));
    else if (currentUser?.hasPlayerOwner && !!userCharacter)
        tokenHandlers = game.scenes?.current?.tokens
            ?.filter(token => token.actor?.id === userCharacter.id)
            .map(token => new PlayerTokenManager(token));
    
    RHM.setPlayerTokenManagers(tokenHandlers);
}

export default {hookUp}