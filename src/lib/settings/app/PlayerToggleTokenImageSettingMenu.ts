import RestrictedFilePicker from "../../app/RestrictedFilePicker";
import { ToggleTokenImageSettingsData } from "../../types/acoriPTypes";
import utils from "../../utils";
import ToggleTokenImageSettingsMenu from "./ToggleTokenImageSettingMenu";

export default class PlayerToggleTokenImageSettingMenu extends ToggleTokenImageSettingsMenu{

    private playerTokenSettings: ToggleTokenImageSettingsData;

    constructor(){
        super("playerToggleTokenImageSettings");
    }

    override async activateListeners(_: JQuery) {} //No event handlers necessary at the superclass level

    override getData(_?: Partial<FormApplicationOptions>): Promise<ToggleTokenImageSettingsData> {
        this.playerTokenSettings = this.tokenSettingHelper.playerToggleTokenImageSetting as ToggleTokenImageSettingsData;
        return Promise.resolve({
            ...this.playerTokenSettings,
            isPlayer: true
        });
    }

    protected override _activateCoreListeners(html: JQuery): void {
        this.attachUploadButtonEvent(html);
    }

    private attachUploadButtonEvent(html: JQuery): void {
        html.find("button.rhm.upload-token-image")
            .on("click", this.triggerRestrictedFilePicker.bind(this));
    }

    private triggerRestrictedFilePicker(): void{
        new RestrictedFilePicker(
            this.playerTokenSettings.defaultTokenImagePath,
            "data",
            "image"
        ).render(true);
    }

    override async _updateObject(_: any, formData?: any) {
        this.tokenSettingHelper.playerToggleTokenImageSetting = utils.expandObj(formData) as ToggleTokenImageSettingsData;
    }

}