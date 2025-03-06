import { PlayerTokenManager } from "./feats/TokenManager";

class RHM {
    private game: any;

    public init(): void {
        this.game = <any> game;
        this.game.acorip = {};
    }

    public setPlayerTokenManagers(tokenManagers: PlayerTokenManager[]): void {        
        if (!this.game.acorip.managers) this.game.acorip.managers = {};
        
        this.game.acorip.managers.playerTokenManagers = tokenManagers;
    }

    public getPlayerTokenManagers(): PlayerTokenManager[] {
        return this.game.acorip.managers.playerTokenManagers;
    }

    public getTokenManagerById(tokenId: string): PlayerTokenManager {
        return this.getPlayerTokenManagers().find(manager => manager.getId() === tokenId);
    }

    public getTokenManagerByUser(user: User): PlayerTokenManager {
        return this.getPlayerTokenManagers().find(manager => manager.isOwner(user));
    }

}

const INSTANCE = new RHM();

export default INSTANCE as RHM;