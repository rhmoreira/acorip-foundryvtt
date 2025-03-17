import AcoripLog from "../../AcoripLog";
import { setService } from "../../config";
import { TOKEN_CONTROL_EVENTS } from "../../Constants";
import CanvasHooking from "../../hooking/CanvasHooking";
import TokenCRUDHooking from "../../hooking/TokenCRUDHooking";
import { TokenService } from "./TokenService";

class TokenServiceManager {

    private _services: Set<TokenService> = new Set<TokenService>();

    public get services(): readonly TokenService[] {return Array.from(this._services)};

    constructor() {}

    public static init(): TokenServiceManager {
        let instance = new TokenServiceManager();
        CanvasHooking.hookUp({
            ready: () => instance._services.clear(),
            tokens: instance.include.bind(instance)
        });
        TokenCRUDHooking.hookUp({
            create: instance.create.bind(instance),
            delete: instance.delete.bind(instance),
        });

        setService(instance);

        return instance;
    }    

    public getById(tokenId: string): TokenService {
        return this._services.find(service => service.getId() === tokenId);
    }

    public getByCurrentUser(): TokenService {
        return this.getByUser(game.user);
    }

    public getByUser(user: User): TokenService {
        return this._services.find(service => service.isOwner(user));
    }

    private include(...tokens: TokenDocument[]): void {
        AcoripLog.info("TokenServiceManager | New managed tokens > ", ...tokens.map(t => t.id));
        tokens.forEach(token => {
            this.create(token);
        });
    }

    private delete(tokenDocument: TokenDocument): TokenService {
        let service = this._services.find(service => service.getId() === tokenDocument.id)
        
        if (!!service && this.isUserAllowed(tokenDocument)) {
            AcoripLog.info("TokenServiceManager | Token removed > ", tokenDocument.id);
            this._services.delete(service);
            this.emitEvent(TOKEN_CONTROL_EVENTS.deleted, service);
        }

        return service;
    }

    private create(tokenDocument: TokenDocument): TokenService {
        let service = null;
        if (this.isUserAllowed(tokenDocument)){
            AcoripLog.info("TokenServiceManager | Token created > ", tokenDocument.id);

            service = new TokenService(tokenDocument)
            this._services.add(service);
            this.emitEvent(TOKEN_CONTROL_EVENTS.created, service);
        }

        return service;
    };

    private isUserAllowed(tokenDocument: TokenDocument): boolean {
        return game.user.isGM || game.user.character.id === tokenDocument.actor.id
    }

    private emitEvent(event: string, tokenService: TokenService): void {
        Hooks.call(event, tokenService);
    }
}

export default TokenServiceManager