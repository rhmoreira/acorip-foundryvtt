import CanvasHooking from "./hooking/CanvasHooking";
import RenderTokenHUDHooking from "./hooking/TokenHUDHooking";
import tokenServiceManager from "./lib/service/TokenServiceManager";
import { templateFactory } from "./lib/TemplateFactory";

Hooks.once("init", () => {
    templateFactory.init();
    tokenServiceManager.init();

    CanvasHooking.hookUp({
        ready: {
            tokens: tokenServiceManager.include.bind(tokenServiceManager)
        }
    });
    
    RenderTokenHUDHooking.hookUp();    
});

CONFIG.debug.hooks = true;

Hooks.on("ready", () => {
    console.log("Module acoriP loaded!");
})