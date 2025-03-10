import { MaybePromise } from "@league-of-foundry-developers/foundry-vtt-types/src/types/utils.mjs";
import { MODULE_ID, TOKEN_CONTROL_EVENTS } from "../../Constants";
import { TokenService } from "../service/TokenService";
import CanvasHooking from "../../../hooking/CanvasHooking";

export class TokenControls extends Application {
 
    private hooks: any[];

    private _closed: boolean = false;

    public get isClosed(): boolean {return this._closed;}

    private tokenService: TokenService;

    //https://github.dev/theripper93/combat-tracker-dock/blob/master/scripts/config.js
    private constructor() {
        super();
        (ui as any).rhmTokenControls?.close();
        (ui as any).rhmTokenControls = this;

        this.hooks = [
            {hook: TOKEN_CONTROL_EVENTS.created, callback: this._onTokenServiceCreated.bind(this)},
            {hook: TOKEN_CONTROL_EVENTS.deleted, callback: this._onTokenServiceDeleted.bind(this)}
        ]

        this.hookUp();
    }

    private hookUp(): void {
        this.hooks.forEach(it => Hooks.on(it.hook, it.callback));
    }

    private unhook(): void {
        this.hooks.forEach(it => Hooks.off(it.hook, it.callback))
    }

    override close(_?: Application.CloseOptions): Promise<void> {
        if (this.element[0]) this.element[0].remove();
        this.unhook();
        this._closed = true;
        return super.close();
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

        let scopedTokenService = this.tokenService;
        this.element.find("div.rhm.col").each((_, html) => {
            html.addEventListener("click", (_) => {
                let action = html.dataset.action;
                switch (action) {
                    case "netrunning":
                        scopedTokenService.jack();
                        break;
                    case "toggle-image":
                        scopedTokenService.toggleTokenImage();
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
        new TokenControls();
        CanvasHooking.hookUp({
            ready: (_) => {
                (ui as any).rhmTokenControls?.close();
                new TokenControls();
            }
        });
        Hooks.on(TOKEN_CONTROL_EVENTS.created, (tokenService: TokenService) => {
            if (!(ui as any).rhmTokenControls)
                new TokenControls()._onTokenServiceCreated(tokenService);
        });
    }
}