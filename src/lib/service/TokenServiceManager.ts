import TokenCRUDHooking from "../../hooking/TokenCRUDHooking";
import { TokenService } from "./TokenService";

class TokenServiceManager {

    private _services: TokenService[] = [];

    public get services(): TokenService[] {return this._services};

    constructor() {}

    public init(): void {
        TokenCRUDHooking.hookUp({
            create: this.create.bind(this),
            delete: this.delete.bind(this),
        });
    }

    public include(...tokens: TokenDocument[]): void {
        tokens.forEach(token => {
            this.create(token);
        });        
    }

    public getById(tokenId: string): TokenService {
        return this._services.find(service => service.getId() === tokenId);
    }

    public getByUser(user: User): TokenService {
        return this._services.find(service => service.isOwner(user));
    }

    private delete(tokenDocument: TokenDocument): void {
        let serviceIndex = this._services.findIndex(service => service.getId() === tokenDocument.id)
        
        if (serviceIndex >= 0 && this.isUserAllowed(tokenDocument))
            this._services.splice(serviceIndex, 1);
    }

    private create(tokenDocument: TokenDocument): void {
        if (this.isUserAllowed(tokenDocument))
            this._services.push(new TokenService(tokenDocument));
    }

    private isUserAllowed(tokenDocument: TokenDocument): boolean {
        let currentUser = game.users.current;
        return currentUser.isGM || currentUser.character.id === tokenDocument.actor.id
    }
}

const tokenServiceManager = new TokenServiceManager();

export default tokenServiceManager