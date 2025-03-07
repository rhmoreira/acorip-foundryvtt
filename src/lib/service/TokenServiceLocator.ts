
import TokenCRUDHooking from "../../hooking/TokenCRUDHooking";
import { TokenService } from "./TokenService";

class TokenServiceLocator {

    private _services: TokenService[] = [];

    public get services(): TokenService[] {return this._services};
    public set services(services: TokenService[]) {this._services = services};

    constructor() {}

    public init(): void {
        TokenCRUDHooking.hookUp({
            create: this.handleTokenCreation.bind(this),
            delete: this.handleTokenDeletion.bind(this),
        });
    }

    public getById(tokenId: string): TokenService {
        return this._services.find(manager => manager.getId() === tokenId);
    }

    public getByUser(user: User): TokenService {
        return this._services.find(manager => manager.isOwner(user));
    }

    private handleTokenDeletion(tokenDocument: TokenDocument): void {
        let managerIndex = this._services.findIndex(manager => manager.getId() === tokenDocument.id)
        
        if (managerIndex >= 0 && this.isUserAllowed(tokenDocument))
            this._services.splice(managerIndex, 1);
    }

    private handleTokenCreation(tokenDocument: TokenDocument): void {
        if (this.isUserAllowed(tokenDocument))
            this._services.push(new TokenService(tokenDocument));
    }

    private isUserAllowed(tokenDocument: TokenDocument): boolean {
        let currentUser = game.users.current;
        return currentUser.isGM || currentUser.character.id === tokenDocument.actor.id
    }
}

const INSTANCE = new TokenServiceLocator();

export default INSTANCE as TokenServiceLocator