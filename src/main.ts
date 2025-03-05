import {RHM} from "./RHM";

Hooks.once("init", () => {
    RHM.init();
});

Hooks.on("ready", () => {
    console.log("Module acoriP loaded!");
})