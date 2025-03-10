import "./styles/rhm.css"
import RenderTokenHUDHooking from "./lib/token/hooking/TokenHUDHooking";
import { templateFactory } from "./lib/TemplateFactory";
import tokenServiceManager from "./lib/token/service/TokenServiceManager";
import { TokenControls } from "./lib/token/app/TokenControls";

Hooks.once("init", () => {
    TokenControls.init();

    templateFactory.init();
    tokenServiceManager.init();

    RenderTokenHUDHooking.hookUp();    
});

Hooks.on("ready", () => {
    console.log("Module acoriP loaded!");
})