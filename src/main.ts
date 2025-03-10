import "./styles/rhm.css"
import RenderTokenHUDHooking from "./lib/token/hooking/TokenHUDHooking";
import { templateFactory } from "./lib/TemplateFactory";
import tokenServiceManager from "./lib/token/service/TokenServiceManager";
import { TokenControls } from "./lib/token/app/TokenControls";
import { TOKEN_CONTROL_EVENTS } from "./lib/Constants";
import { TokenService } from "./lib/token/service/TokenService";

Hooks.once("init", () => {
    TokenControls.init();

    Hooks.on(TOKEN_CONTROL_EVENTS.created, (tokenService: TokenService) => {
        if ((ui as any).rhmTokenControls.isClosed)
            TokenControls.init()._onTokenServiceCreated(tokenService);
    })

    templateFactory.init();
    tokenServiceManager.init();

    RenderTokenHUDHooking.hookUp();    
});

Hooks.on("ready", () => {
    console.log("Module acoriP loaded!");
})