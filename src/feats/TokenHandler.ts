import { FadeableDocument } from "./FadeableDocument";

export class TokenHandler extends FadeableDocument {
    
    constructor(token: TokenDocument | Token) {
        super(token);
        if (!!token.documentName && token.documentName != "Token")
            console.error("Invalid token document [%s]", token.documentname)
    }

    
}