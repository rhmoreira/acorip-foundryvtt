import { templateFactory, TEMPLATES } from "../TemplateFactory";

export default class ToggleTokenImageHandler {

    private readonly content = templateFactory.parseTemplate(TEMPLATES.TOKEN_TOGGLE_IMAGE_DIALOG);

    constructor(private token: Token){}

    public toggleTokenImage(): void{
        const dialogOptions: DialogData = {
            title: "Alterar instância do token",
            content: this.content,
            buttons: {confirm: {label: "Confirmar", callback: this.applyStance.bind(this)}},
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
        let messageContent = { content: `<p>${this.token.name} alterou sua instância na cena</p>` };
        ChatMessage.create(messageContent);
    }

    private applyStance(html: any): void {
        let stance = html.find('select[name=\'token_instance\']').val();
        let tokenUpdate = this.changeTokenImage(stance);    

        this.updateToken([tokenUpdate]);
        this.notifyChange();
    }

}