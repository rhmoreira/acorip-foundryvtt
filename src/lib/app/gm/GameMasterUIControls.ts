import { MODULE_ID } from "../../Constants";
import CanvasHooking from "../../hooking/CanvasHooking";
import BaseUI from "../BaseUI";
import GameMasterUIRequestRoll from "./GameMasterUIRequestRoll";

export default class GameMasterUIControls extends BaseUI {
    
    private constructor(){
        super("rhmGMControls");
    }

    static override get defaultOptions(): FormApplicationOptions {
        return {
            ...super.defaultOptions,
            id: "rhmGMControls",
            classes: ["rhm", "gm-controls"],
            template: `modules/${MODULE_ID}/templates/gm-controls.hbs`,
            resizable: false,
            popOut: false,
        }
    }

    override async getData(_?: Partial<FormApplicationOptions>): Promise<any> {
        return {
            moduleId: MODULE_ID
        }        
    }

    override async activateListeners(html: JQuery) {
        super.activateListeners(html);
        document.querySelector("footer#ui-bottom").prepend(this.element[0]);

        this.element.find("div.rhm.col").each((_, html) => {
            html.addEventListener("click", (_) => {
                let action = html.dataset.action;
                switch (action) {
                    case "requestRoll":
                        new GameMasterUIRequestRoll(true);
                        break;
                    default:
                        break;
                }
            })            
        })
    }

    public static init(): void {
        if (game.user.isGM) {
            new GameMasterUIControls().render(true);
            CanvasHooking.hookUp({
                ready: () => {
                    new GameMasterUIControls().render(true);
                }
            });
        }        
    }
}