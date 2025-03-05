import {FLAGS, RHM} from "../RHM";
import { templateFactory } from "../templates/TemplateFactory";

function hookUp() {
    Hooks.on("renderTokenHUD", config);
}

function config(tokenHUD: TokenHUD) {
    attachJackInButton(tokenHUD);
}

function attachJackInButton(tokenHUD: TokenHUD): void {
    let tokenManager = RHM.getTokenManagerById(tokenHUD.object.document.id);
    let isNetrunningFlag = tokenManager.getFlag(FLAGS.NETRUNNING);

    let template = templateFactory.createTokenHUDJackInOutTemplate();

    if (tokenManager?.getActorHandler().isNetrunner()) {
        $("form#token-hud div.col.right")
        .append(
            template({
                active: (isNetrunningFlag ? "active" : ""),
                tokenId: tokenManager.getId()
            })
        ).on("click", (_) => tokenManager.jack(!isNetrunningFlag));
    }
}

export default {hookUp}