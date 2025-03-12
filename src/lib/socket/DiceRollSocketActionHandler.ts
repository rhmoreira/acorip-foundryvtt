import { SocketRequestDiceRollActionData } from "../types/acoriPTypes";
import BaseRollActionHandler from "./BaseRollActionHandler";
import SocketActionHandler from "./SocketActionHandler";

export default class DiceRollSocketActionHandler extends BaseRollActionHandler implements SocketActionHandler<"rollDice", SocketRequestDiceRollActionData>{
    
    handle(data: SocketRequestDiceRollActionData): void {
        super.requestRoll(
            game.i18n.localize("acorip.labels.dice"),
            `[Dice => ${data.data.formula}]`,
            () => { this.rollSkill(data) }
        );
    }
    getAction(): "rollDice" {
        return "rollDice";
    }

    private rollSkill(data: SocketRequestDiceRollActionData): void {
        Roll.create(data.data.formula)
            .roll()
            .then(_ => {
            });
    }
}