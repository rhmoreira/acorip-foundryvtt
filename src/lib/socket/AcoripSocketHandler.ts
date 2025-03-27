import { AcoripLog } from "../AcoripLog";
import { MODULE_ID } from "../Constants";
import { SocketAction } from "../types/acoriPTypes";
import AttributeRollSocketActionHandler from "./actions/rolls/AttributeRollSocketActionHandler";
import DiceRollSocketActionHandler from "./actions/rolls/DiceRollSocketActionHandler";
import RequestRollSocketActionHandler from "./actions/rolls/RequestRollSocketActionHandler";
import SkillRollSocketActionHandler from "./actions/rolls/SkillRollSocketActionHandler";
import SocketActionHandler from "./actions/SocketActionHandler";
import UpdateClientSettingsActionHandler from "./actions/UpdateClientSettingsActionHandler";

class AcoripSocketHandler {
    
    private logger = new AcoripLog("AcoripSocketHandler");
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
        this.logger.info("Emitting socket event", data);
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

        let actionHandlers = [
            skillRollHandler,
            attrRollHandler,
            diceRollHandler,
            rollRequestHandler,
            new UpdateClientSettingsActionHandler()
        ];

        (game.modules?.get(MODULE_ID) as any).socketHandler = new AcoripSocketHandler(...actionHandlers);
    }
}

function init(): void {
    AcoripSocketHandler.register();
}

function getInstance(): AcoripSocketHandler {
    return (game.modules?.get(MODULE_ID) as any).socketHandler;
}

export default {init, getInstance}