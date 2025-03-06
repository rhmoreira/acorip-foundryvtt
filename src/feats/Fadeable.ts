import { EMBEDDED_DOCUMENT_TYPES } from "@league-of-foundry-developers/foundry-vtt-types/src/foundry/common/constants.mjs";

type FadeType = "in" | "out";

interface Fadeable {
    getDocumentName(): EMBEDDED_DOCUMENT_TYPES;
    createFadeUpdate(newAlpha: number): any;
}

export {
    FadeType,
    Fadeable
}