import { PlayerTokenHandler } from "../feats/TokenHandler";
import RHM from "../RHM";

function hookUp(){
    Hooks.on("canvasReady", config)
}

function config(_: Canvas) {
    loadTokenHandlers(_);
}

function loadTokenHandlers(_: Canvas): void {
    let tokenHandlers: PlayerTokenHandler[];
    let currentUser = game.users?.current;
    let userCharacter = currentUser?.character;
    
    if (currentUser?.isGM)
        tokenHandlers = game.scenes?.current?.tokens?.map(token => new PlayerTokenHandler(token));
    else if (currentUser?.hasPlayerOwner && !!userCharacter)
        tokenHandlers = game.scenes?.current?.tokens
            ?.filter(token => token.actor?.id === userCharacter.id)
            .map(token => new PlayerTokenHandler(token));
    
    RHM.setPlayerTokenHandlers(tokenHandlers || []);
}

export default {hookUp}