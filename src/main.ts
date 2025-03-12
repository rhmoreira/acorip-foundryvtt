import "./styles/rhm.css"
import { templateFactory } from "./lib/TemplateFactory";
import tokenServiceManager from "./lib/token/service/TokenServiceManager";
import { TokenUIControls } from "./lib/app/TokenUIControls";
import AcoripSocketHandler from "./lib/socket/AcoripSocketHandler";
import TokenHUDHooking from "./lib/hooking/TokenHUDHooking";
import { MODULE_ID } from "./lib/Constants";
import GameMasterUIControls from "./lib/app/GameMasterUIControls";

Hooks.once("init", () => {
    AcoripSocketHandler.init();
    tokenServiceManager.init();
    templateFactory.init();
});

Hooks.on("setup", () => {
    (CONFIG as any)[MODULE_ID] = {
        logging: {
            enabled: true
        }
    };
    GameMasterUIControls.init();
    TokenUIControls.init();
    TokenHUDHooking.hookUp();
})

Hooks.on("ready", () => {
    console.log("Module acoriP loaded!");
})