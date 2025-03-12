import { TEMPLATES } from "../Constants";
import { templateFactory } from "../TemplateFactory";

export default abstract class BaseRollActionHandler {

    protected requestRoll(rollType: string, rollValue: string, rollFn: () => void): void {
        this.showRollDialog(rollType, rollValue, rollFn);
    }

    private showRollDialog(rollType: string, rollValue: string, rollFn: () => void): void {
        const dialogOptions: DialogData = {
            title: game.i18n.format("acorip.messages.roll-request.title", {rollType}),
            content: templateFactory.parseTemplate(TEMPLATES.rollRequestDialog, {rollValue}),
            buttons: {confirm: {label: game.i18n.localize("acorip.labels.confirm")}},
            default: "confirm",
            close: rollFn
        };
        new Dialog(dialogOptions).render(true);
    }
}