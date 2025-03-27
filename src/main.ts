import "./styles/rhm.css";
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
import ActorSheetSkillTooltip from "./lib/app/ActorSheetSkillTooltip";
import { info as logInfo } from "./lib/AcoripLog";

Hooks.once("init", () => {
    configure();

    AcoripSocketHandler.init();
    TokenServiceManager.init();
    templateFactory.init();

    HandlebarsCustomHelpers.registerHelpers();
});

Hooks.on("setup", () => {
    RHMSettings.registerSettings();
    GameMasterUIControls.init();
    TokenUIControls.init();
    TokenHUDHooking.hookUp();
})

Hooks.on("ready", () => {
    ActorSheetSkillTooltip.init();
    GameMasterUIRequestRoll.init();
    logInfo("Module acoriP loaded!");
})