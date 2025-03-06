import { templateFactory, TEMPLATES } from "../lib/TemplateFactory";

const dialogOptions = {
    title: "Alterar instância do token",
    buttons: {confirm: {label: "Confirmar"}},
    default: "confirm"
};

export default class ToggleTokenImageHandler {
    constructor(private token: Token){}

    public toggleTokenImage(): void{
        let dialogContent = templateFactory.createTemplate(TEMPLATES.TOKEN_TOGGLE_IMAGE_DIALOG);
        new Dialog({
            ...dialogOptions,
            content: dialogContent({}),
            close: (html: any) => this.applyStance(this, html)
        }).render(true);
    }
    

    private updateToken(updates: any[]): void {
        canvas.scene.updateEmbeddedDocuments('Token', updates);
    }

    private changeTokenImage(stance: any): any {
        return {_id: this.token.id, img: `assets/cyberpunk-red/${this.token.name}${stance}token.png`};
    }

    private notifyChange(): void {
        let messageContent = { content: `<p>${this.token.name} alterou sua instância na cena</p>` };
        ChatMessage.create(messageContent);
    }

    private applyStance(_this: ToggleTokenImageHandler, html: any) {
        let stance = html.find('select[name=\'token_instance\']').val();
        let tokenUpdate = _this.changeTokenImage(stance);    

        _this.updateToken([tokenUpdate]);
        _this.notifyChange();
    }

}