export const TOKEN_CONTROL_EVENTS = {
    created: "tokenServiceCreated",
    deleted: "tokenServiceDeleted"
}
export const MODULE_ID: string = "acorip";
export const FLAGS = {
    INVALID_TOKEN: "Invalid Token",
    NETRUNNING: "Netrunning"
};

export const NETRUNNING: string = "Netrunning";

export const TEMPLATES = {
    tokenHudJackIn: "TOKEN_HUD_JACK_INOUT",
    tokenHudToggleImage: "TOKEN_HUD_TOGGLE_IMAGE",
    tokenToggleImageDialog: "TOKEN_TOGGLE_IMAGE_DIALOG",
    tokenHudFadeImage: "TOKEN_HUD_FADE_IMAGE",
    fadeElementDialog: "FADE_ELEMENT_DIALOG",
    tokenCanvasControls: "TOKEN_CANVAS_CONTROLS",
    rollRequestDialog: "ROLL_REQUEST_DIALOG",
    diceRollChatMessage: "DICE_ROLL_CHAT_MESSAGE",
    
} as const

export const LOCAL_SETTINGS_CONF = {
    toggleTokenImage: {
        key: "toggleTokenImageSettings",
        convert: jsonParse
    },
    playerToggleTokenImage: {
        key: "playerToggleTokenImageSettings",
        convert: jsonParse
    },
    netrunningEffectFile: {
        key: "netrunningEffectFileSettings",
        convert: returnSelf
    }
} as const

function jsonParse(value: string): any {
    return value ? JSON.parse(value) : null;
}
function returnSelf(value: any): any {
    return value;
}