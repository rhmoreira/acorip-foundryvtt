import ActorHandlerImpl from "./ActorHandlerImpl";
import FadeableDocument from "./FadeableDocument";

class TokenHandler extends FadeableDocument {
    constructor(token: TokenDocument | Token, protected actorHandler: ActorHandler = new ActorHandlerImpl(token.actor)) {
        super(token);
    }

    public getToken(): TokenDocument | Token {
        return this.element as TokenDocument | Token;
    }

    public getId(): string {
        return this.getToken().id;
    }

    public getActorHandler(): ActorHandler {
        return this.actorHandler;
    }
}

class PlayerTokenHandler extends TokenHandler {
    
    constructor(token: TokenDocument | Token) {
        super(token);
        if (!token.actor?.hasPlayerOwner) {
            this.element.isInvalid = true;
        }
    }

    public isOwner(user: User): boolean {
        return this.actorHandler.getId() === user?.character.id;
    }

    public jackIn(): void {
        if (this.actorHandler.isNetrunner()) {

        }
    }

    public jackOut(): void {
        if (this.actorHandler.isNetrunner()) {
            
        }
    } 

}

export {
    TokenHandler,
    PlayerTokenHandler
}