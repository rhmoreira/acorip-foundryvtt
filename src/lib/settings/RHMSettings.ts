
import { setSetting } from "../config";
import { SETTINGS_CONF, MODULE_ID } from "../Constants"
import { ToggleTokenImageSettingsData } from "../types/acoriPTypes";
import PlayerToggleTokenImageSettingMenu from "./app/PlayerToggleTokenImageSettingMenu";
import ToggleTokenImageSettingsMenu from "./app/ToggleTokenImageSettingMenu";


function registerSettings(): void {
    game.settings.registerMenu(MODULE_ID, "tokenToggleImageMenu", {
        name: "Toggle Token image",
        label: game.i18n.localize("acorip.labels.settings.configure"),
        hint: game.i18n.localize("acorip.labels.settings.token-toggle-image.menu.hint"),
        icon: "fas fa-cog",
        type: ToggleTokenImageSettingsMenu,
        restricted: true  
    });

    game.settings.registerMenu(MODULE_ID, "playerTokenToggleImageMenu", {
        name: "Player Toggle Token image",
        label: game.i18n.localize("acorip.labels.settings.configure"),
        hint: game.i18n.localize("acorip.labels.settings.token-toggle-image.menu.hint"),
        icon: "fas fa-cog",
        type: PlayerToggleTokenImageSettingMenu,
        restricted: false
    });

    (game.settings as any).register(MODULE_ID, SETTINGS_CONF.toggleTokenImage, {
        scope: "world",
        config: false,
        type: Object,
        default: createToggleTokenImageDefaultSettings(),
        onChange: (value: string) => {
            setSetting(SETTINGS_CONF.toggleTokenImage, value);
            (game.settings as any).set(MODULE_ID, SETTINGS_CONF.playerToggleTokenImage, value);
        }
    });

    (game.settings as any).register(MODULE_ID, SETTINGS_CONF.playerToggleTokenImage, {
        scope: "client",
        config: false,
        type: Object,
        onChange: (value: string) => setSetting(SETTINGS_CONF.playerToggleTokenImage, value)
    });

    (game.settings as any).register(MODULE_ID, SETTINGS_CONF.netrunningEffectFile, {
        name: game.i18n.localize("acorip.labels.settings.netrunning-effect.name"),
        hint: game.i18n.localize("acorip.labels.settings.netrunning-effect.hint"),
        scope: "world",
        config: true,
        type: String,
        filePicker: true,
        default: `modules/${MODULE_ID}/assets/animations/netrunning.webm`,
        onChange: (value: string) => setSetting(SETTINGS_CONF.netrunningEffectFile, value)
    });

    updateLocalSettings();
}

function updateLocalSettings(): void {
    let key: keyof typeof SETTINGS_CONF;
    for (key in SETTINGS_CONF) {
        let settingConf = SETTINGS_CONF[key];
        let storedSetting = (game.settings as any).get(MODULE_ID, settingConf)

        setSetting(settingConf, storedSetting);
    }

}

function createToggleTokenImageDefaultSettings(): ToggleTokenImageSettingsData {
    return {
        stances: [
             {enabled: true, suffix: "",                description: game.i18n.localize("acorip.labels.settings.token-toggle-image.default.friendly")}
            ,{enabled: true, suffix: "_alt_",           description: game.i18n.localize("acorip.labels.settings.token-toggle-image.default.friendly-alt")}
            ,{enabled: true, suffix: "_combat_rifle_",  description: game.i18n.localize("acorip.labels.settings.token-toggle-image.default.combat-rifle")}
            ,{enabled: true, suffix: "_combat_shotgun_",description: game.i18n.localize("acorip.labels.settings.token-toggle-image.default.combat-shotgun")}
            ,{enabled: true, suffix: "_combat_pistol_", description: game.i18n.localize("acorip.labels.settings.token-toggle-image.default.combat-pistol")}
            ,{enabled: true, suffix: "_combat_smg_",    description: game.i18n.localize("acorip.labels.settings.token-toggle-image.default.combat-smg")}
            ,{enabled: true, suffix: "_combat_bow_",    description: game.i18n.localize("acorip.labels.settings.token-toggle-image.default.combat-bow")}
        ],
        defaultTokenImagePath: "assets/cyberpunk-red/",
        imgfileExt: ".png"
    }
}

export default {registerSettings}