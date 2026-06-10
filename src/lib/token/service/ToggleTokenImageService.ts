import {TokenSettingHelper} from "../../settings/PersistedSettingsHelper";
import { getService } from "../../config";
import { defaultRestrictFilePickerConfig, ToggleTokenImageSettingsData } from "../../types/acoriPTypes";
import TokenServiceManager from "./TokenServiceManager";
import RestrictedFilePicker from "../../app/RestrictedFilePicker";

export default class ToggleTokenImageHandler {

    private toggleOptionSettings: ToggleTokenImageSettingsData;

    constructor(private token: Token){
        let tokenSettingsHelper = new TokenSettingHelper();
        let isUserGM = game.user.isGM
        let hasTokenPlayerOwner = token.actor.hasPlayerOwner
        let gmToggleTokenSettings = tokenSettingsHelper.toggleTokenImageSetting
        let playerToggleTokenSettings = tokenSettingsHelper.playerToggleTokenImageSetting

        this.toggleOptionSettings = 
            (
                !isUserGM ? playerToggleTokenSettings :
                (isUserGM && hasTokenPlayerOwner ? playerToggleTokenSettings : gmToggleTokenSettings)
            ) as ToggleTokenImageSettingsData
    }

    public toggleTokenImage(): void{

        new RestrictedFilePicker({
            ...defaultRestrictFilePickerConfig,
            restrictedFolder: `${this.toggleOptionSettings.defaultTokenImagePath}/${game.user.name}`,
            callback: this.applyStance.bind(this),
            displayMode: "tiles"
        }).render(true);
        
/*         this.toggleOptionSettings.stances = this.toggleOptionSettings.stances.filter(s => s.enabled);
        
        let content = templateFactory.parseTemplate(TEMPLATES.tokenToggleImageDialog, this.toggleOptionSettings)
        const dialogOptions: DialogData = {
            title: game.i18n.localize("acorip.labels.change_token_stance"),
            content: content,
            buttons: {confirm: {label: game.i18n.localize("acorip.labels.confirm"), callback: this.applyStance.bind(this)}},
            default: "confirm",
        };
        new Dialog(dialogOptions).render(true); */
    }

    private applyStance(path: string): void {
        this.changeTokenImage(path)
            .then(tokenUpdate => this.updateToken(tokenUpdate))
            .then(this.notifyChange.bind(this));
    }

    private async changeTokenImage(imagePath: string) {
        return {texture: {src: imagePath}};
    }

    private updateToken(updates: any): void {
        let tokenService = getService(TokenServiceManager).getById(this.token.id);
        tokenService.getToken().update(updates)
    }    

    private notifyChange(): void {
        let messageContent = { content: `<p>${game.i18n.format("acorip.messages.token.image-changed", {tokenName: this.token.name})}</p>` };
        ChatMessage.create(messageContent);
    }

    

}