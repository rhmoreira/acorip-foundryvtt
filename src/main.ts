import RHM from "./RHM";

Hooks.once("init", () => {
    loadTemplates([
        "modules/acorip/templates/token-hub-jack-inout.hbs"
    ]);

    RHM.init();
});

Hooks.on("ready", () => {
    console.log("Module acoriP loaded!");
})