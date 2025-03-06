import { Fadeable, FadeType } from "../../feats/Fadeable";
import { templateFactory, TEMPLATES } from "../TemplateFactory";

export default class FadeService {

    private content: string = templateFactory.parseTemplate(TEMPLATES.FADE_ELEMENT_DIALOG);

    constructor(private fadeable: Fadeable){}

    public fade(): void {
        const dialogOptions: DialogData = {
            title: "Fade",
            content: this.content,
            buttons: {confirmar: {label: "Confirmar", callback: this.initFade.bind(this)}},
            default: "confirmar"
          };

          new Dialog(dialogOptions).render(true);
    }

    private initFade(html: any): void {
        let fadeType = html.find('input[name=\'fade_in_out\']:checked').val() as FadeType;
        this.doFade(fadeType);
    }    
    
    private doFade(fadeType: FadeType): void {
        let isFadeOut = fadeType === "out";
        let interval = 100;
        let fadeOptions = isFadeOut 
                          ? this.createAlphaOptions(0.05, (alpha: any) => alpha < 0, 0)
                          : this.createAlphaOptions(-0.05, (alpha: any) => alpha > 1, 1);
      
        let fadeValue = isFadeOut ? 1 : 0;
      
        let fade = setInterval(() => {
            fadeValue = fadeValue - fadeOptions.alphaFactor;
            let update = this.fadeable.createFadeUpdate(fadeValue)
            if (fadeOptions.alphaLimitCheck(fadeValue)) {
                clearInterval(fade);
                update = this.fadeable.createFadeUpdate(fadeOptions.alphaLimit);
            }
            canvas?.scene?.updateEmbeddedDocuments(this.fadeable.getDocumentName(), [update]);
        }, interval);
    }
    
    private createAlphaOptions(alphaFactor: number, alphaLimitCheck: any, alphaLimit: number): any {
        return {alphaFactor, alphaLimitCheck, alphaLimit};
    }
    
}
