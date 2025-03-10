import CanvasHooking from "../hooking/CanvasHooking";
import { TOKEN_CONTROL_EVENTS } from "../../Constants";
import TokenCRUDHooking from "../hooking/TokenCRUDHooking";
import { TokenService } from "./TokenService";

class TokenServiceManager {

    private _services: Set<TokenService> = new Set<TokenService>();

    public get services(): readonly TokenService[] {return Array.from(this._services)};

    constructor() {}

    public init(): void {
        CanvasHooking.hookUp({
            ready: (_) => this._services.clear(),
            tokens: this.include.bind(this)
        });
        TokenCRUDHooking.hookUp({
            create: this.create.bind(this),
            delete: this.delete.bind(this),
        });
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
        tokens.forEach(token => {
            this.create(token);
        });
    }

    private delete(tokenDocument: TokenDocument): TokenService {
        let service = this._services.find(service => service.getId() === tokenDocument.id)
        
        if (!!service && this.isUserAllowed(tokenDocument)) {
            this._services.delete(service);
            this.emitEvent(TOKEN_CONTROL_EVENTS.deleted, service);
        }

        return service;
    }

    private create(tokenDocument: TokenDocument): TokenService {
        let service = null;
        if (this.isUserAllowed(tokenDocument)){
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

const tokenServiceManager = new TokenServiceManager();

export default tokenServiceManager