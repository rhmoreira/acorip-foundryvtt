import {FLAGS, RHM} from "../RHM";
import { templateFactory } from "../templates/TemplateFactory";

function hookUp() {
    Hooks.on("renderTokenHUD", config);
}

function config(tokenHUD: TokenHUD) {
    attachJackInButton(tokenHUD);
}

function attachJackInButton(tokenHUD: TokenHUD): void {
    let tokenHandler = RHM.getTokenHandlerById(tokenHUD.object.document.id);
    let isNetrunningFlag = tokenHandler.getFlag(FLAGS.NETRUNNING);

    let template = templateFactory.createTokenHUDJackInOutTemplate();

    if (tokenHandler?.getActorHandler().isNetrunner()) {
        $("form#token-hud div.col.right")
        .append(
            template({
                active: (isNetrunningFlag ? "active" : ""),
                tokenId: tokenHandler.getId()
            })
        ).on("click", (_) => tokenHandler.jack(!isNetrunningFlag));
    }
}

export default {hookUp}