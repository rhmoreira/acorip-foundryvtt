import { templateFactory } from "./lib/TemplateFactory";
import { TokenUIControls } from "./lib/app/TokenUIControls";
import AcoripSocketHandler from "./lib/socket/AcoripSocketHandler";
import TokenHUDHooking from "./lib/hooking/TokenHUDHooking";
import GameMasterUIControls from "./lib/app/gm/GameMasterUIControls";
import GameMasterUIRequestRoll from "./lib/app/gm/GameMasterUIRequestRoll";
import HandlebarsCustomHelpers from "./lib/HandlebarsCustomHelpers";
import RHMSettings from "./lib/settings/RHMSettings";
import { configure } from "./lib/config";
import TokenServiceManager from "./lib/token/service/TokenServiceManager";
import { info as logInfo } from "./lib/AcoripLog";
import TokenImageToggleHooking from "./lib/hooking/TokenImageToggleHooking";

Hooks.once("init", () => {
    configure();

    AcoripSocketHandler.init();
    templateFactory.init();

    HandlebarsCustomHelpers.registerHelpers();
});

Hooks.on("setup", () => {
    RHMSettings.registerSettings();
    TokenHUDHooking.hookUp();
})

Hooks.once("canvasInit", (_: Canvas) => {
    TokenUIControls.init();
    GameMasterUIControls.init();
    GameMasterUIRequestRoll.init();
    TokenServiceManager.init();
})

Hooks.on("ready", () => {
    TokenImageToggleHooking.hookUp();
    logInfo("Module acoriP loaded!");
})