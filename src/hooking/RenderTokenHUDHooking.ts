import RHM from "../RHM";

function hookUp() {
    Hooks.on("renderTokenHUD", config);
}

function config() {
    let template = Handlebars.compile("{{> modules/acorip/templates/token-hub-jack-inout.hbs}}")

    attachJackInButton(template({}), game.users?.current);
}

function attachJackInButton(partialHtml: string, user: User): void {
    console.log(user);
    console.log(RHM.getPlayerTokenHandlers());

    let tokenHandler = RHM.getTokenHandlerForUser(user);
    
    if (tokenHandler?.getActorHandler().isNetrunner())
        $("form#token-hud div.col.right").append(partialHtml);
}

export default {hookUp}