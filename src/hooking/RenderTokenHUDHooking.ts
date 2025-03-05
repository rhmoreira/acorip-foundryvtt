function hookUp() {
    Hooks.on("renderTokenHUD", config);
}

function config() {
    let template = Handlebars.compile("{{> modules/acorip/templates/token-hub-jack-inout.hbs}}")
    
    attachJackInButton(template({}));
}

function attachJackInButton(partialHtml: string): void {
    $("div.col.right").append(partialHtml);
}

export default {hookUp}