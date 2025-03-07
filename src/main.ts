import RenderTokenHUDHooking from "./lib/token/hooking/TokenHUDHooking";
import { templateFactory } from "./lib/TemplateFactory";
import tokenServiceManager from "./lib/token/service/TokenServiceManager";

Hooks.once("init", () => {
    templateFactory.init();
    tokenServiceManager.init();
        
    RenderTokenHUDHooking.hookUp();    
});

CONFIG.debug.hooks = true;

Hooks.on("ready", () => {
    console.log("Module acoriP loaded!");
})