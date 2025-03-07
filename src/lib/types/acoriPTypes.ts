import { EMBEDDED_DOCUMENT_TYPES } from "@league-of-foundry-developers/foundry-vtt-types/src/foundry/common/constants.mjs";
import { TEMPLATES } from "../Constants";

export type DocumentType = EMBEDDED_DOCUMENT_TYPES
export type ArrayELement<ArrayType extends unknown> = ArrayType extends (infer ElementType) ? ElementType : never;

type TemplateKeys = keyof typeof TEMPLATES
export type TemplateType = typeof TEMPLATES[TemplateKeys]