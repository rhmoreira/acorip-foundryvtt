import { EMBEDDED_DOCUMENT_TYPES } from "@league-of-foundry-developers/foundry-vtt-types/src/foundry/common/constants.mjs";
import { TEMPLATES } from "../Constants";
import { TokenService } from "../service/TokenService";


export type DocumentType = EMBEDDED_DOCUMENT_TYPES;
export type ArrayELement<ArrayType extends unknown> = ArrayType extends (infer ElementType) ? ElementType : never;

type TemplateKeys = keyof typeof TEMPLATES;
export type TemplateType = typeof TEMPLATES[TemplateKeys];

export type CanvasHookCallbacks = {
    ready: {
        tokenServices: (managers: TokenService[]) => void
    }
};

export type TokenCRUDHookCallbacks = {
    create: (token: TokenDocument) => void,
    delete: (token: TokenDocument) => void
};