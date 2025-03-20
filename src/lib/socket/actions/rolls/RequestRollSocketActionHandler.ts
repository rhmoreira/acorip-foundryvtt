import { SocketAction, SocketRequestRollActionData } from "../../../types/acoriPTypes";
import SocketActionHandler from "../SocketActionHandler";
import AttributeRollSocketActionHandler from "./AttributeRollSocketActionHandler";
import DiceRollSocketActionHandler from "./DiceRollSocketActionHandler";
import SkillRollSocketActionHandler from "./SkillRollSocketActionHandler";

export default class RequestRollSocketActionHandler implements SocketActionHandler<"requestRoll", SocketRequestRollActionData>{
    
    private delegateHandlersMap: Map<keyof SocketAction,
        SkillRollSocketActionHandler |
        AttributeRollSocketActionHandler |
        DiceRollSocketActionHandler> = new Map();

    constructor(rollHandlers: Array<SkillRollSocketActionHandler | AttributeRollSocketActionHandler | DiceRollSocketActionHandler>) {
        rollHandlers.forEach(handler => this.delegateHandlersMap.set(handler.getAction(), handler))
    }
    
    handle(data: SocketRequestRollActionData): void {
        this.delegateHandlersMap.get(data.request.action)?.handle(data.request as any);
    }
    getAction(): "requestRoll" {
        return "requestRoll";
    }
}