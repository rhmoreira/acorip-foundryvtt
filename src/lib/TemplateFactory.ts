import { MODULE_ID, TEMPLATES } from "./Constants";
import { TemplateType } from "./types/acoriPTypes";

const TEMPLATES_FILES = {
    [TEMPLATES.tokenHudJackIn]: `modules/${MODULE_ID}/templates/token-hud-jack-inout.hbs`,
    [TEMPLATES.tokenHudToggleImage]: `modules/${MODULE_ID}/templates/token-hud-toggle-image.hbs`,
    [TEMPLATES.tokenToggleImageDialog]: `modules/${MODULE_ID}/templates/token-toggle-image-dialog.hbs`,
    [TEMPLATES.tokenHudFadeImage]: `modules/${MODULE_ID}/templates/token-hud-fade-image.hbs`,
    [TEMPLATES.fadeElementDialog]: `modules/${MODULE_ID}/templates/fade-element-dialog.hbs`,
    [TEMPLATES.tokenCanvasControls]: `modules/${MODULE_ID}/templates/player-token-interface-controls.hbs`,
}

class TemplateFactory {
    
    public init(): void {
        let templateList = [];
        
        for (let template in TEMPLATES_FILES)
            templateList.push(TEMPLATES_FILES[template as TemplateType]);

        loadTemplates(templateList);
    }

    public parseTemplate(template: TemplateType, data: any = {}): string{
        return this.createTemplate(template)(data);
    }

    public createTemplate(template: TemplateType): HandlebarsTemplateDelegate<any>{
        return this.compile(template);
    }

    private compile(template: TemplateType): HandlebarsTemplateDelegate<any> {
        return Handlebars.compile(`{{> ${TEMPLATES_FILES[template]}}}`)
    }
}
const templateFactory = new TemplateFactory();

export {templateFactory}