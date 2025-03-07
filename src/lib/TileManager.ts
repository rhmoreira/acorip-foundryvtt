import { Fadeable } from "../feats/Fadeable";
import { DocumentType } from "./types/acoriPTypes";

export default class TileHandler implements Fadeable {
    
    constructor(private tile: TileDocument) {}

    public getDocumentName(): DocumentType {
        return this.tile.documentName;
    }

    public createFadeUpdate(newAlpha: number): any {
        return {_id: this.tile.id, alpha: newAlpha};
    }
}