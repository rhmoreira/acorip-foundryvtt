import { Fadeable, FadeType } from "../../feats/Fadeable";
import { TEMPLATES } from "../Constants";
import { templateFactory } from "../TemplateFactory";

export default class FadeService {

    private content: string = templateFactory.parseTemplate(TEMPLATES.fadeElementDialog);

    constructor(private fadeable: Fadeable, private interval: number = 100){}

    public async fade(type?: FadeType): Promise<void> {
        if (!type) {
            const dialogOptions: DialogData = {
                title: game.i18n.localize("acorip.labels.fade"),
                content: this.content,
                buttons: {confirmar: {label: game.i18n.localize("acorip.labels.confirm"), callback: this.initFade.bind(this)}},
                default: "confirmar"
            };

            new Dialog(dialogOptions).render(true);
        } else
            return this.doFade(type);
    }

    private initFade(html: any): void {
        let fadeType = html.find('input[name=\'fade_in_out\']:checked').val() as FadeType;
        this.doFade(fadeType);
    }    
    
    private doFade(fadeType: FadeType): Promise<void> {
        let isFadeOut = fadeType === "out";
        let fadeOptions = isFadeOut 
                          ? this.createAlphaOptions(0.05, (alpha: any) => alpha < 0, 0)
                          : this.createAlphaOptions(-0.05, (alpha: any) => alpha > 1, 1);
      
        let fadeValue = isFadeOut ? 1 : 0;
      
        return new Promise((resolve, _) => {
            let fade = setInterval(() => {
                fadeValue = fadeValue - fadeOptions.alphaFactor;
                let update = this.fadeable.createFadeUpdate(fadeValue)
                if (fadeOptions.alphaLimitCheck(fadeValue)) {
                    clearInterval(fade);
                    update = this.fadeable.createFadeUpdate(fadeOptions.alphaLimit);
                    resolve();
                }
                canvas?.scene?.updateEmbeddedDocuments(this.fadeable.getDocumentName(), [update]);
            }, this.interval);
        })
        
    }
    
    private createAlphaOptions(alphaFactor: number, alphaLimitCheck: any, alphaLimit: number): any {
        return {alphaFactor, alphaLimitCheck, alphaLimit};
    }
    
}
