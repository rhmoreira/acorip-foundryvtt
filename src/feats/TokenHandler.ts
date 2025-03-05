import ActorHelperImpl from "./ActorHelperImpl";
import FadeableDocument from "./FadeableDocument";

class TokenHandler extends FadeableDocument {
    constructor(token: TokenDocument | Token, protected actorHelper: ActorHelper = new ActorHelperImpl(token.actor)) {
        super(token);
    }

    public getToken(): TokenDocument | Token {
        return this.element as TokenDocument | Token;
    }
}

class PlayerTokenHandler extends TokenHandler {
    
    constructor(token: TokenDocument | Token) {
        super(token);
        if (!token.actor?.hasPlayerOwner) {
            this.element.isInvalid = true;
        }
    }

    public jackIn(): void {
        if (this.actorHelper.isNetrunner()) {

        }
    }

    public jackOut(): void {
        if (this.actorHelper.isNetrunner()) {
            
        }
    } 

}

export {
    TokenHandler,
    PlayerTokenHandler
}