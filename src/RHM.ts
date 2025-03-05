import { PlayerTokenManager } from "./feats/TokenManager";
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

    public static setPlayerTokenManagers(tokenManagers: PlayerTokenManager[]): void {
        if (!RHM.game.acorip.managers) RHM.game.acorip.managers = {};
        
        RHM.game.acorip.managers.playerTokenManagers = tokenManagers;
    }

    public static getPlayerTokenManagers(): PlayerTokenManager[] {
        return RHM.game.acorip.managers.playerTokenManagers;
    }

    public static getTokenManagerById(tokenId: string): PlayerTokenManager {
        return this.getPlayerTokenManagers().find(manager => manager.getId() === tokenId);
    }

    public static getTokenManagerByUser(user: User): PlayerTokenManager {
        return this.getPlayerTokenManagers().find(manager => manager.isOwner(user));
    }

}

export {
    RHM,
    MODULE_ID,
    FLAGS
}