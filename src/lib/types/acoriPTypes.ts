import { EMBEDDED_DOCUMENT_TYPES } from "@league-of-foundry-developers/foundry-vtt-types/src/foundry/common/constants.mjs";
import { TEMPLATES } from "../Constants";

export type DocumentType = EMBEDDED_DOCUMENT_TYPES;

//###### Templates ######
type TemplateKeys = keyof typeof TEMPLATES;
export type TemplateType = typeof TEMPLATES[TemplateKeys];

//###### Hooking ######
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

//###### UI Controls ######
export type UIControlHook = {
    hook: string,
    callback: (event: any) => void,
    hookId?: number
}

//###### Sockets ######
export type SocketAction = {
    "requestRoll": SocketRequestRollActionData,
    "rollSkill": SocketRollSkillActionData,
    "rollAttribute": SocketRequestAttributeRollActionData,
    "rollDice": SocketRequestDiceRollActionData,
}

export type SocketActionData = {action: keyof SocketAction};

export interface SocketRequestRollActionData extends SocketActionData {
    action: "requestRoll",
    request: SocketRollSkillActionData |
             SocketRequestAttributeRollActionData |
             SocketRequestDiceRollActionData
}

export interface SocketRollSkillActionData extends SocketActionData {
    action: "rollSkill",
    data: {
        userId: string,
        skillName: string
    }
}

export interface SocketRequestAttributeRollActionData extends SocketActionData {
    action: "rollAttribute",
    data: { 
        userId: string,
        attributeName: string
    }
}

export interface SocketRequestDiceRollActionData extends SocketActionData {
    action: "rollDice",
    data: {
        userId: string,
        formula: string
    }
}