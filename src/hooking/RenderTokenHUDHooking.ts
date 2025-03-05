function hookUp() {
    Hooks.on("renderTokenHUD", config);
}

function config() {
    let template = Handlebars.compile("{{> modules/acorip/templates/token-hub-jack-inout.hbs}}")
    console.log(game.acorip.playerTokenHandlers)
}

export default {hookUp}