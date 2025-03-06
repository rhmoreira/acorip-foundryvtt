import { MODULE_ID } from "./Constants";

const TEMPLATES = {
    TOKEN_HUD_JACK_INOUT: `modules/${MODULE_ID}/templates/token-hud-jack-inout.hbs`,
    TOKEN_HUD_TOGGLE_IMAGE: `modules/${MODULE_ID}/templates/token-hud-toggle-image.hbs`,
    TOKEN_TOGGLE_IMAGE_DIALOG: `modules/${MODULE_ID}/templates/token-toggle-image-dialog.hbs`,
    TOKEN_HUD_FADE_IMAGE: `modules/${MODULE_ID}/templates/token-hud-fade-image.hbs`,
    FADE_ELEMENT_DIALOG: `modules/${MODULE_ID}/templates/fade-element-dialog.hbs`,
}

class TemplateFactory {
    
    public init(): void {
        let templateList = [];
        
        for (let template in TEMPLATES)
            templateList.push(TEMPLATES[template as keyof typeof TEMPLATES]);

        loadTemplates(templateList);
    }

    public parseTemplate(template: string, data: any = {}): string{
        return this.createTemplate(template)(data);
    }

    public createTemplate(template: string): HandlebarsTemplateDelegate<any>{
        return this.compile(template);
    }

    private compile(template: string): HandlebarsTemplateDelegate<any> {
        return Handlebars.compile(`{{> ${template}}}`)
    }
}
const templateFactory = new TemplateFactory();

export {templateFactory, TEMPLATES}