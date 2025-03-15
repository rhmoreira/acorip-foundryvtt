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

    private rollDice(data: SocketRequestDiceRollActionData) {
        Roll.create(data.data.formula)
            .roll()
            .then(async roll => {
                await (game as any).dice3d.showForRoll(roll, game.user, true)
                return roll;
            }).then(this.createMessageRollParams)
            .then(params => super.showMessageResult(params));
        
    }

    private createMessageRollParams(roll: Roll): any {
        return  {
            rolledItem: roll.formula,
            rollType: game.i18n.localize('acorip.labels.dice-formula'),
            rollTotal: eval(roll.result),
            diceRoll: true
        };
    }
}