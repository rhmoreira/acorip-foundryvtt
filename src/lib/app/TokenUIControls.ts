import { MaybePromise } from "@league-of-foundry-developers/foundry-vtt-types/src/types/utils.mjs";
import { MODULE_ID, TOKEN_CONTROL_EVENTS } from "../Constants";
import { TokenService } from "../token/service/TokenService";
import BaseUI from "./BaseUI";
import CanvasHooking from "../hooking/CanvasHooking";

export class TokenUIControls extends BaseUI {
 
    private tokenService: TokenService;

    private constructor() {
        super("rhmTokenControls");
        super.hookUp([
            {hook: TOKEN_CONTROL_EVENTS.created, callback: this._onTokenServiceCreated.bind(this)},
            {hook: TOKEN_CONTROL_EVENTS.deleted, callback: this._onTokenServiceDeleted.bind(this)}
        ]);
    }
    
    static override get defaultOptions(): ApplicationOptions {
        return {
            ...super.defaultOptions,
            id: "rhmTokenControls",
            classes: ["rhm", "custom-token-buttons"],
            template: `modules/${MODULE_ID}/templates/player-token-interface-controls.hbs`,
            resizable: false,
            popOut: false,
        }
    }

    override activateListeners(html: JQuery): void {
        super.activateListeners(html);
        document.querySelector("footer#ui-bottom").prepend(this.element[0]);

        this.element.find("div.rhm.col").each((_, html) => {
            html.addEventListener("click", (_) => {
                let action = html.dataset.action;
                switch (action) {
                    case "netrunning":
                        this.tokenService.jack();
                        break;
                    case "toggle-image":
                        this.tokenService.toggleTokenImage();
                        break;
                    default:
                        break;
                }
            })            
        })
    }

    override getData(_?: Partial<ApplicationOptions>): MaybePromise<object> {
        return {
            netrunner: this.tokenService.getActorHandler().isNetrunner(),
            moduleId: MODULE_ID
        }        
    }

    _onTokenServiceCreated(tokenService: TokenService): void {
        if (tokenService.isOwner(game.user)) {
            this.tokenService = tokenService;
            this.render(true);
        }
    }

    _onTokenServiceDeleted(tokenService: TokenService): void {
        if (tokenService.isOwner(game.user)) {
            this.close();
            delete this.tokenService;
        }
    }

    public static init(): void {
        if (!game.user.isGM) {
            new TokenUIControls();
            CanvasHooking.hookUp({
                ready: () => {
                    new TokenUIControls();
                }
            });
        }        
    }
}