import CanvasHooking from "./hooking/CanvasHooking";
import RenderTokenHUDHooking from "./hooking/TokenHUDHooking";
import { templateFactory } from "./lib/TemplateFactory";
import RHM from "./RHM";

Hooks.once("init", () => {
    
    templateFactory.init();

    let tokenManagersPromise = CanvasHooking.hookUp();
    
    RHM.init(tokenManagersPromise);

    RenderTokenHUDHooking.hookUp();
    
});

CONFIG.debug.hooks = true;

Hooks.on("ready", () => {
    console.log("Module acoriP loaded!");
})