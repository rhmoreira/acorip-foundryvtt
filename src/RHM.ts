import { PlayerTokenHandler } from "./feats/TokenHandler";
import CanvasHooking from "./hooking/CanvasHooking";
import RenderTokenHUDHooking from "./hooking/RenderTokenHUDHooking";
import { templateFactory } from "./templates/TemplateFactory";

const MODULE_ID: string = "acorip";
const FLAGS = {
    INVALID_TOKEN: "Invalid Token",
    NETRUNNING: "Netrunning"
}

class RHM {

    private static game: any;

    private constructor() {}

    public static init(): void {
        RHM.game = <any> game;
        RHM.game.acorip = {};
        
        templateFactory.init();
        CanvasHooking.hookUp();
        RenderTokenHUDHooking.hookUp();
    }

    public static setPlayerTokenHandlers(tokenHandlers: PlayerTokenHandler[]): void {
        if (!RHM.game.acorip.handlers) RHM.game.acorip.handlers = {};
        
        RHM.game.acorip.handlers.playerTokenHandlers = tokenHandlers;
    }

    public static getPlayerTokenHandlers(): PlayerTokenHandler[] {
        return RHM.game.acorip.handlers.playerTokenHandlers;
    }

    public static getTokenHandlerById(tokenId: string): PlayerTokenHandler {
        return this.getPlayerTokenHandlers().find(handler => handler.getId() === tokenId);
    }

    public static getTokenHandlerByUser(user: User): PlayerTokenHandler {
        return this.getPlayerTokenHandlers().find(handler => handler.isOwner(user));
    }

}

export {
    RHM,
    MODULE_ID,
    FLAGS
}