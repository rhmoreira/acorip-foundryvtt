import { LOCAL_SETTINGS_CONF } from "../../Constants";
import { ToggleTokenImageSettingsData } from "../../types/acoriPTypes";
import utils from "../../utils";
import ToggleTokenImageSettingsMenu from "./ToggleTokenImageSettingMenu";

export default class PlayerToggleTokenImageSettingMenu extends ToggleTokenImageSettingsMenu{

    constructor(){
        super("playerToggleTokenImageSettings");
    }

    static override get defaultOptions(): FormApplicationOptions {
        return ToggleTokenImageSettingsMenu.defaultOptions;
    }

    override async activateListeners(_: JQuery) {}

    override getData(options?: Partial<FormApplicationOptions>): Promise<any> {
        return new Promise<ToggleTokenImageSettingsData>((resolve, reject) => {
            let playerSettings = super.getSettings(LOCAL_SETTINGS_CONF.playerToggleTokenImage.key);
            !!playerSettings ? resolve(playerSettings) : reject(playerSettings);
        }).catch(_ => super.getData(options))
        .then(settings => {
            return {
                isPlayer: true,
                ...settings
            };
        })
    }

    override async _updateObject(_: any, formData?: any) {
       super.setSettings(LOCAL_SETTINGS_CONF.playerToggleTokenImage.key, utils.expandObj(formData) as ToggleTokenImageSettingsData);
    }

}