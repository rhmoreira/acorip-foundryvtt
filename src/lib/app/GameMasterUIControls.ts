import { MODULE_ID } from "../Constants";
import UIControls from "./UIControls";

export default class GameMasterUIControls extends UIControls {
    
    constructor(){
        super("rhmGMControls");
    }

    static override get defaultOptions(): ApplicationOptions {
        return {
            ...super.defaultOptions,
            id: "rhmGMControls",
            classes: ["rhm", "gm-controls"],
            template: `modules/${MODULE_ID}/templates/gm-controls.hbs`,
            resizable: false,
            popOut: false,
        }
    }

    override async getData(_?: Partial<ApplicationOptions>): Promise<any> {
        return {
            moduleId: MODULE_ID
        }        
    }

    override activateListeners(html: JQuery): void {
        super.activateListeners(html);
        document.querySelector("footer#ui-bottom").prepend(this.element[0]);

        this.element.find("div.rhm.col").each((_, html) => {
            html.addEventListener("click", (_) => {
                let action = html.dataset.action;
                switch (action) {
                    case "skillRoll":
                        break;
                    default:
                        break;
                }
            })            
        })
    }
}