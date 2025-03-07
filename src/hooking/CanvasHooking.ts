import { TokenManager } from "../lib/TokenManager";

function hookUp(): Promise<TokenManager[]>{
    return new Promise((resolve, _) => {
        Hooks.on("canvasReady", (canvas) => resolve(config(canvas)) );
    })
}

function config(_: Canvas): TokenManager[] {
    return loadTokenManagers(_);
}

function loadTokenManagers(_: Canvas): TokenManager[] {
    let tokenManagers: TokenManager[];
    let currentUser = game.users?.current;
    let userCharacter = currentUser?.character;
    
    if (currentUser?.isGM)
        tokenManagers = game.scenes?.current?.tokens?.map(token => new TokenManager(token));
    else if (currentUser?.hasPlayerOwner && !!userCharacter)
        tokenManagers = game.scenes?.current?.tokens
            ?.filter(token => token.actor?.id === userCharacter.id)
            .map(token => new TokenManager(token));
    
    return tokenManagers;
}

export default {hookUp}