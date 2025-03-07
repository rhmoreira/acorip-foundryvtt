import { TokenService } from "../lib/service/TokenService";
import { templateFactory } from "../lib/TemplateFactory";
import FadeService from "../lib/service/FadeService";
import { FLAGS, MODULE_ID, TEMPLATES } from "../lib/Constants";
import TokenServiceLocator from "../lib/service/TokenServiceLocator";

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
    let tokenService = TokenServiceLocator.getById(tokenHUD.object.document.id);

    attachJackInButton(tokenHUD, tokenService);
    attatchToggleImageButton(tokenHUD, tokenService);
    attatchFadeImageButton(tokenHUD, tokenService);
}

function attachJackInButton(_: TokenHUD, tokenService: TokenService): void {
    if (tokenService.getActorHandler().isNetrunner()) {
        let isNetrunningFlag = tokenService.getFlag(FLAGS.NETRUNNING);
        let template = templateFactory.parseTemplate(
            TEMPLATES.tokenHudJackIn,
            {moduleId: MODULE_ID, active: (isNetrunningFlag ? "active" : ""), tokenId: tokenService.getId()}
        );
        attachHudButtonEvent(HUD_PLACEMENT.right, template, (_) => tokenService.jack(!isNetrunningFlag));
    }
}

function attatchToggleImageButton(tokenHUD: TokenHUD, tokenService: TokenService) {
    let template = templateFactory.parseTemplate(
        TEMPLATES.tokenHudToggleImage,
        {moduleId: MODULE_ID, tokenId: tokenHUD.object}
    );
    attachHudButtonEvent(HUD_PLACEMENT.right, template, (_) => tokenService.toggleTokenImage());
}

function attatchFadeImageButton(tokenHUD: TokenHUD, tokenService: TokenService) {
    if (game.users.current.isGM) {
        let template = templateFactory.parseTemplate(
            TEMPLATES.tokenHudFadeImage,
            {moduleId: MODULE_ID, tokenId: tokenHUD.object}
        );
        attachHudButtonEvent(HUD_PLACEMENT.left, template, (_) => {
            new FadeService(tokenService).fade();
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