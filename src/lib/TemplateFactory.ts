import { MODULE_ID } from "./Constants";

const TEMPLATES = {
    TOKEN_HUD_JACK_INOUT: `modules/${MODULE_ID}/templates/token-hud-jack-inout.hbs`,
    TOKEN_HUD_TOGGLE_IMAGE: `modules/${MODULE_ID}/templates/token-hud-toggle-image.hbs`,
    TOKEN_TOGGLE_IMAGE_DIALOG: `modules/${MODULE_ID}/templates/token-toggle-image-dialog.hbs`,
}

class TemplateFactory {
    public init(): void {
        loadTemplates([
            TEMPLATES.TOKEN_HUD_JACK_INOUT,
            TEMPLATES.TOKEN_HUD_TOGGLE_IMAGE,
            TEMPLATES.TOKEN_TOGGLE_IMAGE_DIALOG,
        ]);
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