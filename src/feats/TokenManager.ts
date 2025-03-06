import { toggleJackEffect } from "../events/JackEventHandler";
import { FLAGS, MODULE_ID } from "../lib/Constants";;
import ToggleTokenImageHandler from "../events/ToggleTokenImageHandler";
import ActorHandlerImpl from "./ActorHandlerImpl";
import FadeableElement from "./FadeableElement";

class TokenManager extends FadeableElement<TokenDocument> {
    constructor(token: TokenDocument, protected actorHandler: ActorHandler = new ActorHandlerImpl(token.actor)) {
        super(token);
    }

    public getToken(): TokenDocument{
        return this.element;
    }

    public getId(): string {
        return this.getToken().id;
    }

    public getActorHandler(): ActorHandler {
        return this.actorHandler;
    }

    protected invalidate(): void {
        this.element.update({
            flags: {
                MODULE_ID: {
                    [FLAGS.INVALID_TOKEN]: true
                }
            }
        });
    }

    public setFlag(flag: string, value: any): void {
        this.element.setFlag(MODULE_ID, flag as never, value as never);
    }

    public getFlag(flag: string): any {
        return this.element.getFlag(MODULE_ID, flag as never);
    }
}

class PlayerTokenManager extends TokenManager {
    
    constructor(token: TokenDocument) {
        super(token);
        if (!token.actor?.hasPlayerOwner)
            super.invalidate();
    }

    public isOwner(user: User): boolean {
        return this.actorHandler.getId() === user?.character.id;
    }

    public jack(inOut: boolean): void {
        if (this.actorHandler.isNetrunner()) {
            super.setFlag(FLAGS.NETRUNNING, inOut);
            toggleJackEffect(this.getToken());
        }
    }

    public toggleTokenImage(): void {
        new ToggleTokenImageHandler(this.getToken().object).toggleTokenImage();
    }

}

export {
    TokenManager,
    PlayerTokenManager
}