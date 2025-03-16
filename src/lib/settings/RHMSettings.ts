
import { MODULE_ID } from "../Constants"
import { ToggleTokenImageSettingsData } from "../types/acoriPTypes";
import { ToggleTokenImageSettingsMenu } from "./app/ToggleTokenImageSettingMenu";

function registerSettings(): void {
    (game.settings as any).register(MODULE_ID, "toggleTokenImageSettings", {
        scope: "world",
        config: false,
        type: String,
        default: JSON.stringify(createToggleTokenImageDefaultSettings())
    });

    game.settings.registerMenu(MODULE_ID, "tokenToggleImageMenu", {
        name: "Toggle Token image",
        label: game.i18n.localize("acorip.labels.settings.configure"),
        hint: game.i18n.localize("acorip.labels.settings.token-toggle-image.menu.hint"),
        icon: "fas fa-cog",
        type: ToggleTokenImageSettingsMenu,
        restricted: true  
    });
}

function createToggleTokenImageDefaultSettings(): ToggleTokenImageSettingsData {
    return {
        stances: [
            {sufix: "",                 description: game.i18n.localize("acorip.labels.settings.token-toggle-image.default.friendly")}
            ,{sufix: "_alt_",           description: game.i18n.localize("acorip.labels.settings.token-toggle-image.default.friendly-alt")}
            ,{sufix: "_combat_rifle_",  description: game.i18n.localize("acorip.labels.settings.token-toggle-image.default.combat-rifle")}
            ,{sufix: "_combat_shotgun_",description: game.i18n.localize("acorip.labels.settings.token-toggle-image.default.combat-shotgun")}
            ,{sufix: "_combat_pistol_", description: game.i18n.localize("acorip.labels.settings.token-toggle-image.default.combat-pistol")}
            ,{sufix: "_combat_smg_",    description: game.i18n.localize("acorip.labels.settings.token-toggle-image.default.combat-smg")}
            ,{ sufix: "_combat_bow_",   description: game.i18n.localize("acorip.labels.settings.token-toggle-image.default.combat-bow")}
        ],
        defaultTokenImagePath: "assets/cyberpunk-red/",
        imgfileExt: ".png"
    }
}

export default {registerSettings}