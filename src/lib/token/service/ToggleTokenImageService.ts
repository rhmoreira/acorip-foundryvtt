import {AcoripLog} from "../../AcoripLog";
import { getConfigSetting, getService } from "../../config";
import { SETTINGS_CONF, TEMPLATES } from "../../Constants";
import FadeService from "../../effect/FadeEffect";
import { templateFactory } from "../../TemplateFactory";
import { ToggleTokenImageSettingsData } from "../../types/acoriPTypes";
import TokenServiceManager from "./TokenServiceManager";

export default class ToggleTokenImageHandler {

    private logger = new AcoripLog("ToggleTokenImageHandler");
    private toggleOptionSettings: ToggleTokenImageSettingsData;

    constructor(private token: Token){
        this.toggleOptionSettings = 
            (getConfigSetting(SETTINGS_CONF.playerToggleTokenImage) 
            ?? getConfigSetting(SETTINGS_CONF.toggleTokenImage)) as ToggleTokenImageSettingsData;
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
        let tokenService = getService(TokenServiceManager).getById(this.token.id);
        let fadeService = new FadeService(tokenService, 50);

        fadeService.fade("out")
            .then(() => 
                canvas.scene.updateEmbeddedDocuments('Token', updates)
                .then(() => fadeService.fade("in"))
            );

        
    }

    private changeTokenImage(stance: any): Promise<any> {
        return this.inferBestFitForImage(stance)
                .then(src => {
                    return {_id: this.token.id, img: src}
                }).catch(error => {
                    ui.notifications.error(error.message);
                    throw error;
                });
    }

    private inferBestFitForImage(stance: string, userNameExtraPath?: string): Promise<string> {
        let texturePath = `${this.toggleOptionSettings.defaultTokenImagePath}/${!!userNameExtraPath ? userNameExtraPath + "/" : ""}${this.token.name}${stance}${this.toggleOptionSettings.imgfileExt}`;
        return TextureLoader.loader.loadTexture(texturePath)
                .then(texture => {
                    if (!!texture)
                        return texturePath;
                    else if (!userNameExtraPath){
                        this.logger.warn(`Stance not found [${texturePath}]. Trying to look inside subdir [${game.user.name}]`);
                        return this.inferBestFitForImage(stance, game.user.name);
                    }else
                        throw Error(game.i18n.format('acorip.messages.token.stance-image-not-found', {src: texturePath}));
                });
    }

    private notifyChange(): void {
        let messageContent = { content: `<p>${game.i18n.format("acorip.messages.token.image-changed", {tokenName: this.token.name})}</p>` };
        ChatMessage.create(messageContent);
    }

    private applyStance(html: any): void {
        let stance = html.find('select[name=\'token_stance\']').val();
        this.changeTokenImage(stance)
            .then(tokenUpdate => this.updateToken([tokenUpdate]))
            .then(this.notifyChange.bind(this));
    }

}