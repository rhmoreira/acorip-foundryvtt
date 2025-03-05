import { PlayerTokenHandler } from "../feats/TokenHandler";

function hookUp(){
    Hooks.on("canvasReady", config)
}

function config(_: Canvas) {
    let tokenHandlers = null;
    let currentUser = game.users?.current;
    let userCharacter = currentUser?.character;
    
    if (currentUser?.isGM)
        tokenHandlers = game.scenes?.current?.tokens?.map(token => new PlayerTokenHandler(token));
    else if (currentUser?.hasPlayerOwner)
        tokenHandlers = game.scenes?.current?.tokens
            ?.filter(token => token.actor?.id === userCharacter?.id)
            .map(token => new PlayerTokenHandler(token));

    game.acorip.playerTokenHandlers = tokenHandlers;
}
export default {hookUp}