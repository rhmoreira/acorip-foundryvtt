import { PlayerTokenManager } from "../feats/TokenManager";
import { FLAGS, MODULE_ID } from "../lib/Constants";
import { templateFactory, TEMPLATES } from "../lib/TemplateFactory";
import RHM from "../RHM";

function hookUp() {
    Hooks.on("renderTokenHUD", config);
}

function config(tokenHUD: TokenHUD) {
    let tokenManager = RHM.getTokenManagerById(tokenHUD.object.document.id);

    attachJackInButton(tokenHUD, tokenManager);
    attatchToggleImageButton(tokenHUD, tokenManager);
}

function attachJackInButton(_: TokenHUD, tokenManager: PlayerTokenManager): void {
    let isNetrunningFlag = tokenManager.getFlag(FLAGS.NETRUNNING);
    let template = templateFactory.createTemplate(TEMPLATES.TOKEN_HUD_JACK_INOUT);

    if (tokenManager?.getActorHandler().isNetrunner()) {
        $("form#token-hud div.col.right")
        .append(
            template({
                moduleId: MODULE_ID,
                active: (isNetrunningFlag ? "active" : ""),
                tokenId: tokenManager.getId()
            })
        ).on("click", (_) => tokenManager.jack(!isNetrunningFlag));
    }
}

function attatchToggleImageButton(tokenHUD: TokenHUD, tokenManager: PlayerTokenManager) {
    let template = templateFactory.createTemplate(TEMPLATES.TOKEN_HUD_TOGGLE_IMAGE);
    $("form#token-hud div.col.right")
        .append(template({moduleId: MODULE_ID, tokenId: tokenHUD.object}))
        .on("click", (_) => tokenManager.toggleTokenImage());
}

export default {hookUp}