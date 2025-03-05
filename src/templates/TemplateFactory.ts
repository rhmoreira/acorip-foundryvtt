import { MODULE_ID } from "../RHM";

class TemplateFactory {
    public init(): void {
        loadTemplates([
            `modules/${MODULE_ID}/templates/token-hub-jack-inout.hbs`
        ]);
    }

    public createTokenHUDJackInOutTemplate(): HandlebarsTemplateDelegate<any>{
        return this.compile(`{{> modules/${MODULE_ID}/templates/token-hub-jack-inout.hbs}}`);
    }

    private compile(template: string): HandlebarsTemplateDelegate<any> {
        return Handlebars.compile(template)
    }
}
const templateFactory = new TemplateFactory();

export {templateFactory}