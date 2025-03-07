import CanvasHooking from "./hooking/CanvasHooking";
import RenderTokenHUDHooking from "./hooking/TokenHUDHooking";
import TokenServiceLocator from "./lib/service/TokenServiceLocator";
import { templateFactory } from "./lib/TemplateFactory";

Hooks.once("init", () => {
    templateFactory.init();
    TokenServiceLocator.init();

    CanvasHooking.hookUp({
        ready: {
            tokenServices: (services) => TokenServiceLocator.services = services
        }
    });
    
    RenderTokenHUDHooking.hookUp();    
});

CONFIG.debug.hooks = true;

Hooks.on("ready", () => {
    console.log("Module acoriP loaded!");
})