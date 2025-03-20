import BaseUI from "../../app/BaseUI";
import { MODULE_ID } from "../../Constants";
import { ToggleTokenImageSettingsData } from "../../types/acoriPTypes";
import utils from "../../utils";
import { TokenSettingHelper } from "../settingsHelper";

export default class ToggleTokenImageSettingsMenu extends BaseUI{

    protected readonly tokenSettingHelper: TokenSettingHelper = new TokenSettingHelper();

    private localSettings: ToggleTokenImageSettingsData;

    constructor(uiControlName?: string){
        super(uiControlName ?? "toggleTokenImageSettings");
    }

    static override get defaultOptions(): FormApplicationOptions {
        return {
            ...super.defaultOptions,
            id: "toggleTokenImageSettings",
            classes: ["rhm", "rhm-settings"],
            title: "Toggle Token Image",
            template: `modules/${MODULE_ID}/templates/settings/toggle-token-image.hbs`,
            resizable: false,
            popOut: true,
            height: 600,
            width: 480
        }
    }

    override async getData(_?: Partial<ApplicationOptions>): Promise<ToggleTokenImageSettingsData> {
        if (!this.localSettings)
            this.localSettings = this.tokenSettingHelper.toggleTokenImageSetting as ToggleTokenImageSettingsData;

        if (!this.localSettings.stances)
            this.localSettings.stances = [];

        return this.localSettings;
    }

    override async activateListeners(html: JQuery) {
        super.activateListeners(html);
        this.attatchInputChangeListener(html);
        this.attatchActionListeners(html);
    }

    private attatchInputChangeListener(html: JQuery): void {
        html.find(".stance-table input").on("blur", (event) => {
            let { index, attr } =  event.target?.dataset;
            if (!!index && !!attr) {
                (this.localSettings as any).stances[parseInt(index)][attr] = (event.target as any).value;
            }
        });
    }

    private attatchActionListeners(html: JQuery): void {
        html.find("button.rhm-tti-settings")
            .on("click", (event) => {
                let {action} = event.target.dataset;
                switch (action) {
                    case "removeStance":
                        this.removeStance(event.target.dataset.index);
                        this.render();
                        break;
                    case "addStance":
                        this.localSettings.stances.push({suffix: "Custom suffix", description: "Custom Description", enabled: true})
                        this.render();
                        break;
                
                    default:
                        break;
                }
            });
    }

    override async _updateObject(_: any, formData?: any) {
        this.tokenSettingHelper.toggleTokenImageSetting = utils.expandObj(formData) as ToggleTokenImageSettingsData;
    }

    private removeStance(index: string): void {
        this.localSettings.stances?.splice(parseInt(index), 1);
    }

}
