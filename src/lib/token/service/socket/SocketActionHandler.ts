import { SocketAction } from "../../../types/acoriPTypes";

export default interface SocketActionHandler<Action extends keyof SocketAction, Data extends SocketAction[Action]> {

    handle(data: Data): void;
    getAction(): Action;

}