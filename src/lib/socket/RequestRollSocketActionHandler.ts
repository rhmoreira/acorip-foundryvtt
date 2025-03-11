import { SocketAction, SocketRequestRollActionData } from "../types/acoriPTypes";
import AttributeRollSocketActionHandler from "./AttributeRollSocketActionHandler";
import DiceRollSocketActionHandler from "./DiceRollSocketActionHandler";
import SkillRollSocketActionHandler from "./SkillRollSocketActionHandler";
import SocketActionHandler from "./SocketActionHandler";

export default class RequestRollSocketActionHandler implements SocketActionHandler<"requestRoll", SocketRequestRollActionData>{
    
    private rollHandlersMap: Map<keyof SocketAction,
        SkillRollSocketActionHandler |
        AttributeRollSocketActionHandler |
        DiceRollSocketActionHandler> = new Map();

    constructor(rollHandlers: Array<SkillRollSocketActionHandler | AttributeRollSocketActionHandler | DiceRollSocketActionHandler>) {
        rollHandlers.forEach(handler => this.rollHandlersMap.set(handler.getAction(), handler))
    }
    
    handle(data: SocketRequestRollActionData): void {
        this.rollHandlersMap.get(data.request.action)?.handle(data.request as any);
    }
    getAction(): "requestRoll" {
        return "requestRoll";
    }
}