import BaseRollActionHandler from "./BaseRollActionHandler";
import SocketActionHandler from "../SocketActionHandler";
import { SocketRequestAttributeRollActionData } from "../../../types/acoriPTypes";

export default class AttributeRollSocketActionHandler extends BaseRollActionHandler implements SocketActionHandler<"rollAttribute", SocketRequestAttributeRollActionData>{
    
    handle(data: SocketRequestAttributeRollActionData): void {
        super.requestRoll(
            game.i18n.localize("acorip.labels.stat"),
            `Stat => ${data.data.attributeName.toUpperCase()}`,
            () => { this.rollStat(data) }
        );
    }
    getAction(): "rollAttribute" {
        return "rollAttribute";
    }

    private rollStat(data: SocketRequestAttributeRollActionData): void {
        let actor = game.user.character;
        let statRoll = (actor as any).createRoll("stat", data.data.attributeName)

        statRoll.handleRollDialog({}, actor, statRoll)
        .then( (confirmed: boolean) => {
            if (confirmed) {
                statRoll
                    .roll()
                    .then(() => super.showMessageResult(this.createMessageRollParams(statRoll)) )
            }
        });
    }

    private createMessageRollParams(statRoll: any): any {
        return {
            rolledItem: `${statRoll.statName} (${statRoll.statValue})`,
            rollType: "Stat",
            critSuccess: statRoll._roll._total === 10,
            critFailure: statRoll._roll._total === 1,
            firstRoll: statRoll._roll._total,
            secondRoll: statRoll._critRoll?._total,
            rollTotal: statRoll.resultTotal,
            skillRoll: false
        }
    }
}