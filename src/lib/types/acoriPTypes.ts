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

export type ActorSheetHooking = {
    renderSheet?: (sheet: ActorSheet) => void,
    closeSheet?:  (sheet: ActorSheet) => void,
}

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
    "updateSettings": UpdateSettingsActionData
}

export type SocketActionData = {action: keyof SocketAction, userIds?: string[]};

export interface SocketRequestRollActionData extends SocketActionData {
    action: "requestRoll",
    request: SocketRollSkillActionData |
             SocketRequestAttributeRollActionData |
             SocketRequestDiceRollActionData
}

export interface SocketRollSkillActionData extends SocketActionData {
    action: "rollSkill",
    data: {
        skillName: string
    }
}

export interface SocketRequestAttributeRollActionData extends SocketActionData {
    action: "rollAttribute",
    data: { 
        attributeName: string
    }
}

export interface SocketRequestDiceRollActionData extends SocketActionData {
    action: "rollDice",
    data: {
        formula: string
    }
}

export interface UpdateSettingsActionData extends SocketActionData {
    action: "updateSettings",
    data: {
        key: string,
        settings: any
    }
}

//### Settings ###

export type ToggleTokenImageSettingsData = {
    stances: {
        suffix: string,
        description: string,
        enabled: boolean
    }[];
    defaultTokenImagePath: string,
    imgfileExt: string
}