import { EMBEDDED_DOCUMENT_TYPES } from "@league-of-foundry-developers/foundry-vtt-types/src/foundry/common/constants.mjs";
import { Fadeable } from "../feats/Fadeable";

export default class TileHandler implements Fadeable {
    
    constructor(private tile: TileDocument) {}

    getDocumentName(): EMBEDDED_DOCUMENT_TYPES {
        return this.tile.documentName;
    }

    public createFadeUpdate(newAlpha: number): any {
        return {_id: this.tile.id, alpha: newAlpha};
    }
}