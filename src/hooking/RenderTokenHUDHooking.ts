import { PlayerTokenManager } from "../lib/TokenManager";
import { FLAGS, MODULE_ID } from "../lib/Constants";
import { templateFactory, TEMPLATES } from "../lib/TemplateFactory";
import RHM from "../RHM";
import FadeService from "../lib/FadeService";

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

function attachJackInButton(_: TokenHUD, tokenManager: PlayerTokenManager): void {
    if (tokenManager.getActorHandler().isNetrunner()) {
        let isNetrunningFlag = tokenManager.getFlag(FLAGS.NETRUNNING);
        let template = templateFactory.parseTemplate(
            TEMPLATES.TOKEN_HUD_JACK_INOUT,
            {moduleId: MODULE_ID, active: (isNetrunningFlag ? "active" : ""), tokenId: tokenManager.getId()}
        );
        attachHudButtonEvent(HUD_PLACEMENT.right, template, (_) => tokenManager.jack(!isNetrunningFlag));
    }
}

function attatchToggleImageButton(tokenHUD: TokenHUD, tokenManager: PlayerTokenManager) {
    let template = templateFactory.parseTemplate(
        TEMPLATES.TOKEN_HUD_TOGGLE_IMAGE,
        {moduleId: MODULE_ID, tokenId: tokenHUD.object}
    );
    attachHudButtonEvent(HUD_PLACEMENT.right, template, (_) => tokenManager.toggleTokenImage());
}

function attatchFadeImageButton(tokenHUD: TokenHUD, tokenManager: PlayerTokenManager) {
    if (game.users.current.isGM) {
        let template = templateFactory.parseTemplate(
            TEMPLATES.TOKEN_HUD_FADE_IMAGE,
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