import RHM from "./RHM";

Hooks.once("init", () => {
    loadTemplates([
        "modules/acorip/templates/token-hub-jack-inout.hbs"
    ]);

    if (!game.acorip) {
        game.acorip = new RHM();
    }
    game.acorip.init();
});

Hooks.on("ready", () => {
    console.log(game.acorip.playerTokenHandlers);
})