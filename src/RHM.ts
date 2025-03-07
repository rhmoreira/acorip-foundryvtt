import { TokenManager } from "./lib/TokenManager";

class RHM {
    private _tokenManagers: TokenManager[];
    
    public get tokenManagers(): TokenManager[] {return this._tokenManagers;}    

    public init(initialTokenManagers: Promise<TokenManager[]>): void {

        initialTokenManagers.then(managers => this._tokenManagers = managers);

        Hooks.on("createToken", this.handleTokenCreation.bind(this));
        Hooks.on("deleteToken", this.handleTokenDeletion.bind(this));
    }

    public getTokenManagerById(tokenId: string): TokenManager {
        return this._tokenManagers.find(manager => manager.getId() === tokenId);
    }

    public getTokenManagerByUser(user: User): TokenManager {
        return this._tokenManagers.find(manager => manager.isOwner(user));
    }

    private handleTokenDeletion(tokenDocument: TokenDocument): void {
        let managerIndex = this._tokenManagers.findIndex(manager => manager.getId() === tokenDocument.id)
        
        if (managerIndex >= 0 && this.isUserAllowed(tokenDocument))
            this._tokenManagers.splice(managerIndex, 1);
    }

    private handleTokenCreation(tokenDocument: TokenDocument): void {
        let managerIndex = this._tokenManagers.findIndex(manager => manager.getId() === tokenDocument.id)
        
        if (managerIndex >= 0 && this.isUserAllowed(tokenDocument))
            this._tokenManagers.push(new TokenManager(tokenDocument));
    }

    private isUserAllowed(tokenDocument: TokenDocument): boolean {
        let currentUser = game.users.current;
        return currentUser.isGM || currentUser.character.id === tokenDocument.actor.id
    }

}

const INSTANCE = new RHM();

export default INSTANCE as RHM;