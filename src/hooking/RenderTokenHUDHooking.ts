import RHM from "../RHM";

function hookUp() {
    Hooks.on("renderTokenHUD", config);
}

function config() {
    let template = Handlebars.compile("{{> modules/acorip/templates/token-hub-jack-inout.hbs}}")

    attachJackInButton(template({}), game.users?.current);
}

function attachJackInButton(partialHtml: string, user: User): void {
    let tokenHandler = RHM.getTokenHandlerForUser(user);
    
    if (user?.isGM || tokenHandler?.getActorHandler().isNetrunner())
        $("div.col.right").append(partialHtml);
}

export default {hookUp}