import { getSetting } from "../../config";
import { LOCAL_SETTINGS_CONF, TEMPLATES } from "../../Constants";
import { templateFactory } from "../../TemplateFactory";
import { ToggleTokenImageSettingsData } from "../../types/acoriPTypes";

export default class ToggleTokenImageHandler {

    private toggleOptionSettings: ToggleTokenImageSettingsData;

    constructor(private token: Token){
        this.toggleOptionSettings = 
            (getSetting(LOCAL_SETTINGS_CONF.playerToggleTokenImage.key) 
            ?? getSetting(LOCAL_SETTINGS_CONF.toggleTokenImage.key)) as ToggleTokenImageSettingsData;
    }

    public toggleTokenImage(): void{
        this.toggleOptionSettings.stances = this.toggleOptionSettings.stances.filter(s => s.enabled);
        let content = templateFactory.parseTemplate(TEMPLATES.tokenToggleImageDialog, this.toggleOptionSettings)
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
        return {_id: this.token.id, img: `${this.toggleOptionSettings.defaultTokenImagePath}${this.token.name}${stance}${this.toggleOptionSettings.imgfileExt}`};
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