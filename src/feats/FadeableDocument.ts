import { Fadeable } from "./Fadeable";

export abstract class FadeableDocument implements Fadeable {
    
    constructor(private element: any) {}

    fade(): Promise<any> {
        return new Promise((resolve, reject) => {
            this.#startFade(this.element);
            resolve("Fade completed");
        })
    }

    #startFade(element: any): void {
        const dialogOptions: DialogData = {
            title: "Fade",
            content: `
                <form>
                  <div class="form-check">
                      <label class="form-check-label">In</label>
                      <input class="form-check-input" type='radio' name='fade_in_out' value="in"></input>
                      <label class="form-check-label">Out</label>
                      <input class="form-check-input" type='radio' name='fade_in_out' value="out"></input>
                  </div>
                </form>`,
            buttons: {confirmar: {label: game.i18n?.localize("acorip.labels.confirm") || "???confirm???"}},
            default: "confirmar",
            close: (html: any) => {
                let fadeType = html.find('input[name=\'fade_in_out\']:checked').val();
                this.#doFade(fadeType || "out", element);
            }
          };
          
        if (!!element)
            new Dialog(dialogOptions).render(true);
    }
    
    #doFade(fadeType: string, element: any): void {
        let isFadeOut = fadeType === "out";
        let interval = 100;
        let fadeOptions = isFadeOut 
                          ? this.#createAlphaOptions(0.05, (alpha: any) => alpha < 0, 0)
                          : this.#createAlphaOptions(-0.05, (alpha: any) => alpha > 1, 1);
      
        let fadeValue = isFadeOut ? 1 : 0;
      
        let fade = setInterval(function() {
            fadeValue = fadeValue - fadeOptions.alphaFactor;
            element.element.alpha = fadeValue;
            let update = {_id: element.id, alpha: fadeValue}
            if (fadeOptions.alphaLimitCheck(fadeValue)) {
                clearInterval(fade);
                update = {...update, alpha: fadeOptions.alphaLimit};
            }
            canvas?.scene?.updateEmbeddedDocuments(element.documentName || element.document?.documentName, [update]);
        }, interval);
    }
    
    #createAlphaOptions(alphaFactor: number, alphaLimitCheck: any, alphaLimit: number) {
        return {alphaFactor, alphaLimitCheck, alphaLimit};
    }
}

