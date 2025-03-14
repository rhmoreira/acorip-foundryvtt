import AcoripLog from "../AcoripLog";
import { MODULE_ID } from "../Constants";
import { SocketAction } from "../types/acoriPTypes";
import AttributeRollSocketActionHandler from "./AttributeRollSocketActionHandler";
import DiceRollSocketActionHandler from "./DiceRollSocketActionHandler";
import RequestRollSocketActionHandler from "./RequestRollSocketActionHandler";
import SkillRollSocketActionHandler from "./SkillRollSocketActionHandler";
import SocketActionHandler from "./SocketActionHandler";

class AcoripSocketHandler {
    
    private socketId: string = `module.${MODULE_ID}`;

    private defaultSocketActionHandlers = new Map<keyof SocketAction, SocketActionHandler<keyof SocketAction, SocketAction[keyof SocketAction]>>();
    private customSocketHandlers = new Map<keyof SocketAction, SocketActionHandler<keyof  SocketAction, SocketAction[keyof SocketAction]>>();

    private constructor(...socketActionHandlers: SocketActionHandler<keyof SocketAction, SocketAction[keyof SocketAction]>[]) {
        this.registerSocketHandler();
        socketActionHandlers.forEach(it => this.defaultSocketActionHandlers.set(it.getAction(), it));
    }

    private registerSocketHandler(): void {
        game.socket?.on(this.socketId, (data: SocketAction[keyof SocketAction]) => {
            let canProceed = data.userIds?.includes(game.user.id);
            if (canProceed) {
                let actionHandler = this.customSocketHandlers.get(data.action) || this.defaultSocketActionHandlers.get(data.action);
                actionHandler?.handle(data);
            }
        });
    }

    public emit<Action extends keyof SocketAction>(data: SocketAction[Action]): void {
        AcoripLog.info("Emitting socket event", data);
        game.socket?.emit(this.socketId, data);
    }

    public attatchSocketActionHandler<Action extends keyof SocketAction>(handler: SocketActionHandler<Action, SocketAction[Action]>): void {
        this.customSocketHandlers.set(handler.getAction(), handler);
    }

    public static register(): void {
        let skillRollHandler = new SkillRollSocketActionHandler();
        let attrRollHandler = new AttributeRollSocketActionHandler();
        let diceRollHandler = new DiceRollSocketActionHandler();
        let rollRequestHandler = new RequestRollSocketActionHandler([skillRollHandler, attrRollHandler , diceRollHandler]);

        (game.modules?.get(MODULE_ID) as any).socketHandler = new AcoripSocketHandler(
            skillRollHandler, attrRollHandler, diceRollHandler, rollRequestHandler
        );
    }
}

function init(): void {
    AcoripSocketHandler.register();
}

function getInstance(): AcoripSocketHandler {
    return (game.modules?.get(MODULE_ID) as any).socketHandler;
}

export default {init, getInstance}