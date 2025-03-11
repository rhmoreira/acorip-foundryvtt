import { SocketRequestDiceRollActionData } from "../types/acoriPTypes";
import SocketActionHandler from "./SocketActionHandler";

export default class DiceRollSocketActionHandler implements SocketActionHandler<"rollDice", SocketRequestDiceRollActionData>{
    
    handle(data: SocketRequestDiceRollActionData): void {
        data.action
    }
    getAction(): "rollDice" {
        return "rollDice";
    }
}