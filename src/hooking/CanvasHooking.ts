import { PlayerTokenManager } from "../feats/TokenManager";

function hookUp(): Promise<PlayerTokenManager[]>{
    return new Promise((resolve, _) => {
        Hooks.on("canvasReady", (canvas) => {
            let managers = config(canvas);
            resolve(managers);
        });
    })
}

function config(_: Canvas): PlayerTokenManager[] {
    return loadTokenManagers(_);
}

function loadTokenManagers(_: Canvas): PlayerTokenManager[] {
    let tokenManagers: PlayerTokenManager[];
    let currentUser = game.users?.current;
    let userCharacter = currentUser?.character;
    
    if (currentUser?.isGM)
        tokenManagers = game.scenes?.current?.tokens?.map(token => new PlayerTokenManager(token));
    else if (currentUser?.hasPlayerOwner && !!userCharacter)
        tokenManagers = game.scenes?.current?.tokens
            ?.filter(token => token.actor?.id === userCharacter.id)
            .map(token => new PlayerTokenManager(token));
    
    return tokenManagers;
}

export default {hookUp}