
import { setSetting } from "../config";
import { LOCAL_SETTINGS_CONF, MODULE_ID } from "../Constants"
import { ToggleTokenImageSettingsData } from "../types/acoriPTypes";
import { ToggleTokenImageSettingsMenu } from "./app/ToggleTokenImageSettingMenu";


function registerSettings(): void {
    game.settings.registerMenu(MODULE_ID, "tokenToggleImageMenu", {
        name: "Toggle Token image",
        label: game.i18n.localize("acorip.labels.settings.configure"),
        hint: game.i18n.localize("acorip.labels.settings.token-toggle-image.menu.hint"),
        icon: "fas fa-cog",
        type: ToggleTokenImageSettingsMenu,
        restricted: true  
    });

    (game.settings as any).register(MODULE_ID, LOCAL_SETTINGS_CONF.toggleTokenImage.key, {
        scope: "world",
        config: false,
        type: String,
        default: JSON.stringify(createToggleTokenImageDefaultSettings()),
        onChange: (value: string) => setSetting(LOCAL_SETTINGS_CONF.toggleTokenImage.key, JSON.parse(value))
    });

    (game.settings as any).register(MODULE_ID, LOCAL_SETTINGS_CONF.netrunningEffectFile.key, {
        name: game.i18n.localize("acorip.labels.settings.netrunning-effect.name"),
        hint: game.i18n.localize("acorip.labels.settings.netrunning-effect.hint"),
        scope: "world",
        config: true,
        type: String,
        default: `modules/${MODULE_ID}/assets/animations/netrunning.webm`,
        onChange: (value: string) => setSetting(LOCAL_SETTINGS_CONF.netrunningEffectFile.key, value)
    });

    updateLocalSettings();
}

function updateLocalSettings(): void {
    let key: keyof typeof LOCAL_SETTINGS_CONF;
    for (key in LOCAL_SETTINGS_CONF) {
        let settingConf = LOCAL_SETTINGS_CONF[key];
        let storedSetting = (game.settings as any).get(MODULE_ID, settingConf.key)

        setSetting(settingConf.key, settingConf.convert(storedSetting));
    }

}

function createToggleTokenImageDefaultSettings(): ToggleTokenImageSettingsData {
    return {
        stances: [
            {suffix: "",                 description: game.i18n.localize("acorip.labels.settings.token-toggle-image.default.friendly")}
            ,{suffix: "_alt_",           description: game.i18n.localize("acorip.labels.settings.token-toggle-image.default.friendly-alt")}
            ,{suffix: "_combat_rifle_",  description: game.i18n.localize("acorip.labels.settings.token-toggle-image.default.combat-rifle")}
            ,{suffix: "_combat_shotgun_",description: game.i18n.localize("acorip.labels.settings.token-toggle-image.default.combat-shotgun")}
            ,{suffix: "_combat_pistol_", description: game.i18n.localize("acorip.labels.settings.token-toggle-image.default.combat-pistol")}
            ,{suffix: "_combat_smg_",    description: game.i18n.localize("acorip.labels.settings.token-toggle-image.default.combat-smg")}
            ,{ suffix: "_combat_bow_",   description: game.i18n.localize("acorip.labels.settings.token-toggle-image.default.combat-bow")}
        ],
        defaultTokenImagePath: "assets/cyberpunk-red/",
        imgfileExt: ".png"
    }
}

export default {registerSettings}