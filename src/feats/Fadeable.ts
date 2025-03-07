import { DocumentType } from "../lib/types/acoriPTypes";

type FadeType = "in" | "out";

interface Fadeable {
    getDocumentName(): DocumentType;
    createFadeUpdate(newAlpha: number): any;
}

export {
    FadeType,
    Fadeable
}