import CanvasHooking from "./hooking/CanvasHooking";
import RenderTokenHUDHooking from "./hooking/RenderTokenHUDHooking";
import { templateFactory } from "./lib/TemplateFactory";
import RHM from "./RHM";

Hooks.once("init", () => {
    RHM.init();

    templateFactory.init();
    CanvasHooking.hookUp()
                 .then(managers => RHM.setPlayerTokenManagers(managers));
    RenderTokenHUDHooking.hookUp();
    
});

CONFIG.debug.hooks = true;

Hooks.on("ready", () => {
    console.log("Module acoriP loaded!");
})