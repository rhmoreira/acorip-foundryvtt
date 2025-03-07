import { TEMPLATES } from "../../Constants";
import { templateFactory } from "../../TemplateFactory";

export default class ToggleTokenImageHandler {

    private readonly content = templateFactory.parseTemplate(TEMPLATES.tokenToggleImageDialog);

    constructor(private token: Token){}

    public toggleTokenImage(): void{
        const dialogOptions: DialogData = {
            title: game.i18n.localize("acorip.labels.change_token_stance"),
            content: this.content,
            buttons: {confirm: {label: game.i18n.localize("acorip.labels.confirm"), callback: this.applyStance.bind(this)}},
            default: "confirm",
        };
        new Dialog(dialogOptions).render(true);
    }
    

    private updateToken(updates: any[]): void {
        canvas.scene.updateEmbeddedDocuments('Token', updates);
    }

    private changeTokenImage(stance: any): any {
        return {_id: this.token.id, img: `assets/cyberpunk-red/${this.token.name}${stance}token.png`};
    }

    private notifyChange(): void {
        let messageContent = { content: `<p>${game.i18n.format("acorip.messages.token.image-changed", {tokenName: this.token.name})}</p>` };
        ChatMessage.create(messageContent);
    }

    private applyStance(html: any): void {
        let stance = html.find('select[name=\'token_instance\']').val();
        let tokenUpdate = this.changeTokenImage(stance);    

        this.updateToken([tokenUpdate]);
        this.notifyChange();
    }

}