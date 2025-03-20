import { MODULE_ID, SETTINGS_CONF } from "../Constants";

export function getSetting(key) {
    return game.settings.get(MODULE_ID, key);
}

export function setSetting(key, value) {
    return game.settings.set(MODULE_ID, key, value);
}

export class TokenSettingHelper {
    constructor(){
        this.toggleTokenImageKey = SETTINGS_CONF.toggleTokenImage;
        this.playerToggleTokenImageKey = SETTINGS_CONF.playerToggleTokenImage;
        this.netrunningEffectFileKey = SETTINGS_CONF.netrunningEffectFile;
    }

    get playerToggleTokenImageSetting() {
        return getSetting(this.playerToggleTokenImageKey) ?? this.toggleTokenImageSetting;
    }
    set playerToggleTokenImageSetting(value) {
        setSetting(this.playerToggleTokenImageKey, value);
    }

    get toggleTokenImageSetting() {
        return getSetting(this.toggleTokenImageKey);
    }

    set toggleTokenImageSetting(value) {
        setSetting(this.toggleTokenImageKey, value);
    }

    get netRunningEffectFile() {
        return getSetting(this.netrunningEffectFileKey);
    }

    set netRunningEffectFile(value) {
        setSetting(this.netrunningEffectFileKey, value);
    }
}