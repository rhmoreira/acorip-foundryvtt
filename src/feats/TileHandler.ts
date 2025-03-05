import { FadeableDocument } from "./FadeableDocument";

export class TokenHandler extends FadeableDocument {
    
    constructor(tile: TileDocument | Tile) {
        super(token);
        if (!!token.documentName && token.documentName != "Token")
            console.error("Invalid token document [%s]", token.documentname)
    }

    
}