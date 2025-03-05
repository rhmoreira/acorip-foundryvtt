import { TokenHandler } from "./feats/TokenHandler";
import CanvasHooking from "./hooking/CanvasHooking";
import RenderTokenHUDHooking from "./hooking/RenderTokenHUDHooking";

export default class RHM extends Application {

    constructor() {
        super();
    }

    public init(): void {
        CanvasHooking.hookUp();
        RenderTokenHUDHooking.hookUp();
    }

    public static getTokenHandlerById(tokenHandlers: TokenHandler[], id: string): TokenHandler | undefined {
        return tokenHandlers.find(handler => handler.getToken().id === id)
    }
}