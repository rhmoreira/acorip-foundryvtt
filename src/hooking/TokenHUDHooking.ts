import { TokenManager } from "../lib/TokenManager";
import { templateFactory } from "../lib/TemplateFactory";
import RHM from "../RHM";
import FadeService from "../lib/service/FadeService";
import { FLAGS, MODULE_ID, TEMPLATES } from "../lib/Constants";

const TOKEN_HUD_PARENT_SELECTOR = "form#token-hud";
const HUD_PLACEMENT = {
    right: "div.col.right",
    left: "div.col.left",
    middle: "div.col.middle"
}

function hookUp() {
    Hooks.on("renderTokenHUD", config);
}

function config(tokenHUD: TokenHUD) {
    let tokenManager = RHM.getTokenManagerById(tokenHUD.object.document.id);

    attachJackInButton(tokenHUD, tokenManager);
    attatchToggleImageButton(tokenHUD, tokenManager);
    attatchFadeImageButton(tokenHUD, tokenManager);
}

function attachJackInButton(_: TokenHUD, tokenManager: TokenManager): void {
    if (tokenManager.getActorHandler().isNetrunner()) {
        let isNetrunningFlag = tokenManager.getFlag(FLAGS.NETRUNNING);
        let template = templateFactory.parseTemplate(
            TEMPLATES.tokenHudJackIn,
            {moduleId: MODULE_ID, active: (isNetrunningFlag ? "active" : ""), tokenId: tokenManager.getId()}
        );
        attachHudButtonEvent(HUD_PLACEMENT.right, template, (_) => tokenManager.jack(!isNetrunningFlag));
    }
}

function attatchToggleImageButton(tokenHUD: TokenHUD, tokenManager: TokenManager) {
    let template = templateFactory.parseTemplate(
        TEMPLATES.tokenHudToggleImage,
        {moduleId: MODULE_ID, tokenId: tokenHUD.object}
    );
    attachHudButtonEvent(HUD_PLACEMENT.right, template, (_) => tokenManager.toggleTokenImage());
}

function attatchFadeImageButton(tokenHUD: TokenHUD, tokenManager: TokenManager) {
    if (game.users.current.isGM) {
        let template = templateFactory.parseTemplate(
            TEMPLATES.tokenHudFadeImage,
            {moduleId: MODULE_ID, tokenId: tokenHUD.object}
        );
        attachHudButtonEvent(HUD_PLACEMENT.left, template, (_) => {
            new FadeService(tokenManager).fade();
        });
    }
}

function attachHudButtonEvent(placement: string, content: string, callback: (event: JQuery.ClickEvent<HTMLElement>) => void) {
    $(`${TOKEN_HUD_PARENT_SELECTOR} ${placement}`)
        .append(content)
        .children()
        .last()
        .on("click", (_) => callback(_));
}

export default {hookUp}