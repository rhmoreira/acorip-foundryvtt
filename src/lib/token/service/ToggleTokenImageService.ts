import { getSetting } from "../../config";
import { LOCAL_SETTINGS_CONF, TEMPLATES } from "../../Constants";
import { templateFactory } from "../../TemplateFactory";
import { ToggleTokenImageSettingsData } from "../../types/acoriPTypes";

export default class ToggleTokenImageHandler {

    constructor(private token: Token){}

    public toggleTokenImage(): void{
        let content = templateFactory.parseTemplate(TEMPLATES.tokenToggleImageDialog, getSetting(LOCAL_SETTINGS_CONF.toggleTokenImage.key))
        const dialogOptions: DialogData = {
            title: game.i18n.localize("acorip.labels.change_token_stance"),
            content: content,
            buttons: {confirm: {label: game.i18n.localize("acorip.labels.confirm"), callback: this.applyStance.bind(this)}},
            default: "confirm",
        };
        new Dialog(dialogOptions).render(true);
    }
    

    private updateToken(updates: any[]): void {
        canvas.scene.updateEmbeddedDocuments('Token', updates);
    }

    private changeTokenImage(stance: any): any {
        let toggleTokenSetting = getSetting(LOCAL_SETTINGS_CONF.toggleTokenImage.key) as ToggleTokenImageSettingsData;
        return {_id: this.token.id, img: `${toggleTokenSetting.defaultTokenImagePath}${this.token.name}${stance}${toggleTokenSetting.imgfileExt}`};
    }

    private notifyChange(): void {
        let messageContent = { content: `<p>${game.i18n.format("acorip.messages.token.image-changed", {tokenName: this.token.name})}</p>` };
        ChatMessage.create(messageContent);
    }

    private applyStance(html: any): void {
        let stance = html.find('select[name=\'token_stance\']').val();
        let tokenUpdate = this.changeTokenImage(stance);    

        this.updateToken([tokenUpdate]);
        this.notifyChange();
    }

}