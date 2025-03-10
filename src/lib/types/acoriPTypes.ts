import { EMBEDDED_DOCUMENT_TYPES } from "@league-of-foundry-developers/foundry-vtt-types/src/foundry/common/constants.mjs";
import { TEMPLATES } from "../Constants";

export type DocumentType = EMBEDDED_DOCUMENT_TYPES;

type TemplateKeys = keyof typeof TEMPLATES;
export type TemplateType = typeof TEMPLATES[TemplateKeys];

export type CanvasHookCallbacks = {
    tokens?: (...tokens: TokenDocument[]) => void,
    ready?: (canvas: Canvas) => void
};

export type TokenCRUDHookCallbacks = {
    create?: (token: TokenDocument) => void,
    delete?: (token: TokenDocument) => void,
    update?: (token: TokenDocument) => void,
    select?: (tokens: TokenDocument[]) => void
};