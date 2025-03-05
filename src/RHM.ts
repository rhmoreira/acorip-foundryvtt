import { PlayerTokenHandler } from "./feats/TokenHandler";
import CanvasHooking from "./hooking/CanvasHooking";
import RenderTokenHUDHooking from "./hooking/RenderTokenHUDHooking";

export default class RHM {

    private static game: any = game as any;

    private constructor() {}

    public static init(): void {
        CanvasHooking.hookUp();
        RenderTokenHUDHooking.hookUp();
    }

    public static setPlayerTokenHandlers(tokenHandlers: PlayerTokenHandler[]): void {
        if (!RHM.game.acorip.handlers) RHM.game.acorip.handlers = {};
        
        RHM.game.acorip.handlers.playerTokenHandlers = tokenHandlers;
    }

    public static getPlayerTokenHandlers(): PlayerTokenHandler[] {
        return RHM.game?.acorip?.handlers?.playerTokenHandlers || [];
    }

    public static getTokenHandlerForUser(user: User): PlayerTokenHandler {
        return this.getPlayerTokenHandlers().find(handler => handler.isOwner(user));
    }

}