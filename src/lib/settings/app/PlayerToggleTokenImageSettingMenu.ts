import { ToggleTokenImageSettingsData } from "../../types/acoriPTypes";
import utils from "../../utils";
import ToggleTokenImageSettingsMenu from "./ToggleTokenImageSettingMenu";

export default class PlayerToggleTokenImageSettingMenu extends ToggleTokenImageSettingsMenu{

    constructor(){
        super("playerToggleTokenImageSettings");
    }

    override async activateListeners(_: JQuery) {} //No event handlers necessary at the superclass level

    override getData(_?: Partial<FormApplicationOptions>): Promise<any> {
        return Promise.resolve({
            ...this.tokenSettingHelper.playerToggleTokenImageSetting as ToggleTokenImageSettingsData,
            isPlayer: true
        });
    }

    override async _updateObject(_: any, formData?: any) {
        this.tokenSettingHelper.playerToggleTokenImageSetting = utils.expandObj(formData) as ToggleTokenImageSettingsData;
    }

}