import { SocketRequestDiceRollActionData } from "../types/acoriPTypes";
import BaseRollActionHandler from "./BaseRollActionHandler";
import SocketActionHandler from "./SocketActionHandler";

export default class DiceRollSocketActionHandler extends BaseRollActionHandler implements SocketActionHandler<"rollDice", SocketRequestDiceRollActionData>{
    
    handle(data: SocketRequestDiceRollActionData): void {
        super.requestRoll(
            game.i18n.localize("acorip.labels.dice"),
            `Dice => ${data.data.formula}`,
            () => { this.rollDice(data) }
        );
    }
    getAction(): "rollDice" {
        return "rollDice";
    }

    private rollDice(data: SocketRequestDiceRollActionData): void {
        Roll.create(data.data.formula)
            .roll()
            .then(roll => {
                
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